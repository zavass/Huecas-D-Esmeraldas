import gastronomia from "./gastronomia/Gastronomía Esmeraldeña.jpg";

import bolonMariscos from "./gastronomia/Bolón de Mariscos.jpg";
import bolonChancho from "./gastronomia/Bolón de Chancho.jpg";
import bolonQueso from "./gastronomia/Bolón de Queso.jpg";
import bolonVerde from "./gastronomia/Bolon de Verde.jpg";

import encocaoMariscos from "./gastronomia/Encocao de Mariscos.jpg";
import encocaoCamaron from "./gastronomia/encocao de camaron.jpg";
import encebollado from "./gastronomia/Encebollado.jpg";

import bandejaMariscos from "./gastronomia/Bandeja Mariscos.jpg";
import parrilladaMariscos from "./gastronomia/Parrillada de Mariscos.jpg";

import pargoMarinera from "./gastronomia/Pargo a la Marinera.jpg";
import camaronesApanados from "./gastronomia/Camarones Apanados.jpg";
import conchasAsadas from "./gastronomia/Conchas Asadas.jpg";
import tapao from "./gastronomia/Tapao Arrecho.jpg";

import playaLasPalmas from "./paisajes/Playa Las Palmas.jpg";
import maleconLasPalmas from "./paisajes/Malecón de Las Palmas.jpg";
import vistaAerea from "./paisajes/Vista Aérea Esmeraldas.jpg";
import atardecer from "./paisajes/Atardecer.jpg";
import camarones from "./paisajes/Camarones.jpg";

import bosqueMutile from "./paisajes/Bosque Mútile 1.jpg";
import manglares from "./paisajes/Manglares.jpg";
import panecillo from "./paisajes/Mirador El Panecillo.jpg";
import tachina from "./paisajes/Malecon de Tachina.jpg";
import rompeolas from "./paisajes/Rompeolas Las Palmas.jpg";
import puerto from "./paisajes/Puerto Pesquero Artesanal 1.jpg";
import cascada from "./paisajes/Cascada de Moncaune 2.jpg";

import marimbaLasPalmas from "./cultura/Marimba Las Palmas.jpg";
import marimbaMuseo from "./cultura/Marimba Museo.jpg";


// =======================================================
// NORMALIZAR TEXTO
// =======================================================

function normalizarTexto(texto = "") {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}


// =======================================================
// IMÁGENES DE HUECAS POR NOMBRE
// =======================================================

const imagenesHuecasPorNombre = {

    "sazon esmeraldena":
        gastronomia,

    "el rincon del bolon":
        bolonVerde,

    "la brasa del norte":
        parrilladaMariscos,

    /*
     * No tienes actualmente una foto
     * específica de pizza en multimedia.
     *
     * Por ahora se usa una imagen gastronómica
     * general hasta que agregues una foto de pizza.
     */
    "pizza del pacifico":
        gastronomia
};


// =======================================================
// IMÁGENES POR CATEGORÍA
// =======================================================

const imagenesPorCategoria = {

    "comida tipica":
        gastronomia,

    "bolones":
        bolonVerde,

    "asados":
        parrilladaMariscos,

    "pizza":
        gastronomia,

    "desayunos":
        bolonQueso,

    "mariscos":
        bandejaMariscos,

    "encocados":
        encocaoMariscos,

    "encebollados":
        encebollado
};


// =======================================================
// IMÁGENES GENERALES DE HUECAS
// =======================================================

export const imagenesHuecas = [
    gastronomia,
    bolonVerde,
    bolonMariscos,
    bolonChancho,
    bolonQueso,
    encocaoMariscos,
    encocaoCamaron,
    encebollado,
    bandejaMariscos,
    parrilladaMariscos,
    pargoMarinera,
    camaronesApanados,
    conchasAsadas,
    tapao
];


// =======================================================
// IMÁGENES DE HOTELES
// =======================================================

export const imagenesHoteles = [
    playaLasPalmas,
    maleconLasPalmas,
    vistaAerea,
    atardecer,
    rompeolas
];


// =======================================================
// IMÁGENES DE RUTAS
// =======================================================

export const imagenesRutas = [
    vistaAerea,
    playaLasPalmas,
    manglares,
    bosqueMutile,
    panecillo,
    tachina,
    puerto,
    cascada,
    camarones,
    maleconLasPalmas
];


// =======================================================
// IMÁGENES CULTURALES
// =======================================================

export const imagenesCultura = [
    marimbaLasPalmas,
    marimbaMuseo
];


// =======================================================
// FALLBACK POR ÍNDICE
// =======================================================

export function imagenHuecaPorIndice(index = 0) {

    return imagenesHuecas[
        Math.abs(index) %
        imagenesHuecas.length
    ];
}


export function imagenHotelPorIndice(index = 0) {

    return imagenesHoteles[
        Math.abs(index) %
        imagenesHoteles.length
    ];
}


export function imagenRutaPorIndice(index = 0) {

    return imagenesRutas[
        Math.abs(index) %
        imagenesRutas.length
    ];
}


// =======================================================
// OBTENER IMAGEN CORRECTA DE UNA HUECA
// =======================================================

export function obtenerImagenHueca(
    hueca,
    index = 0
) {

    if (!hueca) {
        return imagenHuecaPorIndice(index);
    }

    const nombre =
        normalizarTexto(
            hueca.nombre
        );


    // ---------------------------------------
    // 1. Buscar por nombre exacto
    // ---------------------------------------

    if (
        imagenesHuecasPorNombre[nombre]
    ) {
        return imagenesHuecasPorNombre[
            nombre
        ];
    }


    // ---------------------------------------
    // 2. Buscar por categoría
    // ---------------------------------------

    const categoria =
        normalizarTexto(
            hueca.categoriaNombre ||
            hueca.categoria?.nombre ||
            ""
        );

    if (
        imagenesPorCategoria[
            categoria
        ]
    ) {
        return imagenesPorCategoria[
            categoria
        ];
    }


    // ---------------------------------------
    // 3. Si el backend ya tiene
    //    una imagen propia, usarla
    // ---------------------------------------

    if (hueca.imagen) {

        const imagenBackend =
            hueca.imagen.trim();

        if (
            !imagenBackend.includes(
                "images.unsplash.com"
            ) &&
            (
                imagenBackend.startsWith(
                    "http://"
                ) ||
                imagenBackend.startsWith(
                    "https://"
                ) ||
                imagenBackend.startsWith(
                    "/images/"
                ) ||
                imagenBackend.startsWith(
                    "data:"
                )
            )
        ) {
            return imagenBackend;
        }
    }


    // ---------------------------------------
    // 4. Último fallback
    // ---------------------------------------

    return imagenHuecaPorIndice(
        index
    );
}


// =======================================================
// RESOLVER IMAGEN GENÉRICA
// =======================================================

export function resolverImagen(
    imagenBackend,
    fallback
) {

    if (!imagenBackend) {
        return fallback;
    }

    const imagen =
        imagenBackend.trim();

    /*
     * Mientras el DataSeeder tenga
     * imágenes antiguas de Unsplash,
     * usamos nuestras imágenes locales.
     */
    if (
        imagen.includes(
            "images.unsplash.com"
        )
    ) {
        return fallback;
    }

    if (
        imagen.startsWith("http://") ||
        imagen.startsWith("https://") ||
        imagen.startsWith("/images/") ||
        imagen.startsWith("data:")
    ) {
        return imagen;
    }

    return fallback;
}