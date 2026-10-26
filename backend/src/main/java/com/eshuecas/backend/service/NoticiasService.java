package com.eshuecas.backend.service;

import com.eshuecas.backend.entity.Noticia;
import com.eshuecas.backend.repository.NoticiaRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class NoticiasService {

    private static final String USER_AGENT = "Mozilla/5.0";
    private static final ZoneId ECUADOR_ZONE = ZoneId.of("America/Guayaquil");

    private final NoticiaRepository noticiaRepository;
    private final FiltroNoticiasEsmeraldas filtroNoticiasEsmeraldas;

    @Value("${noticias.habilitadas:true}")
    private boolean noticiasHabilitadas;

    @Value("${noticias.publicar-automaticamente:true}")
    private boolean publicarAutomaticamente;

    public NoticiasService(NoticiaRepository noticiaRepository,
                           FiltroNoticiasEsmeraldas filtroNoticiasEsmeraldas) {
        this.noticiaRepository = noticiaRepository;
        this.filtroNoticiasEsmeraldas = filtroNoticiasEsmeraldas;
    }

    private static final List<String> CONSULTAS_HOY = List.of(
            "Esmeraldas Ecuador turismo when:1d",
            "Atacames turismo when:1d",
            "Esmeraldas Ecuador gastronomía when:1d",
            "Esmeraldas Ecuador cultura when:1d",
            "Esmeraldas Ecuador feria when:1d",
            "Esmeraldas Ecuador comunidad when:1d",
            "Esmeraldas Ecuador eventos when:1d"
    );

    private static final List<String> CONSULTAS_RECIENTES = List.of(
            "Esmeraldas Ecuador turismo when:7d",
            "Atacames turismo when:7d",
            "Tonsupa turismo when:7d",
            "Muisne turismo when:7d",
            "Esmeraldas Ecuador gastronomía when:7d",
            "Esmeraldas Ecuador cultura when:7d",
            "Esmeraldas Ecuador feria when:7d",
            "Esmeraldas Ecuador hoteleros when:7d",
            "Esmeraldas Ecuador comunidad when:7d",
            "Esmeraldas Ecuador ciclistas when:7d",
            "Esmeraldas Ecuador playas when:7d"
    );

    @PostConstruct
    public void cargarAlIniciar() {
        if (noticiasHabilitadas) {
            actualizarNoticiasDesdeFuentes();
        }
    }

    @Scheduled(cron = "${noticias.cron:0 0 7 * * *}", zone = "America/Guayaquil")
    public void actualizarProgramado() {
        if (noticiasHabilitadas) {
            actualizarNoticiasDesdeFuentes();
        }
    }

    public List<Noticia> listarNoticiasPublicadas() {
        return noticiaRepository.findByPublicadaTrueOrderByFechaDescIdDesc();
    }

    public List<Noticia> actualizarAhoraYListar() {
        actualizarNoticiasDesdeFuentes();
        return listarNoticiasPublicadas();
    }

    public void actualizarNoticiasDesdeFuentes() {
        if (!noticiasHabilitadas) {
            return;
        }

        int totalGuardadas = 0;
        int totalLeidas = 0;

        Set<String> urlsVistasEnEstaEjecucion = new HashSet<>();

        for (String consulta : CONSULTAS_HOY) {
            ResultadoImportacion resultado = importarDesdeConsulta(consulta, urlsVistasEnEstaEjecucion);
            totalGuardadas += resultado.guardadas();
            totalLeidas += resultado.leidas();
        }

        boolean hayNoticiasDeHoy = noticiaRepository.findByPublicadaTrueOrderByFechaDescIdDesc()
                .stream()
                .anyMatch(n -> LocalDate.now(ECUADOR_ZONE).equals(n.getFecha()));

        if (!hayNoticiasDeHoy) {
            for (String consulta : CONSULTAS_RECIENTES) {
                ResultadoImportacion resultado = importarDesdeConsulta(consulta, urlsVistasEnEstaEjecucion);
                totalGuardadas += resultado.guardadas();
                totalLeidas += resultado.leidas();
            }
        }

        revalidarNoticiasGuardadas();

        System.out.println("NOTICIAS: leidas=" + totalLeidas + ", guardadas=" + totalGuardadas
                + ", publicadas=" + noticiaRepository.countByPublicadaTrue());
    }

    private ResultadoImportacion importarDesdeConsulta(String consulta, Set<String> urlsVistasEnEstaEjecucion) {
        int leidas = 0;
        int guardadas = 0;

        try {
            String rssUrl = construirUrlGoogleNews(consulta);

            HttpURLConnection connection = (HttpURLConnection) URI.create(rssUrl).toURL().openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(10000);
            connection.setRequestProperty("User-Agent", USER_AGENT);

            try (InputStream inputStream = connection.getInputStream()) {
                var factory = DocumentBuilderFactory.newInstance();
                factory.setNamespaceAware(false);

                var builder = factory.newDocumentBuilder();
                var xml = builder.parse(inputStream);

                NodeList items = xml.getElementsByTagName("item");

                for (int i = 0; i < items.getLength(); i++) {
                    org.w3c.dom.Element item = (org.w3c.dom.Element) items.item(i);

                    String tituloOriginal = getText(item, "title");
                    String descripcionHtml = getText(item, "description");
                    String linkRss = getText(item, "link");
                    String fuente = getText(item, "source");
                    String fechaPublicacion = getText(item, "pubDate");

                    String urlReal = extraerUrlReal(descripcionHtml, linkRss);
                    if (urlReal == null || urlReal.isBlank()) {
                        urlReal = linkRss;
                    }

                    if (urlReal == null || urlReal.isBlank()) {
                        continue;
                    }

                    if (urlsVistasEnEstaEjecucion.contains(urlReal)) {
                        continue;
                    }
                    urlsVistasEnEstaEjecucion.add(urlReal);

                    String resumenPlano = limpiarResumen(descripcionHtml);
                    String tituloLimpio = filtroNoticiasEsmeraldas.limpiarTitulo(tituloOriginal, fuente);

                    leidas++;

                    if (!filtroNoticiasEsmeraldas.debePublicarse(tituloLimpio, resumenPlano, fuente)) {
                        continue;
                    }

                    Optional<Noticia> existente = noticiaRepository.findByUrl(urlReal);

                    String categoria = filtroNoticiasEsmeraldas.clasificarCategoria(tituloLimpio, resumenPlano);
                    String imagen = extraerImagen(item, descripcionHtml, urlReal);

                    if (existente.isPresent()) {
                        Noticia noticiaExistente = existente.get();
                        noticiaExistente.setTitulo(tituloLimpio);
                        noticiaExistente.setResumen(recortarTexto(resumenPlano, 220));
                        noticiaExistente.setCategoria(categoria);
                        noticiaExistente.setFuente(fuente == null || fuente.isBlank() ? "Fuente externa" : fuente);
                        noticiaExistente.setFecha(parsearFecha(fechaPublicacion));
                        noticiaExistente.setPublicada(publicarAutomaticamente);

                        if (imagen != null && !imagen.isBlank()) {
                            noticiaExistente.setImagen(imagen);
                        }

                        noticiaRepository.save(noticiaExistente);
                        continue;
                    }

                    Noticia noticia = new Noticia();
                    noticia.setTitulo(tituloLimpio);
                    noticia.setResumen(recortarTexto(resumenPlano, 220));
                    noticia.setCategoria(categoria);
                    noticia.setFecha(parsearFecha(fechaPublicacion));
                    noticia.setFuente(fuente == null || fuente.isBlank() ? "Fuente externa" : fuente);
                    noticia.setUrl(urlReal);
                    noticia.setImagen((imagen == null || imagen.isBlank()) ? "" : imagen);
                    noticia.setPublicada(publicarAutomaticamente);

                    noticiaRepository.save(noticia);
                    guardadas++;
                }
            }

        } catch (Exception e) {
            System.out.println("No se pudo leer consulta RSS: " + consulta + " -> " + e.getMessage());
        }

        return new ResultadoImportacion(leidas, guardadas);
    }

    private void revalidarNoticiasGuardadas() {
        List<Noticia> noticias = noticiaRepository.findAll();

        for (Noticia noticia : noticias) {
            boolean publicar = filtroNoticiasEsmeraldas.debePublicarse(
                    noticia.getTitulo(),
                    noticia.getResumen(),
                    noticia.getFuente()
            );

            noticia.setPublicada(publicarAutomaticamente && publicar);

            if (noticia.getCategoria() == null || noticia.getCategoria().isBlank()) {
                noticia.setCategoria(
                        filtroNoticiasEsmeraldas.clasificarCategoria(noticia.getTitulo(), noticia.getResumen())
                );
            }

            if (noticia.getTitulo() != null) {
                noticia.setTitulo(
                        filtroNoticiasEsmeraldas.limpiarTitulo(noticia.getTitulo(), noticia.getFuente())
                );
            }

            noticiaRepository.save(noticia);
        }
    }

    private String construirUrlGoogleNews(String consulta) {
        String q = URLEncoder.encode(consulta, StandardCharsets.UTF_8);
        return "https://news.google.com/rss/search?q=" + q + "&hl=es-419&gl=EC&ceid=EC:es-419";
    }

    private String extraerUrlReal(String descripcionHtml, String linkRss) {
        try {
            if (descripcionHtml != null && !descripcionHtml.isBlank()) {
                Document doc = Jsoup.parse(descripcionHtml);
                for (Element link : doc.select("a[href]")) {
                    String href = link.attr("href");
                    if (href != null && !href.isBlank() && !href.contains("news.google.com")) {
                        return href;
                    }
                }
            }
        } catch (Exception ignored) {
        }
        return linkRss;
    }

    private String extraerImagen(org.w3c.dom.Element item, String descripcionHtml, String urlReal) {
        try {
            String mediaContent = getAttributeFromTag(item, "media:content", "url");
            if (mediaContent != null && !mediaContent.isBlank()) {
                return mediaContent;
            }

            String mediaThumbnail = getAttributeFromTag(item, "media:thumbnail", "url");
            if (mediaThumbnail != null && !mediaThumbnail.isBlank()) {
                return mediaThumbnail;
            }

            String enclosure = getAttributeFromTag(item, "enclosure", "url");
            if (enclosure != null && !enclosure.isBlank()) {
                return enclosure;
            }

            if (descripcionHtml != null && !descripcionHtml.isBlank()) {
                Document doc = Jsoup.parse(descripcionHtml);
                Element img = doc.selectFirst("img[src]");
                if (img != null) {
                    String src = img.attr("src");
                    if (src != null && !src.isBlank()) {
                        return src;
                    }
                }
            }

            if (urlReal != null && !urlReal.isBlank()) {
                Document articulo = Jsoup.connect(urlReal)
                        .userAgent(USER_AGENT)
                        .timeout(7000)
                        .followRedirects(true)
                        .get();

                Element ogImage = articulo.selectFirst("meta[property=og:image], meta[name=og:image]");
                if (ogImage != null) {
                    String imagen = ogImage.attr("content");
                    if (imagen != null && !imagen.isBlank()) {
                        return imagen;
                    }
                }
            }
        } catch (Exception ignored) {
        }

        return "";
    }

    private String limpiarResumen(String descripcionHtml) {
        if (descripcionHtml == null || descripcionHtml.isBlank()) {
            return "";
        }

        String texto = Jsoup.parse(descripcionHtml).text();

        texto = texto.replace("Leer más", "")
                .replace("Read more", "")
                .replaceAll("\\s{2,}", " ")
                .trim();

        return texto;
    }

    private LocalDate parsearFecha(String pubDate) {
        if (pubDate == null || pubDate.isBlank()) {
            return LocalDate.now(ECUADOR_ZONE);
        }

        try {
            ZonedDateTime zdt = ZonedDateTime.parse(pubDate, DateTimeFormatter.RFC_1123_DATE_TIME);
            return zdt.withZoneSameInstant(ECUADOR_ZONE).toLocalDate();
        } catch (Exception e) {
            return LocalDate.now(ECUADOR_ZONE);
        }
    }

    private String recortarTexto(String texto, int max) {
        if (texto == null) return "";
        if (texto.length() <= max) return texto;
        return texto.substring(0, max).trim() + "...";
    }

    private String getText(org.w3c.dom.Element parent, String tagName) {
        NodeList nodes = parent.getElementsByTagName(tagName);
        if (nodes.getLength() == 0 || nodes.item(0) == null) {
            return "";
        }
        return nodes.item(0).getTextContent();
    }

    private String getAttributeFromTag(org.w3c.dom.Element parent, String tagName, String attribute) {
        NodeList nodes = parent.getElementsByTagName(tagName);
        if (nodes.getLength() == 0 || nodes.item(0) == null) {
            return "";
        }
        org.w3c.dom.Node node = nodes.item(0);
        if (node.getAttributes() == null || node.getAttributes().getNamedItem(attribute) == null) {
            return "";
        }
        return node.getAttributes().getNamedItem(attribute).getNodeValue();
    }

    private record ResultadoImportacion(int leidas, int guardadas) {
    }
}