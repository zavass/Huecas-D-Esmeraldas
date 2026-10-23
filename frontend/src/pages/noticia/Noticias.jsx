import { useMemo, useState } from "react";
import {
    ArrowUpRight,
    CalendarDays,
    Camera,
    ChevronDown,
    Flame,
    Grid2X2,
    Megaphone,
    Newspaper,
    Search,
    Sparkles,
    TentTree,
    TrendingUp,
    UsersRound,
    UtensilsCrossed
} from "lucide-react";
import Layout from "../../components/Layout/Layout.jsx";
import "./Noticias.css";

const categorias = [
    { nombre: "Todas", icono: Grid2X2 },
    { nombre: "Turismo", icono: Camera },
    { nombre: "Gastronomía", icono: UtensilsCrossed },
    { nombre: "Cultura", icono: Sparkles },
    { nombre: "Actualidad", icono: Newspaper },
    { nombre: "Eventos", icono: CalendarDays },
    { nombre: "Comunidad", icono: UsersRound }
];

const noticiasDemo = [
    {
        id: 1,
        titulo: "Esmeraldas continúa mostrando su potencial turístico",
        resumen: "Playas, gastronomía, cultura y naturaleza forman parte de los principales atractivos que hacen de Esmeraldas un destino especial del Pacífico ecuatoriano.",
        categoria: "Turismo",
        fecha: "2026-10-02",
        fuente: "Las Huecas Esmeraldas",
        imagen: "/images/logo/noticia.png",
        url: null
    },
    {
        id: 2,
        titulo: "La gastronomía esmeraldeña conquista con sus sabores tradicionales",
        resumen: "Encocados, ceviches, mariscos, bolones y platos preparados con productos locales mantienen viva una de las expresiones culturales más importantes de la provincia.",
        categoria: "Gastronomía",
        fecha: "2026-10-01",
        fuente: "Las Huecas Esmeraldas",
        imagen: "/images/marisco/fernando.jpg",
        url: null
    },
    {
        id: 3,
        titulo: "La cultura afroesmeraldeña sigue presente en cada generación",
        resumen: "La música, la danza, la marimba y las tradiciones locales forman parte de una identidad cultural que continúa transmitiéndose entre generaciones.",
        categoria: "Cultura",
        fecha: "2026-09-30",
        fuente: "Las Huecas Esmeraldas",
        imagen: "/images/logo/noticia.png",
        url: null
    },
    {
        id: 4,
        titulo: "Nuevos espacios impulsan el turismo y la recreación en Esmeraldas",
        resumen: "Los espacios urbanos, malecones, parques y zonas costeras continúan siendo puntos de encuentro para habitantes y visitantes.",
        categoria: "Actualidad",
        fecha: "2026-09-29",
        fuente: "Las Huecas Esmeraldas",
        imagen: "/images/logo/noticia.png",
        url: null
    },
    {
        id: 5,
        titulo: "Esmeraldas se prepara para nuevas actividades culturales",
        resumen: "Arte, gastronomía, música y expresiones tradicionales forman parte de las actividades que fortalecen la identidad de la provincia.",
        categoria: "Eventos",
        fecha: "2026-09-28",
        fuente: "Las Huecas Esmeraldas",
        imagen: "/images/logo/noticia.png",
        url: null
    },
    {
        id: 6,
        titulo: "Emprendimientos locales fortalecen la oferta turística",
        resumen: "Restaurantes, cafeterías, hoteles y negocios familiares aportan nuevas experiencias para quienes recorren la provincia.",
        categoria: "Comunidad",
        fecha: "2026-09-27",
        fuente: "Las Huecas Esmeraldas",
        imagen: "/images/huecas/Zuri.jpg",
        url: null
    }
];

