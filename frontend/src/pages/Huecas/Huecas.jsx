import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    MapPin,
    Search,
    SlidersHorizontal,
    Star,
    UtensilsCrossed
} from "lucide-react";

import Layout from "../../components/Layout/Layout.jsx";

import {
    listarHuecas
} from "../../services/huecaService.js";

import {
    listarCategorias
} from "../../services/categoriaService.js";

import {
    obtenerImagenHueca
} from "../../assets/images/imageMap.js";

import "./Huecas.css";


function Huecas() {

    const [huecas, setHuecas] =
        useState([]);

    const [categorias, setCategorias] =
        useState([]);

    const [q, setQ] =
        useState("");

    const [categoria, setCategoria] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ===================================================
    // CARGA INICIAL
    // ===================================================

    useEffect(() => {

        cargarCategorias();
        cargarHuecas();

    }, []);


    // ===================================================
    // CAMBIAR CATEGORÍA
    // ===================================================

    useEffect(() => {

        cargarHuecas();

    }, [categoria]);


    // ===================================================
    // CARGAR CATEGORÍAS
    // ===================================================

    async function cargarCategorias() {

        try {

            const data =
                await listarCategorias();

            setCategorias(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.error(
                "Error cargando categorías:",
                err
            );

            setCategorias([]);
        }
    }


    // ===================================================
    // CARGAR HUECAS
    // ===================================================

    async function cargarHuecas() {

        try {

            setLoading(true);
            setError("");

            const data =
                await listarHuecas(
                    q,
                    categoria
                );

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
                "No se pudieron cargar las huecas."
            );

        } finally {

            setLoading(false);
        }
    }


    // ===================================================
    // BUSCAR
    // ===================================================

    function buscar(event) {

        event.preventDefault();

        cargarHuecas();
    }


    // ===================================================
    // RENDER
    // ===================================================

    return (
        <Layout>

            <section className="huecas-hero">

                <div className="container">

                    <span className="huecas-eyebrow">
                        Gastronomía esmeraldeña
                    </span>

                    <h1>
                        Descubre las mejores
                        huecas de Esmeraldas.
                    </h1>

                    <p>
                        Encuentra sabores tradicionales,
                        mariscos, bolones, encocados y
                        experiencias gastronómicas
                        auténticas de nuestra provincia.
                    </p>

                </div>

            </section>


            <section className="huecas-section">

                <div className="container">

                    {/* ============================= */}
                    {/* BUSCADOR */}
                    {/* ============================= */}

                    <form
                        className="huecas-toolbar"
                        onSubmit={buscar}
                    >

                        <div className="huecas-search">

                            <Search size={18} />

                            <input
                                type="search"
                                placeholder="Buscar hueca..."
                                value={q}
                                onChange={
                                    event =>
                                        setQ(
                                            event.target.value
                                        )
                                }
                            />

                        </div>


                        <div className="huecas-filter">

                            <SlidersHorizontal
                                size={18}
                            />

                            <select
                                value={categoria}
                                onChange={
                                    event =>
                                        setCategoria(
                                            event.target.value
                                        )
                                }
                            >

                                <option value="">
                                    Todas las categorías
                                </option>

                                {
                                    categorias.map(
                                        item => (
                                            <option
                                                key={item.id}
                                                value={
                                                    item.nombre
                                                }
                                            >
                                                {
                                                    item.nombre
                                                }
                                            </option>
                                        )
                                    )
                                }

                            </select>

                        </div>


                        <button
                            type="submit"
                            className="huecas-search-button"
                        >
                            Buscar
                        </button>

                    </form>


                    {/* ============================= */}
                    {/* TÍTULO */}
                    {/* ============================= */}

                    <div className="huecas-heading-row">

                        <div>

                            <span>
                                {huecas.length}
                                {" "}
                                {
                                    huecas.length === 1
                                        ? "resultado"
                                        : "resultados"
                                }
                            </span>

                            <h2>
                                Lugares para disfrutar
                            </h2>

                        </div>

                    </div>


                    {/* ============================= */}
                    {/* LOADING */}
                    {/* ============================= */}

                    {loading && (

                        <div className="huecas-status">
                            Cargando huecas...
                        </div>

                    )}


                    {/* ============================= */}
                    {/* ERROR */}
                    {/* ============================= */}

                    {!loading && error && (

                        <div className="huecas-status huecas-error">
                            {error}
                        </div>

                    )}


                    {/* ============================= */}
                    {/* SIN RESULTADOS */}
                    {/* ============================= */}

                    {
                        !loading &&
                        !error &&
                        huecas.length === 0 &&
                        (

                            <div className="huecas-empty">

                                <UtensilsCrossed
                                    size={42}
                                />

                                <h3>
                                    No encontramos resultados
                                </h3>

                                <p>
                                    Prueba con otro nombre
                                    o selecciona una categoría
                                    diferente.
                                </p>

                            </div>

                        )
                    }


                    {/* ============================= */}
                    {/* CARDS */}
                    {/* ============================= */}

                    {
                        !loading &&
                        !error &&
                        huecas.length > 0 &&
                        (

                            <div className="huecas-grid">

                                {
                                    huecas.map(
                                        (
                                            hueca,
                                            index
                                        ) => {

                                            const imagen =
                                                obtenerImagenHueca(
                                                    hueca,
                                                    index
                                                );

                                            return (

                                                <Link
                                                    to={
                                                        `/huecas/${hueca.id}`
                                                    }
                                                    className="hueca-card"
                                                    key={
                                                        hueca.id
                                                    }
                                                >

                                                    {/* IMAGEN */}

                                                    <div className="hueca-image-wrap">

                                                        <img
                                                            src={
                                                                imagen
                                                            }
                                                            alt={
                                                                hueca.nombre
                                                            }
                                                        />


                                                        {
                                                            hueca.etiqueta &&
                                                            (

                                                                <span className="hueca-tag">

                                                                    {
                                                                        hueca.etiqueta
                                                                    }

                                                                </span>

                                                            )
                                                        }


                                                        <div className="hueca-rating">

                                                            <Star
                                                                size={15}
                                                                fill="currentColor"
                                                            />

                                                            {
                                                                Number(
                                                                    hueca.calificacion ||
                                                                    0
                                                                ).toFixed(
                                                                    1
                                                                )
                                                            }

                                                        </div>

                                                    </div>


                                                    {/* CONTENIDO */}

                                                    <div className="hueca-content">

                                                        <span className="hueca-category">

                                                            {
                                                                hueca.categoriaNombre ||
                                                                hueca.categoria?.nombre ||
                                                                "Gastronomía"
                                                            }

                                                        </span>


                                                        <h3>
                                                            {
                                                                hueca.nombre
                                                            }
                                                        </h3>


                                                        <p>

                                                            {
                                                                hueca.descripcion ||
                                                                "Sabores auténticos de Esmeraldas."
                                                            }

                                                        </p>


                                                        <div className="hueca-address">

                                                            <MapPin
                                                                size={15}
                                                            />

                                                            <span>

                                                                {
                                                                    hueca.direccion ||
                                                                    "Esmeraldas"
                                                                }

                                                            </span>

                                                        </div>

                                                    </div>

                                                </Link>

                                            );
                                        }
                                    )
                                }

                            </div>

                        )
                    }

                </div>

            </section>

        </Layout>
    );
}


export default Huecas;