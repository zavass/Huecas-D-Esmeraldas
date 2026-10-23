import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    createPortal
} from "react-dom";

import {
    ArrowRight,
    CalendarDays,
    ChevronDown,
    Clock3,
    Compass,
    Heart,
    Leaf,
    MapPin,
    Mountain,
    Navigation,
    Search,
    Sparkles,
    Users,
    X
} from "lucide-react";

import {
    Link
} from "react-router-dom";

import Layout
    from "../../components/Layout/Layout.jsx";

import {
    listarRutas
} from "../../services/rutaService.js";

import "./Rutas.css";


/* =========================================================
   ESTILOS PARA RUTAS REALES
========================================================= */

const estilosRuta = [
    {
        etiqueta: "Más popular",
        tipo: "Playas y naturaleza",
        dificultad: "Fácil",
        clase: "ruta-card-playa"
    },
    {
        etiqueta: "Naturaleza pura",
        tipo: "Aventura",
        dificultad: "Moderada",
        clase: "ruta-card-naturaleza"
    },
    {
        etiqueta: "Cultura y tradición",
        tipo: "Cultura",
        dificultad: "Fácil",
        clase: "ruta-card-cultura"
    }
];


/* =========================================================
   RUTAS DEMOSTRATIVAS
========================================================= */

const rutasDemo = [
    {
        id: "demo-1",

        titulo:
            "Ruta de las Playas",

        tipo:
            "Sol, mar y tradición",

        descripcion:
            "Recorre algunas de las playas más representativas de Esmeraldas y disfruta del paisaje costero.",

        origen:
            "Esmeraldas",

        destino:
            "Las Palmas",

        duracion:
            "1 día",

        distancia:
            "12 km",

        dificultad:
            "Fácil",

        imagen:
            "/images/logo/rutas.png",

        posicion:
            "32% center",

        etiqueta:
            "Más popular"
    },

    {
        id: "demo-2",

        titulo:
            "Ruta de la Naturaleza",

        tipo:
            "Aventura y paisajes",

        descripcion:
            "Explora zonas verdes, ríos, senderos y espacios naturales llenos de biodiversidad.",

        origen:
            "Esmeraldas",

        destino:
            "Río Verde",

        duracion:
            "1 día",

        distancia:
            "35 km",

        dificultad:
            "Moderada",

        imagen:
            "/images/logo/rutas.png",

        posicion:
            "70% center",

        etiqueta:
            "Naturaleza pura"
    },

    {
        id: "demo-3",

        titulo:
            "Ruta Cultural Esmeraldeña",

        tipo:
            "Historia, música y tradición",

        descripcion:
            "Conoce espacios donde la cultura afroesmeraldeña, la marimba y nuestras tradiciones siguen vivas.",

        origen:
            "Centro",

        destino:
            "Comunidades",

        duracion:
            "1 día",

        distancia:
            "18 km",

        dificultad:
            "Fácil",

        imagen:
            "/images/logo/rutas.png",

        posicion:
            "88% center",

        etiqueta:
            "Cultura y tradición"
    }
];


