import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Search,
    SlidersHorizontal,
    Grid2X2
} from "lucide-react";

import Layout from "../../components/Layout/Layout.jsx";
import HuecaCard from "../../components/Cards/HuecaCard.jsx";

import "./Huecas.css";


const API_URL =
    "http://localhost:8080/api";


/*
============================================================
CATEGORÍAS VISUALES DEL FRONTEND
============================================================
*/

const categoriasVisuales = [

    {
        id: "TODAS",
        nombre: "Todas",
        icono: "▦",
        palabras: []
    },

    {
        id: "MARISCOS",
        nombre: "Mariscos",
        icono: "🦐",
        palabras: [
            "marisco",
            "mariscos",
            "camarón",
            "camaron",
            "camarones",
            "langostino",
            "langostinos",
            "concha",
            "conchas",
            "pescado"
        ]
    },

    {
        id: "ENCOCADOS",
        nombre: "Encocados",
        icono: "🥘",
        palabras: [
            "encocado",
            "encocao",
            "encocados",
            "encocaos"
        ]
    },

    {
        id: "BOLONES",
        nombre: "Bolones",
        icono: "🫓",
        palabras: [
            "bolón",
            "bolon",
            "bolones",
            "verde"
        ]
    },

    {
        id: "PLATOS_TIPICOS",
        nombre: "Platos típicos",
        icono: "🍲",
        palabras: [
            "típico",
            "tipico",
            "típicos",
            "tipicos",
            "tradicional",
            "tradicionales",
            "comida típica",
            "comida tipica",
            "tigrillo",
            "tapao",
            "ensumacao"
        ]
    },

    {
        id: "PARRILLADAS",
        nombre: "Parrilladas",
        icono: "♨️",
        palabras: [
            "parrilla",
            "parrillada",
            "parrilladas",
            "asado",
            "asados",
            "brasa"
        ]
    },

    {
        id: "CEVICHES",
        nombre: "Ceviches",
        icono: "🐟",
        palabras: [
            "ceviche",
            "ceviches"
        ]
    },

    {
        id: "BEBIDAS",
        nombre: "Bebidas",
        icono: "🥤",
        palabras: [
            "bebida",
            "bebidas",
            "jugo",
            "jugos",
            "batido",
            "batidos"
        ]
    },

    {
        id: "POSTRES",
        nombre: "Postres",
        icono: "🍰",
        palabras: [
            "postre",
            "postres",
            "dulce",
            "dulces"
        ]
    }

];