function formatearFecha(fecha) {
    if (!fecha) return "";
    const fechaObj = new Date(`${fecha}T12:00:00`);
    return new Intl.DateTimeFormat("es-EC", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(fechaObj);
}

function Noticias() {
    const [categoriaActiva, setCategoriaActiva] = useState("Todas");
    const [busqueda, setBusqueda] = useState("");
    const [orden, setOrden] = useState("recientes");

    const noticiasFiltradas = useMemo(() => {
        let resultado = [...noticiasDemo];

        if (categoriaActiva !== "Todas") {
            resultado = resultado.filter(
                noticia => noticia.categoria === categoriaActiva
            );
        }

        if (busqueda.trim()) {
            const texto = busqueda.trim().toLowerCase();
            resultado = resultado.filter(noticia =>
                noticia.titulo.toLowerCase().includes(texto) ||
                noticia.resumen.toLowerCase().includes(texto) ||
                noticia.categoria.toLowerCase().includes(texto)
            );
        }

        resultado.sort((a, b) => {
            const fechaA = new Date(a.fecha);
            const fechaB = new Date(b.fecha);
            return orden === "antiguas"
                ? fechaA - fechaB
                : fechaB - fechaA;
        });

        return resultado;
    }, [categoriaActiva, busqueda, orden]);

    const principales = noticiasFiltradas.slice(0, 2);
    const secundarias = noticiasFiltradas.slice(2);
    const destacadas = noticiasDemo.slice(0, 4);

    function abrirNoticia(noticia) {
        if (!noticia.url) {
            alert(
                "Esta noticia es de demostración. En el siguiente paso conectaremos las noticias reales con su fuente original."
            );
            return;
        }

        window.open(
            noticia.url,
            "_blank",
            "noopener,noreferrer"
        );
    }

    return (
        <Layout>
            <main className="noticias-page">
                <section className="noticias-hero">
                    <div className="noticias-hero-overlay" />

                    <div className="noticias-hero-content">
                        <div className="noticias-hero-copy">
                            <span className="noticias-eyebrow">
                                Noticias de Esmeraldas
                            </span>

                            <h1>
                                Lo último de
                                <br />
                                nuestra tierra
                            </h1>

                            <p>
                                Actualidad, cultura, turismo y comunidad.
                                <br />
                                Entérate de lo que pasa en Esmeraldas.
                            </p>

                            <div className="noticias-hero-line" />
                        </div>

                        <div className="noticias-hero-phrase">
                            <span>Esmeraldas</span>
                            siempre tiene
                            <br />
                            una buena noticia
                        </div>
                    </div>
                </section>

                <section className="noticias-content">
                    <div className="noticias-container">
                        <div className="noticias-tools">
                            <div className="noticias-search">
                                <Search size={18} />

                                <input
                                    type="search"
                                    placeholder="Buscar noticias..."
                                    value={busqueda}
                                    onChange={event =>
                                        setBusqueda(event.target.value)
                                    }
                                />
                            </div>

                            <div className="noticias-order">
                                <TrendingUp size={17} />

                                <select
                                    value={orden}
                                    onChange={event =>
                                        setOrden(event.target.value)
                                    }
                                >
                                    <option value="recientes">
                                        Más recientes
                                    </option>

                                    <option value="antiguas">
                                        Más antiguas
                                    </option>
                                </select>

                                <ChevronDown size={16} />
                            </div>
                        </div>

                        <div className="noticias-categories">
                            {categorias.map(categoria => {
                                const Icono = categoria.icono;
                                const activa =
                                    categoriaActiva === categoria.nombre;

                                return (
                                    <button
                                        type="button"
                                        key={categoria.nombre}
                                        className={
                                            activa
                                                ? "noticias-category active"
                                                : "noticias-category"
                                        }
                                        onClick={() =>
                                            setCategoriaActiva(
                                                categoria.nombre
                                            )
                                        }
                                    >
                                        <Icono size={18} />
                                        <span>{categoria.nombre}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="noticias-heading">
                            <div>
                                <span>Actualidad</span>

                                <h2>Noticias de Esmeraldas</h2>

                                <p>
                                    Información sobre nuestra provincia,
                                    su gente y sus experiencias.
                                </p>
                            </div>

                            <div className="noticias-counter">
                                <strong>
                                    {noticiasFiltradas.length}
                                </strong>
                                <span>noticias</span>
                            </div>
                        </div>

                        {noticiasFiltradas.length === 0 && (
                            <div className="noticias-empty">
                                <Newspaper size={45} />
                                <h3>No encontramos noticias</h3>
                                <p>
                                    Intenta con otra búsqueda o
                                    selecciona otra categoría.
                                </p>
                            </div>
                        )}

                        {noticiasFiltradas.length > 0 && (
                            <div className="noticias-main-layout">
                                <div className="noticias-main-column">
                                    {principales.length > 0 && (
                                        <div className="noticias-featured-grid">
                                            {principales.map(noticia => (
                                                <article
                                                    className="noticia-featured-card"
                                                    key={noticia.id}
                                                >
                                                    <div className="noticia-featured-image">
                                                        <img
                                                            src={noticia.imagen}
                                                            alt={noticia.titulo}
                                                        />

                                                        <span
                                                            className={`noticia-category-label categoria-${noticia.categoria.toLowerCase()}`}
                                                        >
                                                            {noticia.categoria}
                                                        </span>

                                                        <span className="noticia-date-badge">
                                                            <CalendarDays
                                                                size={15}
                                                            />
                                                            {formatearFecha(
                                                                noticia.fecha
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="noticia-featured-content">
                                                        <h3>
                                                            {noticia.titulo}
                                                        </h3>

                                                        <p>
                                                            {noticia.resumen}
                                                        </p>

                                                        <div className="noticia-card-footer">
                                                            <div className="noticia-source">
                                                                <span>LH</span>
                                                                <strong>
                                                                    {
                                                                        noticia.fuente
                                                                    }
                                                                </strong>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    abrirNoticia(
                                                                        noticia
                                                                    )
                                                                }
                                                            >
                                                                Leer noticia
                                                                <ArrowUpRight
                                                                    size={17}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    )}

                                    {secundarias.length > 0 && (
                                        <div className="noticias-small-grid">
                                            {secundarias.map(noticia => (
                                                <article
                                                    className="noticia-small-card"
                                                    key={noticia.id}
                                                >
                                                    <div className="noticia-small-image">
                                                        <img
                                                            src={noticia.imagen}
                                                            alt={noticia.titulo}
                                                        />

                                                        <span
                                                            className={`noticia-category-label categoria-${noticia.categoria.toLowerCase()}`}
                                                        >
                                                            {noticia.categoria}
                                                        </span>

                                                        <span className="noticia-small-date">
                                                            <CalendarDays
                                                                size={14}
                                                            />
                                                            {formatearFecha(
                                                                noticia.fecha
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="noticia-small-content">
                                                        <h3>
                                                            {noticia.titulo}
                                                        </h3>

                                                        <p>
                                                            {noticia.resumen}
                                                        </p>

                                                        <div className="noticia-small-footer">
                                                            <span>
                                                                {noticia.fuente}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    abrirNoticia(
                                                                        noticia
                                                                    )
                                                                }
                                                            >
                                                                Leer noticia
                                                                <ArrowUpRight
                                                                    size={16}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <aside className="noticias-sidebar">
                                    <div className="noticias-info-box">
                                        <div className="noticias-info-icon">
                                            <Megaphone size={30} />
                                        </div>

                                        <div>
                                            <h3>¡Mantente informado!</h3>

                                            <p>
                                                Conoce las últimas
                                                noticias, eventos y
                                                novedades de Esmeraldas.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="noticias-popular">
                                        <div className="noticias-popular-title">
                                            <Flame size={23} />
                                            <h3>
                                                Noticias destacadas
                                            </h3>
                                        </div>

                                        <div className="noticias-popular-list">
                                            {destacadas.map(
                                                (noticia, index) => (
                                                    <button
                                                        type="button"
                                                        className="noticia-popular-item"
                                                        key={noticia.id}
                                                        onClick={() =>
                                                            abrirNoticia(
                                                                noticia
                                                            )
                                                        }
                                                    >
                                                        <div className="noticia-popular-number">
                                                            {String(
                                                                index + 1
                                                            ).padStart(
                                                                2,
                                                                "0"
                                                            )}
                                                        </div>

                                                        <div className="noticia-popular-image">
                                                            <img
                                                                src={
                                                                    noticia.imagen
                                                                }
                                                                alt=""
                                                            />
                                                        </div>

                                                        <div className="noticia-popular-info">
                                                            <strong>
                                                                {
                                                                    noticia.titulo
                                                                }
                                                            </strong>

                                                            <span>
                                                                <CalendarDays
                                                                    size={12}
                                                                />
                                                                {formatearFecha(
                                                                    noticia.fecha
                                                                )}
                                                            </span>
                                                        </div>
                                                    </button>
                                                )
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            className="noticias-view-all"
                                            onClick={() => {
                                                setCategoriaActiva(
                                                    "Todas"
                                                );
                                                setBusqueda("");
                                            }}
                                        >
                                            Ver todas las noticias
                                            <ArrowUpRight size={18} />
                                        </button>
                                    </div>

                                    <div className="noticias-discover-box">
                                        <TentTree size={28} />
                                        <span>
                                            Descubre Esmeraldas
                                        </span>
                                        <strong>
                                            Historias que conectan
                                            nuestra tierra.
                                        </strong>
                                    </div>
                                </aside>
                            </div>
                        )}

                        <div className="noticias-demo-note">
                            <Newspaper size={18} />

                            <div>
                                <strong>
                                    Primera versión del módulo de noticias
                                </strong>

                                <p>
                                    Estas noticias son de demostración.
                                    El siguiente paso será conectarlas
                                    con Spring Boot y PostgreSQL para
                                    cargar noticias reales desde fuentes
                                    externas.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export default Noticias;