function Rutas() {

    const [rutas, setRutas] =
        useState([]);

    const [q, setQ] =
        useState("");

    const [zona, setZona] =
        useState("todas");

    const [duracion, setDuracion] =
        useState("todas");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [modalLogin, setModalLogin] =
        useState(false);

    const [
        rutaSeleccionada,
        setRutaSeleccionada
    ] = useState(null);


    /* =====================================================
       CARGAR RUTAS
    ===================================================== */

    useEffect(() => {

        cargarRutas();

    }, []);


    async function cargarRutas() {

        try {

            setLoading(true);

            setError("");

            const data =
                await listarRutas(q);

            setRutas(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            setError(
                err.message ||
                "No se pudieron cargar las rutas."
            );

        } finally {

            setLoading(false);
        }
    }


    /* =====================================================
       BUSCAR
    ===================================================== */

    function buscar(event) {

        event.preventDefault();

        cargarRutas();
    }


    /* =====================================================
       MODAL
    ===================================================== */

    function abrirModalLogin(ruta) {

        setRutaSeleccionada(
            ruta || null
        );

        setModalLogin(true);

        document.body.style.overflow =
            "hidden";
    }


    function cerrarModalLogin() {

        setModalLogin(false);

        setRutaSeleccionada(null);

        document.body.style.overflow =
            "";
    }


    /* =====================================================
       FILTROS
    ===================================================== */

    const rutasFiltradas =
        useMemo(() => {

            let resultado =
                [...rutas];


            /* ZONA */

            if (zona !== "todas") {

                resultado =
                    resultado.filter(
                        ruta => {

                            const texto = `
                                ${ruta.origen || ""}
                                ${ruta.destino || ""}
                                ${ruta.titulo || ""}
                            `
                                .toLowerCase();

                            return texto.includes(
                                zona.toLowerCase()
                            );
                        }
                    );
            }


            /* DURACIÓN */

            if (
                duracion !==
                "todas"
            ) {

                resultado =
                    resultado.filter(
                        ruta => {

                            const texto =
                                String(
                                    ruta.duracion ||
                                    ""
                                )
                                    .toLowerCase();


                            if (
                                duracion ===
                                "corta"
                            ) {

                                return (
                                    texto.includes(
                                        "minuto"
                                    ) ||
                                    texto.includes(
                                        "1 hora"
                                    )
                                );
                            }


                            if (
                                duracion ===
                                "media"
                            ) {

                                return (
                                    texto.includes(
                                        "2 hora"
                                    ) ||
                                    texto.includes(
                                        "3 hora"
                                    ) ||
                                    texto.includes(
                                        "4 hora"
                                    )
                                );
                            }


                            if (
                                duracion ===
                                "larga"
                            ) {

                                return (
                                    texto.includes(
                                        "5 hora"
                                    ) ||
                                    texto.includes(
                                        "6 hora"
                                    ) ||
                                    texto.includes(
                                        "día"
                                    ) ||
                                    texto.includes(
                                        "días"
                                    )
                                );
                            }


                            return true;
                        }
                    );
            }


            return resultado;

        }, [
            rutas,
            zona,
            duracion
        ]);


    const mostrarRutasDemo =
        !loading &&
        !error &&
        rutasFiltradas.length === 0;


    return (
        <Layout>

            <main className="rutas-page">


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="rutas-hero">

                    <div
                        className="rutas-hero-overlay"
                    />

                    <div className="rutas-hero-inner">

                        <div className="rutas-hero-copy">

                            <div className="rutas-eyebrow">

                                Explora Esmeraldas

                                <span />

                            </div>


                            <h1>

                                Rutas que

                                <strong>
                                    te conectan
                                </strong>

                                <strong>
                                    con lo esencial
                                </strong>

                            </h1>


                            <p>
                                Descubre paisajes,
                                culturas y sabores
                                en rutas únicas por
                                Esmeraldas.
                                Naturaleza,
                                aventura y tradición
                                en un solo lugar.
                            </p>


                            <div className="rutas-beneficios">

                                <div className="ruta-beneficio">

                                    <span>
                                        <Leaf size={22} />
                                    </span>

                                    <div>

                                        <strong>
                                            Naturaleza
                                        </strong>

                                        <small>
                                            sin límites
                                        </small>

                                    </div>

                                </div>


                                <div className="ruta-beneficio">

                                    <span>
                                        <Sparkles size={21} />
                                    </span>

                                    <div>

                                        <strong>
                                            Experiencias
                                        </strong>

                                        <small>
                                            auténticas
                                        </small>

                                    </div>

                                </div>


                                <div className="ruta-beneficio">

                                    <span>
                                        <Users size={22} />
                                    </span>

                                    <div>

                                        <strong>
                                            Ideal
                                        </strong>

                                        <small>
                                            para todos
                                        </small>

                                    </div>

                                </div>


                                <div className="ruta-beneficio">

                                    <span>
                                        <Heart size={22} />
                                    </span>

                                    <div>

                                        <strong>
                                            Conecta
                                        </strong>

                                        <small>
                                            con nuestra cultura
                                        </small>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    CONTENIDO
                ================================================= */}

                <section className="rutas-content">

                    <div className="rutas-container">


                        {/* =========================================
                            BUSCADOR
                        ========================================= */}

                        <form
                            className="rutas-search-panel"
                            onSubmit={buscar}
                        >

                            <div className="rutas-search-field">

                                <Search size={20} />

                                <input
                                    type="search"
                                    placeholder="Buscar ruta por nombre, lugar o actividad..."
                                    value={q}
                                    onChange={
                                        event =>
                                            setQ(
                                                event.target.value
                                            )
                                    }
                                />

                            </div>


                            <div className="rutas-select-field">

                                <MapPin size={19} />

                                <select
                                    value={zona}
                                    onChange={
                                        event =>
                                            setZona(
                                                event.target.value
                                            )
                                    }
                                >

                                    <option value="todas">
                                        Todas las zonas
                                    </option>

                                    <option value="esmeraldas">
                                        Esmeraldas
                                    </option>

                                    <option value="las palmas">
                                        Las Palmas
                                    </option>

                                    <option value="rio verde">
                                        Río Verde
                                    </option>

                                    <option value="centro">
                                        Centro
                                    </option>

                                </select>

                                <ChevronDown size={17} />

                            </div>


                            <div className="rutas-select-field">

                                <CalendarDays size={19} />

                                <select
                                    value={duracion}
                                    onChange={
                                        event =>
                                            setDuracion(
                                                event.target.value
                                            )
                                    }
                                >

                                    <option value="todas">
                                        Cualquier duración
                                    </option>

                                    <option value="corta">
                                        Ruta corta
                                    </option>

                                    <option value="media">
                                        Ruta media
                                    </option>

                                    <option value="larga">
                                        Ruta larga
                                    </option>

                                </select>

                                <ChevronDown size={17} />

                            </div>


                            <button
                                type="submit"
                                className="rutas-search-button"
                            >

                                <Search size={19} />

                                Buscar

                            </button>

                        </form>


                        {/* =========================================
                            TITULO
                        ========================================= */}

                        <div className="rutas-results-header">

                            <div>

                                <span>
                                    Rutas destacadas
                                </span>

                                <h2>
                                    Vive experiencias inolvidables
                                </h2>

                                <p>
                                    Conoce nuestras rutas
                                    y empieza tu próxima
                                    aventura por Esmeraldas.
                                </p>

                            </div>


                            <div className="rutas-total">

                                <strong>

                                    {
                                        mostrarRutasDemo
                                            ? rutasDemo.length
                                            : rutasFiltradas.length
                                    }

                                </strong>

                                <span>
                                    rutas disponibles
                                </span>

                            </div>

                        </div>


                        {/* =========================================
                            CARGANDO
                        ========================================= */}

                        {loading && (

                            <div className="rutas-status">

                                <div className="rutas-loader" />

                                <span>
                                    Cargando rutas...
                                </span>

                            </div>

                        )}


                        {/* =========================================
                            ERROR
                        ========================================= */}

                        {!loading &&
                            error && (

                                <div className="rutas-status rutas-error">

                                    {error}

                                </div>

                            )}


                        {/* =========================================
                            RUTAS DEMOSTRATIVAS
                        ========================================= */}

                        {mostrarRutasDemo && (

                            <div
                                className="rutas-grid"
                                id="rutas-listado"
                            >

                                {rutasDemo.map(
                                    ruta => (

                                        <article
                                            key={ruta.id}
                                            className="ruta-card"
                                        >

                                            <div
                                                className="ruta-card-image"
                                                style={{
                                                    backgroundImage:
                                                        `url("${ruta.imagen}")`,
                                                    backgroundPosition:
                                                        ruta.posicion
                                                }}
                                            >

                                                <div
                                                    className="ruta-card-image-overlay"
                                                />


                                                <span className="ruta-card-badge">

                                                    {
                                                        ruta.etiqueta
                                                    }

                                                </span>


                                                <button
                                                    type="button"
                                                    className="ruta-favorite"
                                                    onClick={
                                                        () =>
                                                            abrirModalLogin(
                                                                ruta
                                                            )
                                                    }
                                                    aria-label="Explorar ruta"
                                                >

                                                    <Heart size={20} />

                                                </button>


                                                <div className="ruta-card-icon">
                                                    🧭
                                                </div>

                                            </div>


                                            <div className="ruta-card-content">

                                                <span className="ruta-tipo">

                                                    {ruta.tipo}

                                                </span>


                                                <h3>
                                                    {ruta.titulo}
                                                </h3>


                                                <p>
                                                    {ruta.descripcion}
                                                </p>


                                                <div className="ruta-origen-destino">

                                                    <div>

                                                        <span>
                                                            Origen
                                                        </span>

                                                        <strong>
                                                            {ruta.origen}
                                                        </strong>

                                                    </div>


                                                    <ArrowRight size={19} />


                                                    <div>

                                                        <span>
                                                            Destino
                                                        </span>

                                                        <strong>
                                                            {ruta.destino}
                                                        </strong>

                                                    </div>

                                                </div>


                                                <div className="ruta-meta">

                                                    <span>

                                                        <Clock3 size={16} />

                                                        {ruta.duracion}

                                                    </span>


                                                    <span>

                                                        <Navigation size={16} />

                                                        {ruta.distancia}

                                                    </span>


                                                    <span>

                                                        <Mountain size={16} />

                                                        {ruta.dificultad}

                                                    </span>

                                                </div>


                                                <div className="ruta-card-footer">

                                                    <div className="ruta-footer-text">

                                                        <span>
                                                            Descubre
                                                        </span>

                                                        <strong>
                                                            Esmeraldas
                                                        </strong>

                                                    </div>


                                                    <button
                                                        type="button"
                                                        className="ruta-detail-button"
                                                        onClick={
                                                            () =>
                                                                abrirModalLogin(
                                                                    ruta
                                                                )
                                                        }
                                                    >

                                                        Explorar ruta

                                                        <ArrowRight size={18} />

                                                    </button>

                                                </div>

                                            </div>

                                        </article>

                                    )
                                )}

                            </div>

                        )}


                        {/* =========================================
                            RUTAS DEL BACKEND
                        ========================================= */}

                        {!loading &&
                            !error &&
                            rutasFiltradas.length > 0 && (

                                <div
                                    className="rutas-grid"
                                    id="rutas-listado"
                                >

                                    {rutasFiltradas.map(
                                        (
                                            ruta,
                                            index
                                        ) => {

                                            const visual =
                                                estilosRuta[
                                                    index %
                                                    estilosRuta.length
                                                ];


                                            return (

                                                <article
                                                    key={ruta.id}
                                                    className="ruta-card"
                                                >

                                                    <div
                                                        className={
                                                            `ruta-card-image ${visual.clase}`
                                                        }
                                                    >

                                                        <div
                                                            className="ruta-card-image-overlay"
                                                        />


                                                        <span className="ruta-card-badge">

                                                            {
                                                                visual.etiqueta
                                                            }

                                                        </span>


                                                        <button
                                                            type="button"
                                                            className="ruta-favorite"
                                                            onClick={
                                                                () =>
                                                                    abrirModalLogin(
                                                                        ruta
                                                                    )
                                                            }
                                                        >

                                                            <Heart size={20} />

                                                        </button>


                                                        <div className="ruta-card-icon">

                                                            {
                                                                ruta.icono ||
                                                                "🧭"
                                                            }

                                                        </div>

                                                    </div>


                                                    <div className="ruta-card-content">

                                                        <span className="ruta-tipo">

                                                            {
                                                                visual.tipo
                                                            }

                                                        </span>


                                                        <h3>

                                                            {
                                                                ruta.titulo ||
                                                                "Ruta por Esmeraldas"
                                                            }

                                                        </h3>


                                                        <p>

                                                            {
                                                                ruta.descripcion ||
                                                                "Descubre nuevos destinos y paisajes de Esmeraldas."
                                                            }

                                                        </p>


                                                        <div className="ruta-origen-destino">

                                                            <div>

                                                                <span>
                                                                    Origen
                                                                </span>

                                                                <strong>

                                                                    {
                                                                        ruta.origen ||
                                                                        "Esmeraldas"
                                                                    }

                                                                </strong>

                                                            </div>


                                                            <ArrowRight size={19} />


                                                            <div>

                                                                <span>
                                                                    Destino
                                                                </span>

                                                                <strong>

                                                                    {
                                                                        ruta.destino ||
                                                                        "Esmeraldas"
                                                                    }

                                                                </strong>

                                                            </div>

                                                        </div>


                                                        <div className="ruta-meta">

                                                            <span>

                                                                <Clock3 size={16} />

                                                                {
                                                                    ruta.duracion ||
                                                                    "Consultar"
                                                                }

                                                            </span>


                                                            {
                                                                ruta.distanciaKm && (

                                                                    <span>

                                                                        <Navigation size={16} />

                                                                        {
                                                                            ruta.distanciaKm
                                                                        }

                                                                        {" km"}

                                                                    </span>

                                                                )
                                                            }


                                                            <span>

                                                                <Mountain size={16} />

                                                                {
                                                                    visual.dificultad
                                                                }

                                                            </span>

                                                        </div>


                                                        <div className="ruta-card-footer">

                                                            <div className="ruta-footer-text">

                                                                <span>
                                                                    Explora
                                                                </span>

                                                                <strong>
                                                                    Esmeraldas
                                                                </strong>

                                                            </div>


                                                            <button
                                                                type="button"
                                                                className="ruta-detail-button"
                                                                onClick={
                                                                    () =>
                                                                        abrirModalLogin(
                                                                            ruta
                                                                        )
                                                                }
                                                            >

                                                                Explorar ruta

                                                                <ArrowRight size={18} />

                                                            </button>

                                                        </div>

                                                    </div>

                                                </article>

                                            );
                                        }
                                    )}

                                </div>

                            )}


                        {/* =========================================
                            BANNER FINAL
                        ========================================= */}

                        <section className="rutas-bottom">

                            <div>

                                <span>
                                    Esmeraldas te espera
                                </span>

                                <h2>
                                    ¿Listo para tu próxima aventura?
                                </h2>

                                <p>
                                    Explora nuestras rutas
                                    y vive la magia del Pacífico.
                                </p>

                            </div>


                            <button
                                type="button"
                                className="rutas-bottom-button"
                                onClick={
                                    () =>
                                        abrirModalLogin({
                                            titulo:
                                                "Todas las rutas de Esmeraldas"
                                        })
                                }
                            >

                                Explorar rutas

                                <ArrowRight size={19} />

                            </button>

                        </section>

                    </div>

                </section>


                {/* =================================================
                    MODAL
                ================================================= */}

                {modalLogin &&
                    createPortal(

                        <div
                            className="login-rutas-overlay"
                            onClick={cerrarModalLogin}
                        >

                            <div
                                className="login-rutas-modal"
                                onClick={
                                    event =>
                                        event.stopPropagation()
                                }
                            >

                                <button
                                    type="button"
                                    className="login-rutas-close"
                                    onClick={cerrarModalLogin}
                                >
                                    <X size={22} />
                                </button>


                                <div className="login-rutas-logo">

                                    <img
                                        src="/images/logo/esmeralda.png"
                                        alt="Las Huecas Esmeraldas"
                                    />

                                </div>


                                <span className="login-rutas-label">

                                    Explora Esmeraldas

                                </span>


                                <h2>

                                    Inicia sesión para
                                    <br />
                                    explorar las rutas

                                </h2>


                                <p>

                                    {rutaSeleccionada?.titulo
                                        ? (
                                            <>
                                                Para descubrir{" "}
                                                <strong>
                                                    {
                                                        rutaSeleccionada.titulo
                                                    }
                                                </strong>
                                                , inicia sesión
                                                y accede a toda
                                                la información
                                                de esta experiencia.
                                            </>
                                        )
                                        : (
                                            <>
                                                Inicia sesión
                                                para descubrir
                                                nuestras rutas
                                                por Esmeraldas.
                                            </>
                                        )}

                                </p>


                                <div className="login-rutas-actions">

                                    <button
                                        type="button"
                                        className="login-rutas-cancel"
                                        onClick={cerrarModalLogin}
                                    >

                                        Ahora no

                                    </button>


                                    <Link
                                        to="/login"
                                        className="login-rutas-login"
                                        onClick={() => {
                                            document.body.style.overflow =
                                                "";
                                        }}
                                    >

                                        Iniciar sesión

                                        <ArrowRight size={18} />

                                    </Link>

                                </div>


                                <small>

                                    Playas • Cultura • Naturaleza • Gastronomía

                                </small>

                            </div>

                        </div>,

                        document.body
                    )
                }

            </main>

        </Layout>
    );
}


export default Rutas;