function Huecas() {

    const [huecas, setHuecas] =
        useState([]);

    const [busqueda, setBusqueda] =
        useState("");

    const [categoriaSeleccionada, setCategoriaSeleccionada] =
        useState("TODAS");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    /*
    ============================================================
    CARGAR HUECAS
    ============================================================
    */

    useEffect(() => {

        cargarHuecas();

    }, []);


    async function cargarHuecas() {

        try {

            setLoading(true);

            setError("");


            const response =
                await fetch(
                    `${API_URL}/huecas`
                );


            if (!response.ok) {

                throw new Error(
                    "No fue posible cargar las huecas."
                );
            }


            const data =
                await response.json();


            setHuecas(
                Array.isArray(data)
                    ? data
                    : []
            );


        } catch (err) {

            console.error(
                "Error cargando huecas:",
                err
            );


            setError(
                err.message ||
                "Ocurrió un error al cargar las huecas."
            );

        } finally {

            setLoading(false);

        }

    }


    /*
    ============================================================
    NORMALIZAR TEXTO
    ============================================================
    */

    function normalizarTexto(texto = "") {

        return String(texto)
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .toLowerCase()
            .trim();
    }


    /*
    ============================================================
    FILTRADO
    ============================================================
    */

    const huecasFiltradas =
        useMemo(() => {

            let resultado =
                [...huecas];


            /*
            --------------------------------------------
            BUSCADOR GENERAL
            --------------------------------------------
            */

            const textoBusqueda =
                normalizarTexto(
                    busqueda
                );


            if (textoBusqueda) {

                resultado =
                    resultado.filter(
                        hueca => {

                            const textoCompleto =
                                normalizarTexto(
                                    `
                                    ${hueca.nombre || ""}
                                    ${hueca.descripcion || ""}
                                    ${hueca.direccion || ""}
                                    ${hueca.categoriaNombre || ""}
                                    ${hueca.etiqueta || ""}
                                    `
                                );


                            return textoCompleto.includes(
                                textoBusqueda
                            );

                        }
                    );
            }


            /*
            --------------------------------------------
            FILTRO POR CATEGORÍA VISUAL
            --------------------------------------------
            */

            if (
                categoriaSeleccionada !==
                "TODAS"
            ) {

                const categoria =
                    categoriasVisuales.find(
                        item =>
                            item.id ===
                            categoriaSeleccionada
                    );


                if (categoria) {

                    resultado =
                        resultado.filter(
                            hueca => {

                                const textoHueca =
                                    normalizarTexto(
                                        `
                                        ${hueca.nombre || ""}
                                        ${hueca.descripcion || ""}
                                        ${hueca.categoriaNombre || ""}
                                        ${hueca.etiqueta || ""}
                                        `
                                    );


                                return categoria.palabras.some(
                                    palabra =>

                                        textoHueca.includes(
                                            normalizarTexto(
                                                palabra
                                            )
                                        )

                                );

                            }
                        );
                }
            }


            return resultado;

        }, [
            huecas,
            busqueda,
            categoriaSeleccionada
        ]);


    return (

        <Layout>

            <main className="huecas-page">


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="huecas-hero">

                    <div className="huecas-hero-overlay" />


                    <div className="container huecas-hero-content">

                        <div className="huecas-hero-copy">

                            <span className="huecas-eyebrow">

                                Gastronomía Esmeraldeña

                            </span>


                            <h1>

                                Descubre las mejores

                                <span>
                                    huecas de Esmeraldas
                                </span>

                            </h1>


                            <p>

                                Sabores auténticos,
                                recetas tradicionales y
                                la calidez de nuestra gente.

                                <br />

                                Explora, califica y vive
                                la verdadera gastronomía
                                esmeraldeña.

                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    BUSCADOR
                ================================================= */}

                <section className="container huecas-search-section">

                    <div className="huecas-search-panel">


                        <div className="huecas-search-input">

                            <Search size={20} />

                            <input
                                type="text"
                                value={busqueda}
                                onChange={
                                    event =>
                                        setBusqueda(
                                            event.target.value
                                        )
                                }
                                placeholder="Buscar por nombre de hueca, plato o ubicación..."
                            />

                        </div>


                        <div className="huecas-select-wrapper">

                            <SlidersHorizontal
                                size={19}
                            />


                            <select
                                value={
                                    categoriaSeleccionada
                                }
                                onChange={
                                    event =>
                                        setCategoriaSeleccionada(
                                            event.target.value
                                        )
                                }
                            >

                                {
                                    categoriasVisuales.map(
                                        categoria => (

                                            <option
                                                key={
                                                    categoria.id
                                                }
                                                value={
                                                    categoria.id
                                                }
                                            >

                                                {
                                                    categoria.nombre
                                                }

                                            </option>

                                        )
                                    )
                                }

                            </select>

                        </div>


                        <button
                            type="button"
                            className="huecas-search-button"
                        >

                            <Search size={19} />

                            Buscar

                        </button>

                    </div>

                </section>


                {/* =================================================
                    CATEGORÍAS VISUALES
                ================================================= */}

                <section className="container huecas-categories">

                    {
                        categoriasVisuales.map(
                            categoria => (

                                <button
                                    key={categoria.id}
                                    type="button"
                                    className={
                                        categoriaSeleccionada
                                        ===
                                        categoria.id
                                            ? "category-pill active"
                                            : "category-pill"
                                    }
                                    onClick={() =>
                                        setCategoriaSeleccionada(
                                            categoria.id
                                        )
                                    }
                                >

                                    <span className="category-icon">

                                        {
                                            categoria.id ===
                                            "TODAS"
                                                ? (
                                                    <Grid2X2
                                                        size={23}
                                                    />
                                                )
                                                : (
                                                    <span className="category-emoji">

                                                        {
                                                            categoria.icono
                                                        }

                                                    </span>
                                                )
                                        }

                                    </span>


                                    <strong>

                                        {
                                            categoria.nombre
                                        }

                                    </strong>

                                </button>

                            )
                        )
                    }

                </section>


                {/* =================================================
                    RESULTADOS
                ================================================= */}

                <section className="container huecas-results">


                    <div className="huecas-results-header">

                        <div>

                            <span className="huecas-count">

                                {
                                    huecasFiltradas.length
                                }

                                {
                                    huecasFiltradas.length === 1
                                        ? " HUECA ENCONTRADA"
                                        : " HUECAS ENCONTRADAS"
                                }

                            </span>


                            <h2>
                                Huecas recomendadas
                            </h2>

                        </div>


                        <div className="huecas-order">

                            <span>
                                Ordenar por:
                            </span>


                            <select>

                                <option>
                                    Más populares
                                </option>

                                <option>
                                    Mejor valoradas
                                </option>

                                <option>
                                    Nombre
                                </option>

                            </select>

                        </div>

                    </div>


                    {
                        loading && (

                            <div className="huecas-state">

                                <span className="huecas-loader" />

                                <p>
                                    Cargando huecas...
                                </p>

                            </div>

                        )
                    }


                    {
                        !loading &&
                        error && (

                            <div className="huecas-state huecas-error">

                                <p>
                                    {error}
                                </p>


                                <button
                                    onClick={
                                        cargarHuecas
                                    }
                                >

                                    Reintentar

                                </button>

                            </div>

                        )
                    }


                    {
                        !loading &&
                        !error &&
                        huecasFiltradas.length === 0 && (

                            <div className="huecas-state">

                                <Search size={36} />

                                <h3>
                                    No encontramos huecas
                                </h3>

                                <p>
                                    Prueba otra categoría
                                    o una búsqueda diferente.
                                </p>

                            </div>

                        )
                    }


                    {
                        !loading &&
                        !error &&
                        huecasFiltradas.length > 0 && (

                            <div className="huecas-grid">

                                {
                                    huecasFiltradas.map(
                                        (
                                            hueca,
                                            index
                                        ) => (

                                            <HuecaCard
                                                key={
                                                    hueca.id
                                                }
                                                hueca={
                                                    hueca
                                                }
                                                index={
                                                    index
                                                }
                                            />

                                        )
                                    )
                                }

                            </div>

                        )
                    }

                </section>

            </main>

        </Layout>

    );
}


export default Huecas;