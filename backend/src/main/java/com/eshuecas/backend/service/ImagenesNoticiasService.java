package com.eshuecas.backend.service;

import com.eshuecas.backend.entity.Noticia;
import com.eshuecas.backend.repository.NoticiaRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Completa imagenes de noticias publicadas SIN alterar titular, fecha ni estado.
 * Primero intenta resolver el enlace intermedio de Google News (mecanismo
 * no oficial que puede dejar de funcionar); luego busca og:image en el medio.
 */
@Component
public class ImagenesNoticiasService {
    private static final Logger LOG = LoggerFactory.getLogger(ImagenesNoticiasService.class);
    private static final String RESPALDO = "/images/logo/noticia.png";
    private static final String AGENTE = "Mozilla/5.0 (compatible; LasHuecasNoticias/1.0)";
    private static final int MAX_HTML = 1_000_000;
    private static final Pattern FIRMA = Pattern.compile("data-n-a-sg=[\"']([^\"']+)[\"']");
    private static final Pattern TIEMPO = Pattern.compile("data-n-a-ts=[\"']([0-9]+)[\"']");
    private static final Pattern META = Pattern.compile("(?is)<(?:meta|link)\\b[^>]*>");
    private static final Pattern ATRIBUTO = Pattern.compile(
            "(?is)([a-zA-Z][\\w:-]*)\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s>]+))");
    private static final List<String> MEDIOS = List.of(
            "eluniverso.com", "lahora.com.ec", "primicias.ec", "ecuavisa.com",
            "teleamazonas.com", "elcomercio.com", "expreso.ec", "eldiario.ec",
            "vistazo.com", "prefecturadeesmeraldas.gob.ec", "ecuadorencifras.gob.ec",
            "elmercurio.com.ec", "extra.ec", "metroecuador.com.ec"
    );
    private final NoticiaRepository repository;
    private final ObjectMapper mapper;
    private final HttpClient http = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(6))
            .followRedirects(HttpClient.Redirect.NEVER)
            .build();
    private final Map<Long, Long> ultimosIntentos = new ConcurrentHashMap<>();

    @Value("${noticias.imagenes.habilitadas:true}")
    private boolean habilitadas;
    @Value("${noticias.imagenes.max-por-ronda:6}")
    private int maxPorRonda;

    public ImagenesNoticiasService(NoticiaRepository repository, ObjectMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Scheduled(initialDelayString = "${noticias.imagenes.espera-inicial-ms:20000}",
               fixedDelayString = "${noticias.imagenes.intervalo-ms:21600000}")
    public void completarImagenes() {
        if (!habilitadas) return;
        int revisadas = 0;
        int nuevas = 0;
        long ahora = System.currentTimeMillis();
        for (Noticia noticia : repository.findByPublicadaTrueOrderByFechaDescIdDesc()) {
            if (noticia.getId() == null || !sinImagen(noticia.getImagen())) continue;
            if (revisadas >= Math.max(1, Math.min(maxPorRonda, 12))) break;
            Long anterior = ultimosIntentos.get(noticia.getId());
            if (anterior != null && ahora - anterior < 6 * 60 * 60 * 1000L) continue;
            ultimosIntentos.put(noticia.getId(), ahora);
            revisadas++;
            try {
                URI enlace = new URI(noticia.getUrl());
                URI original = esGoogleNoticias(enlace) ? resolverGoogle(enlace) : enlace;
                if (original == null) {
                    LOG.info("IMAGEN id={} resultado=google-no-resuelto", noticia.getId());
                    continue;
                }
                String imagen = extraerImagen(original);
                if (imagen == null) {
                    LOG.info("IMAGEN id={} resultado=sin-og-image dominio={}", noticia.getId(), original.getHost());
                    continue;
                }
                noticia.setImagen(imagen);
                repository.save(noticia);
                nuevas++;
                LOG.info("IMAGEN id={} resultado=guardada dominio={}", noticia.getId(), original.getHost());
            } catch (Exception ex) {
                LOG.info("IMAGEN id={} resultado=error detalle={}",
                        noticia.getId(), ex.getMessage());
            }
        }
        LOG.info("IMAGENES NOTICIAS: revisadas={}, imagenes nuevas={}", revisadas, nuevas);
    }

    private static boolean sinImagen(String imagen) {
        return imagen == null || imagen.isBlank() || RESPALDO.equals(imagen);
    }

    private static boolean dominio(String host, String esperado) {
        if (host == null) return false;
        String h = host.toLowerCase(Locale.ROOT);
        return h.equals(esperado) || h.endsWith("." + esperado);
    }

    private static boolean esGoogleNoticias(URI url) {
        return url != null && dominio(url.getHost(), "news.google.com") &&
                (url.getPath().contains("/articles/") || url.getPath().contains("/read/"));
    }

    private static boolean urlValida(URI url, boolean paraGoogle) {
        if (url == null || !"https".equalsIgnoreCase(url.getScheme()) ||
                url.getHost() == null || url.getUserInfo() != null ||
                (url.getPort() != -1 && url.getPort() != 443)) return false;
        if (paraGoogle) return dominio(url.getHost(), "news.google.com") ||
                dominio(url.getHost(), "consent.google.com");
        return MEDIOS.stream().anyMatch(d -> dominio(url.getHost(), d));
    }

    // Lee como maximo 1 MB por respuesta y valida cada redireccion.
    private String descargarHtml(URI url, boolean paraGoogle) throws Exception {
        URI actual = url;
        for (int i = 0; i < 4; i++) {
            if (!urlValida(actual, paraGoogle)) throw new Exception("dominio-no-permitido: " + actual.getHost());
            HttpRequest solicitud = HttpRequest.newBuilder(actual)
                    .timeout(Duration.ofSeconds(10))
                    .header("User-Agent", AGENTE)
                    .header("Accept", "text/html,application/xhtml+xml")
                    .header("Accept-Language", "es-EC,es;q=0.9")
                    .header("Cookie", "CONSENT=PENDING+987")
                    .GET().build();
            HttpResponse<InputStream> r = http.send(solicitud, HttpResponse.BodyHandlers.ofInputStream());
            try (InputStream cuerpo = r.body()) {
                int estado = r.statusCode();
                if (estado >= 300 && estado < 400) {
                    String destino = r.headers().firstValue("location").orElse(null);
                    if (destino == null) throw new Exception("redireccion-sin-destino");
                    actual = actual.resolve(destino);
                    continue;
                }
                if (estado != 200) throw new Exception("http-" + estado + " en " + actual.getHost());
                String tipo = r.headers().firstValue("content-type").orElse("").toLowerCase(Locale.ROOT);
                if (!tipo.contains("html")) throw new Exception("respuesta-no-html");
                return new String(cuerpo.readNBytes(MAX_HTML), StandardCharsets.UTF_8);
            }
        }
        throw new Exception("demasiadas-redirecciones");
    }

    /**
     * Resolucion experimental del enlace Google News. No es API oficial.
     * Si Google cambia su pagina o limita solicitudes, falla sin publicar
     * una imagen equivocada.
     */
    private URI resolverGoogle(URI google) throws Exception {
        String[] partes = google.getPath().split("/");
        String id = partes[partes.length - 1];
        if (!id.matches("[A-Za-z0-9_-]{20,1200}")) throw new Exception("google-id-invalido");
        String html = descargarHtml(URI.create("https://news.google.com/rss/articles/" + id), true);
        String firma = buscar(FIRMA, html);
        String tiempo = buscar(TIEMPO, html);
        if (firma == null || tiempo == null) throw new Exception("google-sin-firma-o-fecha");

        String prefijo = "[\"garturlreq\",[[\"X\",\"X\",[\"X\",\"X\"],null,null,1,1,\"US:en\",null,1," +
                "null,null,null,null,null,0,1],\"X\",\"X\",1,[1,1,1],1,1,null,0,0,null,0],";
        String inner = prefijo + mapper.writeValueAsString(id) + "," + tiempo + "," +
                mapper.writeValueAsString(firma) + "]";
        String outer = mapper.writeValueAsString(List.of(List.of(List.of("Fbv4je", inner))));
        String form = "f.req=" + URLEncoder.encode(outer, StandardCharsets.UTF_8);

        URI rpc = URI.create("https://news.google.com/_/DotsSplashUi/data/batchexecute?rpcids=Fbv4je");
        HttpRequest req = HttpRequest.newBuilder(rpc)
                .timeout(Duration.ofSeconds(10))
                .header("User-Agent", AGENTE)
                .header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")
                .header("Origin", "https://news.google.com")
                .header("Referer", "https://news.google.com/")
                .header("X-Same-Domain", "1")
                .header("Cookie", "CONSENT=PENDING+987")
                .POST(HttpRequest.BodyPublishers.ofString(form, StandardCharsets.UTF_8)).build();
        HttpResponse<String> resp = http.send(req, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        if (resp.statusCode() != 200) throw new Exception("google-rpc-http-" + resp.statusCode());
        String raw = resp.body();
        int inicio = raw.indexOf("\n\n");
        if (inicio < 0) throw new Exception("google-rpc-formato-desconocido");
        JsonNode frames = mapper.readTree(raw.substring(inicio + 2));
        if (frames == null || !frames.isArray()) throw new Exception("google-rpc-sin-datos");
        for (JsonNode frame : frames) {
            if (frame.isArray() && frame.size() > 2 &&
                    "wrb.fr".equals(frame.path(0).asText()) &&
                    "Fbv4je".equals(frame.path(1).asText()) &&
                    frame.path(2).isTextual()) {
                JsonNode resultado = mapper.readTree(frame.get(2).asText());
                if (resultado.isArray() && resultado.size() > 1 &&
                        "garturlres".equals(resultado.path(0).asText())) {
                    URI medio = URI.create(resultado.get(1).asText());
                    if (!urlValida(medio, false)) throw new Exception("medio-fuera-de-lista: " + medio.getHost());
                    return medio;
                }
            }
        }
        throw new Exception("google-rpc-sin-url");
    }

    private static String buscar(Pattern patron, String texto) {
        Matcher m = patron.matcher(texto);
        return m.find() ? m.group(1) : null;
    }

    private String extraerImagen(URI articulo) throws Exception {
        String html = descargarHtml(articulo, false);
        Matcher etiquetas = META.matcher(html);
        while (etiquetas.find()) {
            Matcher attrs = ATRIBUTO.matcher(etiquetas.group());
            Map<String, String> a = new java.util.HashMap<>();
            while (attrs.find()) {
                String valor = attrs.group(2) != null ? attrs.group(2) :
                        (attrs.group(3) != null ? attrs.group(3) : attrs.group(4));
                a.put(attrs.group(1).toLowerCase(Locale.ROOT), valor);
            }
            String clave = a.getOrDefault("property", a.getOrDefault("name", "")).toLowerCase(Locale.ROOT);
            String imagen = null;
            if (List.of("og:image", "og:image:url", "twitter:image", "twitter:image:src").contains(clave)) {
                imagen = a.get("content");
            } else if ("image_src".equalsIgnoreCase(a.get("rel"))) {
                imagen = a.get("href");
            }
            if (imagen != null && !imagen.isBlank()) {
                try {
                    URI url = articulo.resolve(imagen.replace("&amp;", "&").trim());
                    String host = url.getHost();
                    String ruta = url.getPath() == null ? "" : url.getPath().toLowerCase(Locale.ROOT);
                    if ("https".equalsIgnoreCase(url.getScheme()) && host != null &&
                            url.getUserInfo() == null && url.getPort() == -1 &&
                            !host.equalsIgnoreCase("localhost") &&
                            !host.matches("(?:\\d{1,3}\\.){3}\\d{1,3}") &&
                            !ruta.contains("logo") && !ruta.contains("favicon") &&
                            !ruta.contains("placeholder") && url.toASCIIString().length() < 500) {
                        return url.toASCIIString();
                    }
                } catch (IllegalArgumentException ignored) { }
            }
        }
        return null;
    }
}
