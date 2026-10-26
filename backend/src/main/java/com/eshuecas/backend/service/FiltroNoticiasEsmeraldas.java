package com.eshuecas.backend.service;

import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;

@Component
public class FiltroNoticiasEsmeraldas {

    private static final List<String> UBICACIONES_ESMERALDAS = List.of(
            "esmeraldas",
            "atacames",
            "tonsupa",
            "same",
            "sua",
            "súa",
            "muisne",
            "quininde",
            "quinindé",
            "rioverde",
            "rio verde",
            "san lorenzo",
            "borbon",
            "borbón",
            "valdez",
            "limones",
            "tachina",
            "tachina",
            "las palmas",
            "viche"
    );

    private static final List<String> PALABRAS_ECUADOR = List.of(
            "ecuador",
            "ecuatoriano",
            "ecuatoriana",
            "provincia",
            "cantón",
            "canton",
            "prefectura",
            "ministerio de turismo",
            "esmeraldas ecuador"
    );

    private static final List<String> EXCLUIR_OTROS_PAISES = List.of(
            "colombia",
            "colombiano",
            "colombiana",
            "boyaca",
            "boyacá",
            "bogota",
            "bogotá",
            "antioquia",
            "medellin",
            "medellín",
            "cundinamarca",
            "cartagena",
            "bucaramanga",
            "esmeraldas colombianas",
            "esmeraldas colombianos",
            "piedras preciosas",
            "mina de esmeraldas",
            "mina esmeraldas"
    );

    private static final List<String> TEMAS_VALIDOS = List.of(
            "turismo",
            "hotel",
            "hoteles",
            "gastronomia",
            "gastronomía",
            "restaurante",
            "restaurantes",
            "comida",
            "festival",
            "feria",
            "evento",
            "eventos",
            "cultura",
            "artesania",
            "artesanía",
            "música",
            "musica",
            "marimba",
            "emprendimiento",
            "emprendedores",
            "comunidad",
            "playa",
            "deporte",
            "deportes",
            "ciclistas",
            "turistas",
            "visitantes",
            "malecon",
            "malecón",
            "tradicion",
            "tradición",
            "ecoturismo"
    );

    private static final List<String> PALABRAS_NEGATIVAS = List.of(
            "toque de queda",
            "asesin",
            "muerte",
            "murio",
            "murió",
            "balacera",
            "robo",
            "delito",
            "extorsion",
            "extorsión",
            "secuestro",
            "accidente fatal",
            "homicidio",
            "violencia",
            "violento",
            "heridos",
            "herido",
            "emergencia",
            "crimen",
            "capturado",
            "capturan",
            "allanamiento",
            "tragedia"
    );

    public boolean debePublicarse(String titulo, String resumen, String fuente) {
        String texto = normalizar((titulo == null ? "" : titulo) + " " +
                (resumen == null ? "" : resumen) + " " +
                (fuente == null ? "" : fuente));

        return esDeEsmeraldasEcuador(texto)
                && trataTemaValido(texto)
                && !contienePalabrasNegativas(texto);
    }

    public String clasificarCategoria(String titulo, String resumen) {
        String texto = normalizar((titulo == null ? "" : titulo) + " " + (resumen == null ? "" : resumen));

        if (contieneAlguna(texto, List.of("gastronomia", "gastronomía", "restaurante", "restaurantes", "comida", "plato", "sabores"))) {
            return "Gastronomía";
        }

        if (contieneAlguna(texto, List.of("cultura", "marimba", "artesania", "artesanía", "tradicion", "tradición", "música", "musica"))) {
            return "Cultura";
        }

        if (contieneAlguna(texto, List.of("festival", "feria", "evento", "eventos", "agenda"))) {
            return "Eventos";
        }

        if (contieneAlguna(texto, List.of("comunidad", "emprendimiento", "emprendedores", "deporte", "deportes", "ciclistas", "limpieza", "reciclaje"))) {
            return "Comunidad";
        }

        if (contieneAlguna(texto, List.of("turismo", "hotel", "hoteles", "turistas", "visitantes", "playa", "ecoturismo", "malecon", "malecón"))) {
            return "Turismo";
        }

        return "Actualidad";
    }

    public String limpiarTitulo(String titulo, String fuente) {
        if (titulo == null || titulo.isBlank()) {
            return "Noticia de Esmeraldas";
        }

        String limpio = titulo.trim();

        if (fuente != null && !fuente.isBlank()) {
            limpio = limpio.replace(" - " + fuente, "").replace(" | " + fuente, "");
        }

        limpio = limpio.replaceAll("\\s+-\\s+Diario La Hora$", "");
        limpio = limpio.replaceAll("\\s+-\\s+El Universo$", "");
        limpio = limpio.replaceAll("\\s+-\\s+Howl\\.link$", "");
        limpio = limpio.replaceAll("\\s{2,}", " ").trim();

        return limpio;
    }

    private boolean esDeEsmeraldasEcuador(String texto) {
        if (contieneAlguna(texto, EXCLUIR_OTROS_PAISES)) {
            return false;
        }

        if (contieneAlguna(texto, UBICACIONES_ESMERALDAS)) {
            return true;
        }

        return texto.contains("esmeraldas") && contieneAlguna(texto, PALABRAS_ECUADOR);
    }

    private boolean trataTemaValido(String texto) {
        return contieneAlguna(texto, TEMAS_VALIDOS);
    }

    private boolean contienePalabrasNegativas(String texto) {
        return contieneAlguna(texto, PALABRAS_NEGATIVAS);
    }

    private boolean contieneAlguna(String texto, List<String> palabras) {
        for (String palabra : palabras) {
            if (texto.contains(normalizar(palabra))) {
                return true;
            }
        }
        return false;
    }

    private String normalizar(String texto) {
        if (texto == null) return "";
        String normalizado = Normalizer.normalize(texto, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
        return normalizado.toLowerCase(Locale.ROOT);
    }
}