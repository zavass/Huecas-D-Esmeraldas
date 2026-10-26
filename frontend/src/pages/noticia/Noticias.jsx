import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight, CalendarDays, Camera, ChevronDown, Flame, Grid2X2,
  Megaphone, Newspaper, Search, Sparkles, TentTree, TrendingUp,
  UsersRound, UtensilsCrossed, RefreshCw,
} from "lucide-react";
import Layout from "../../components/Layout/Layout.jsx";
import { obtenerNoticias, actualizarNoticias } from "../../services/noticiasService.js";
import "./Noticias.css";

const categorias = [
  { nombre: "Todas", icono: Grid2X2 },
  { nombre: "Turismo", icono: Camera },
  { nombre: "Gastronomía", icono: UtensilsCrossed },
  { nombre: "Cultura", icono: Sparkles },
  { nombre: "Actualidad", icono: Newspaper },
  { nombre: "Eventos", icono: CalendarDays },
  { nombre: "Comunidad", icono: UsersRound },
];

const imagenAlternativa = "/images/logo/noticia.png";

function formatearFecha(fecha) {
  if (!fecha) return "";
  const valor = new Date(`${fecha}T12:00:00`);
  if (Number.isNaN(valor.getTime())) return "";
  return new Intl.DateTimeFormat("es-EC", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(valor);
}

function FotoNoticia({ noticia }) {
  return (
    <img
      src={noticia.imagen || imagenAlternativa}
      alt={`Imagen de la publicación: ${noticia.titulo}`}
      loading="lazy"
      onError={(evento) => {
        evento.currentTarget.onerror = null;
        evento.currentTarget.src = imagenAlternativa;
        evento.currentTarget.alt = "Imagen ilustrativa de Esmeraldas";
      }}
    />
  );
}

function inicialesFuente(fuente) {
  const palabras = String(fuente || "FE").trim().split(/\s+/);
  return palabras.slice(0, 2).map((p) => p[0] || "").join("").toUpperCase();
}

function abrirNoticia(noticia) {
  if (!noticia.url || !/^https:\/\//i.test(noticia.url)) return;
  window.open(noticia.url, "_blank", "noopener,noreferrer");
}

export default function Noticias() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("recientes");
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [actualizando, setActualizando] = useState(false);
  const [avisoActualizacion, setAvisoActualizacion] = useState("");
  const [errorActualizacion, setErrorActualizacion] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setCargando(true);
    setError("");
    obtenerNoticias(controller.signal)
      .then((datos) => {
        if (!controller.signal.aborted) setNoticias(datos);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("No fue posible consultar las noticias. Comprueba que el backend esté encendido.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargando(false);
      });
    return () => controller.abort();
  }, []);

  const noticiasFiltradas = useMemo(() => {
    let resultado = [...noticias];
    if (categoriaActiva !== "Todas") {
      resultado = resultado.filter((n) => n.categoria === categoriaActiva);
    }
    const texto = busqueda.trim().toLocaleLowerCase("es");
    if (texto) {
      resultado = resultado.filter((n) =>
        [n.titulo, n.resumen, n.categoria, n.fuente].some((campo) =>
          String(campo || "").toLocaleLowerCase("es").includes(texto)
        )
      );
    }
    resultado.sort((a, b) => orden === "antiguas"
      ? String(a.fecha).localeCompare(String(b.fecha))
      : String(b.fecha).localeCompare(String(a.fecha)));
    return resultado;
  }, [categoriaActiva, busqueda, orden, noticias]);

  const principales = noticiasFiltradas.slice(0, 2);
  const secundarias = noticiasFiltradas.slice(2);
  const destacadas = noticias.slice(0, 4);

  async function actualizarListado() {
    if (actualizando || cargando) return;
    setActualizando(true);
    setErrorActualizacion("");
    setAvisoActualizacion("");

    try {
      // Vuelve a consultar las noticias existentes en el backend.
      // La importación RSS sigue ejecutándose automáticamente en Spring Boot.
      const datos = await actualizarNoticias();
      setNoticias(datos);
      setCategoriaActiva("Todas");
      setBusqueda("");
      setOrden("recientes");
      setError("");
      setAvisoActualizacion(
        "Listado actualizado con las noticias disponibles en el servidor."
      );
    } catch (err) {
      console.error("Error al actualizar noticias:", err);
      setErrorActualizacion(
        "No se pudo actualizar el listado. Comprueba que el backend esté encendido."
      );
    } finally {
      setActualizando(false);
    }
  }

  return (
    <Layout>
      <main className="noticias-page">
        <section className="noticias-hero">
          <div className="noticias-hero-overlay" />
          <div className="noticias-hero-content">
            <div className="noticias-hero-copy">
              <span className="noticias-eyebrow">Noticias de Esmeraldas</span>
              <h1>Lo último de<br />nuestra tierra</h1>
              <p>Actualidad, cultura, turismo y comunidad.<br />Entérate de lo que pasa en Esmeraldas.</p>
              <div className="noticias-hero-line" />
            </div>
            <div className="noticias-hero-phrase">
              <span>Esmeraldas</span>siempre tiene<br />una buena noticia
            </div>
          </div>
        </section>

        <section className="noticias-content">
          <div className="noticias-container">
            <div className="noticias-tools">
              <div className="noticias-search">
                <Search size={18} />
                <input
                  type="search" placeholder="Buscar noticias..." value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              <div className="noticias-order">
                <TrendingUp size={17} />
                <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                  <option value="recientes">Más recientes</option>
                  <option value="antiguas">Más antiguas</option>
                </select>
                <ChevronDown size={16} />
              </div>
            </div>
            <div className="noticias-categories">
              {categorias.map(({ nombre, icono: Icono }) => (
                <button type="button" key={nombre}
                  className={categoriaActiva === nombre ? "noticias-category active" : "noticias-category"}
                  onClick={() => setCategoriaActiva(nombre)}>
                  <Icono size={18} /><span>{nombre}</span>
                </button>
              ))}
            </div>

            <div className="noticias-heading">
              <div>
                <span>Actualidad</span>
                <h2>Noticias de Esmeraldas</h2>
                <p>Información sobre nuestra provincia, su gente y sus experiencias.</p>
              </div>
              <div className="noticias-counter">
                <strong>{noticiasFiltradas.length}</strong><span>noticias</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
              <button type="button" onClick={actualizarListado} disabled={cargando || actualizando}
                style={{ display: "flex", alignItems: "center", gap: 7, background: "transparent", border: "1px solid #cdded7", padding: "9px 14px", borderRadius: 25, color: "#06775a", cursor: "pointer" }}>
                <RefreshCw size={15} /> {actualizando ? "Actualizando listado..." : "Actualizar listado"}
              </button>
            </div>

            {errorActualizacion && (
              <p role="alert" style={{ marginBottom: 16, color: "#b42318" }}>
                {errorActualizacion}
              </p>
            )}
            {avisoActualizacion && (
              <p role="status" style={{ marginBottom: 16, color: "#06775a" }}>
                {avisoActualizacion}
              </p>
            )}

            {cargando && (
              <div className="noticias-empty"><Newspaper size={42} />
                <h3>Cargando noticias reales...</h3></div>
            )}
            {!cargando && error && (
              <div className="noticias-empty"><Newspaper size={42} />
                <h3>No se pudieron cargar las noticias</h3><p>{error}</p></div>
            )}
            {!cargando && !error && noticiasFiltradas.length === 0 && (
              <div className="noticias-empty"><Newspaper size={42} />
                <h3>
                  {noticias.length > 0
                    ? "No hay noticias con estos filtros"
                    : "Aún no hay noticias disponibles"}
                </h3>
                <p>
                  {noticias.length > 0
                    ? "Prueba otra categoría o borra la búsqueda para ver todas las publicaciones."
                    : "No encontramos nuevas publicaciones verificadas. Vuelve a intentarlo más tarde."}
                </p>
              </div>
            )}

            {!cargando && !error && noticiasFiltradas.length > 0 && (
              <div className="noticias-main-layout">
                <div className="noticias-main-column">
                  <div className="noticias-featured-grid">
                    {principales.map((noticia) => (
                      <article className="noticia-featured-card" key={noticia.id}>
                        <div className="noticia-featured-image">
                          <FotoNoticia noticia={noticia} />
                          <span className={`noticia-category-label categoria-${(noticia.categoria || "Actualidad").toLowerCase()}`}>
                            {noticia.categoria || "Actualidad"}
                          </span>
                          <span className="noticia-date-badge"><CalendarDays size={15} />{formatearFecha(noticia.fecha)}</span>
                        </div>
                        <div className="noticia-featured-content">
                          <h3>{noticia.titulo}</h3>
                          <p>{noticia.resumen}</p>
                          <div className="noticia-card-footer">
                            <div className="noticia-source"><span>{inicialesFuente(noticia.fuente)}</span><strong>{noticia.fuente || "Fuente externa"}</strong></div>
                            <button type="button" onClick={() => abrirNoticia(noticia)}>
                              Leer noticia <ArrowUpRight size={17} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  {secundarias.length > 0 && (
                    <div className="noticias-small-grid">
                      {secundarias.map((noticia) => (
                        <article className="noticia-small-card" key={noticia.id}>
                          <div className="noticia-small-image">
                            <FotoNoticia noticia={noticia} />
                            <span className={`noticia-category-label categoria-${(noticia.categoria || "Actualidad").toLowerCase()}`}>
                              {noticia.categoria || "Actualidad"}
                            </span>
                            <span className="noticia-small-date">
                              <CalendarDays size={14} />{formatearFecha(noticia.fecha)}
                            </span>
                          </div>
                          <div className="noticia-small-content">
                            <h3>{noticia.titulo}</h3><p>{noticia.resumen}</p>
                            <div className="noticia-small-footer">
                              <span>{noticia.fuente}</span>
                              <button type="button" onClick={() => abrirNoticia(noticia)}>
                                Leer noticia <ArrowUpRight size={16} />
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
                    <div className="noticias-info-icon"><Megaphone size={30} /></div>
                    <div><h3>¡Mantente informado!</h3>
                      <p>Noticias reales de turismo, cultura, gastronomía y comunidad.</p></div>
                  </div>
                  <div className="noticias-popular">
                    <div className="noticias-popular-title"><Flame size={23} />
                      <h3>Últimas publicaciones</h3></div>
                    <div className="noticias-popular-list">
                      {destacadas.map((noticia, index) => (
                        <button type="button" className="noticia-popular-item" key={noticia.id}
                          onClick={() => abrirNoticia(noticia)}>
                          <div className="noticia-popular-number">{String(index + 1).padStart(2, "0")}</div>
                          <div className="noticia-popular-image"><FotoNoticia noticia={noticia} /></div>
                          <div className="noticia-popular-info"><strong>{noticia.titulo}</strong>
                            <span><CalendarDays size={12} />{formatearFecha(noticia.fecha)}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <button type="button" className="noticias-view-all"
                      onClick={() => { setCategoriaActiva("Todas"); setBusqueda(""); }}>
                      Ver todas las noticias <ArrowUpRight size={18} />
                    </button>
                  </div>
                  <div className="noticias-discover-box">
                    <TentTree size={28} /><span>Descubre Esmeraldas</span>
                    <strong>Historias que conectan nuestra tierra.</strong>
                  </div>
                </aside>
              </div>
            )}
            <p style={{ marginTop: 24, fontSize: 13, color: "#65766f" }}>
              Las noticias provienen de medios externos y conservan su fecha original.
              Algunas imágenes pertenecen a la publicación enlazada; cuando no están
              disponibles se muestra una imagen ilustrativa.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
