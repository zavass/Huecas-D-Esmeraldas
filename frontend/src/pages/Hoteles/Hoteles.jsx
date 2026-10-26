import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Car,
  ChevronDown,
  Coffee,
  Heart,
  Hotel,
  MapPin,
  Search,
  Star,
  UtensilsCrossed,
  Waves,
  Wifi,
} from "lucide-react";

import Layout from "../../components/Layout/Layout.jsx";
import { listarHoteles } from "../../services/hotelService.js";
import { imagenHotelPorIndice, resolverImagen } from "../../assets/images/imageMap.js";
import "./Hoteles.css";

// Elementos visuales utilizados por las tarjetas actuales.
const detallesVisuales = [
  {
    etiqueta: "Más popular",
    servicios: [
      { icono: Wifi, texto: "WiFi" },
      { icono: Waves, texto: "Piscina" },
      { icono: UtensilsCrossed, texto: "Restaurante" },
      { icono: Car, texto: "Parqueadero" },
    ],
  },
  {
    etiqueta: "Excelente ubicación",
    servicios: [
      { icono: Wifi, texto: "WiFi" },
      { icono: Coffee, texto: "Desayuno" },
      { icono: BedDouble, texto: "Confort" },
      { icono: Car, texto: "Parqueadero" },
    ],
  },
  {
    etiqueta: "Vista al mar",
    servicios: [
      { icono: Wifi, texto: "WiFi" },
      { icono: UtensilsCrossed, texto: "Restaurante" },
      { icono: Coffee, texto: "Bar" },
      { icono: Car, texto: "Parqueadero" },
    ],
  },
];

// Devuelve null cuando el hotel no tiene un precio numérico positivo.
// De este modo, ni 0, ni null, ni "", ni "Consultar" se muestran como precio.
function obtenerPrecioValido(precioDesde) {
  if (precioDesde === null || precioDesde === undefined) return null;
  if (typeof precioDesde === "string" && precioDesde.trim() === "") return null;

  const numero = Number(precioDesde);
  return Number.isFinite(numero) && numero > 0 ? numero : null;
}

function Hoteles() {
  const [hoteles, setHoteles] = useState([]);
  const [q, setQ] = useState("");
  const [zona, setZona] = useState("todas");
  const [precio, setPrecio] = useState("todos");
  const [orden, setOrden] = useState("recomendados");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarHoteles();
  }, []);

  async function cargarHoteles() {
    try {
      setLoading(true);
      setError("");
      const data = await listarHoteles(q);
      setHoteles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los hoteles.");
    } finally {
      setLoading(false);
    }
  }

  function buscar(event) {
    event.preventDefault();
    cargarHoteles();
  }

  const hotelesFiltrados = useMemo(() => {
    let resultado = [...hoteles];

    if (zona !== "todas") {
      resultado = resultado.filter((hotel) =>
        String(hotel.direccion || "").toLowerCase().includes(zona.toLowerCase())
      );
    }

    // Los hoteles sin precio se excluyen de los filtros por rango,
    // pero siguen apareciendo cuando se elige "Cualquier precio".
    if (precio === "economico") {
      resultado = resultado.filter((hotel) => {
        const valor = obtenerPrecioValido(hotel.precioDesde);
        return valor !== null && valor <= 40;
      });
    }

    if (precio === "medio") {
      resultado = resultado.filter((hotel) => {
        const valor = obtenerPrecioValido(hotel.precioDesde);
        return valor !== null && valor > 40 && valor <= 60;
      });
    }

    if (precio === "premium") {
      resultado = resultado.filter((hotel) => {
        const valor = obtenerPrecioValido(hotel.precioDesde);
        return valor !== null && valor > 60;
      });
    }

    if (orden === "recomendados") {
      resultado.sort(
        (a, b) => Number(b.calificacion || 0) - Number(a.calificacion || 0)
      );
    }

    if (orden === "precio-menor" || orden === "precio-mayor") {
      resultado.sort((a, b) => {
        const precioA = obtenerPrecioValido(a.precioDesde);
        const precioB = obtenerPrecioValido(b.precioDesde);

        // Sin precio: siempre al final, nunca como $0.
        if (precioA === null && precioB === null) return 0;
        if (precioA === null) return 1;
        if (precioB === null) return -1;

        return orden === "precio-menor"
          ? precioA - precioB
          : precioB - precioA;
      });
    }

    return resultado;
  }, [hoteles, zona, precio, orden]);

  return (
    <Layout>
      <main className="hoteles-page">
        {/* PORTADA */}
        <section className="hotel-hero">
          <div className="hotel-hero-overlay" />
          <div className="hotel-hero-content">
            <div className="hotel-hero-copy">
              <div className="hotel-eyebrow">
                Hospedaje en Esmeraldas
                <span />
              </div>

              <h1>
                Tu lugar ideal
                <strong>en la costa</strong>
              </h1>

              <p>
                Descubre los mejores hoteles en Esmeraldas. Relájate, disfruta
                del mar, la naturaleza y la calidez de nuestra gente. Aquí
                empieza tu próxima aventura.
              </p>

              <div className="hotel-benefits">
                <div className="hotel-benefit">
                  <span><BedDouble size={22} /></span>
                  <div><strong>Comodidad</strong><small>y descanso</small></div>
                </div>

                <div className="hotel-benefit">
                  <span><MapPin size={22} /></span>
                  <div><strong>Ubicaciones</strong><small>estratégicas</small></div>
                </div>

                <div className="hotel-benefit">
                  <span><Waves size={22} /></span>
                  <div><strong>Cerca del mar</strong><small>y naturaleza</small></div>
                </div>

                <div className="hotel-benefit">
                  <span><Heart size={21} /></span>
                  <div><strong>Una experiencia</strong><small>inolvidable</small></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LISTADO */}
        <section className="hoteles-content">
          <div className="hoteles-container">
            <form className="hotel-search-panel" onSubmit={buscar}>
              <div className="hotel-search-field hotel-search-main">
                <Search size={20} />
                <input
                  type="search"
                  placeholder="Buscar hotel por nombre, ubicación o característica..."
                  value={q}
                  onChange={(event) => setQ(event.target.value)}
                />
              </div>

              <div className="hotel-select-field">
                <MapPin size={19} />
                <select value={zona} onChange={(event) => setZona(event.target.value)}>
                  <option value="todas">Todas las zonas</option>
                  <option value="las palmas">Las Palmas</option>
                  <option value="centro">Centro</option>
                  <option value="esmeraldas">Esmeraldas</option>
                </select>
                <ChevronDown size={17} />
              </div>

              <div className="hotel-select-field">
                <CalendarDays size={19} />
                <select
                  value={precio}
                  onChange={(event) => setPrecio(event.target.value)}
                >
                  <option value="todos">Cualquier precio</option>
                  <option value="economico">Hasta $40</option>
                  <option value="medio">$41 - $60</option>
                  <option value="premium">Más de $60</option>
                </select>
                <ChevronDown size={17} />
              </div>

              <button className="hotel-search-button" type="submit">
                <Search size={19} />
                <span>Buscar</span>
              </button>
            </form>

            <div className="hotel-results-header">
              <div>
                <span className="hotel-results-count">
                  {hotelesFiltrados.length}{" "}
                  {hotelesFiltrados.length === 1
                    ? "hotel encontrado"
                    : "hoteles encontrados"}
                </span>
                <h2>Hoteles en Esmeraldas</h2>
                <p>Comodidad, buena ubicación y la mejor vista del Pacífico.</p>
              </div>

              <div className="hotel-sort">
                <span>Ordenar por:</span>
                <div className="hotel-sort-select">
                  <select
                    value={orden}
                    onChange={(event) => setOrden(event.target.value)}
                  >
                    <option value="recomendados">Más recomendados</option>
                    <option value="precio-menor">Menor precio</option>
                    <option value="precio-mayor">Mayor precio</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            {loading && (
              <div className="hotel-status">
                <div className="hotel-loader" />
                <span>Cargando hoteles...</span>
              </div>
            )}

            {!loading && error && (
              <div className="hotel-status hotel-error">{error}</div>
            )}

            {!loading && !error && hotelesFiltrados.length === 0 && (
              <div className="hotel-status">
                <Hotel size={46} />
                <strong>No encontramos hoteles.</strong>
                <span>Prueba utilizando otros filtros.</span>
              </div>
            )}

            {!loading && !error && hotelesFiltrados.length > 0 && (
              <div className="hoteles-grid">
                {hotelesFiltrados.map((hotel, index) => {
                  const imagen = resolverImagen(
                    hotel.imagen,
                    imagenHotelPorIndice(index)
                  );

                  const visual = detallesVisuales[index % detallesVisuales.length];
                  const calificacion = Number(hotel.calificacion || 0);
                  const precioValido = obtenerPrecioValido(hotel.precioDesde);

                  return (
                    <article className="hotel-card" key={hotel.id}>
                      <div className="hotel-card-image">
                        <img src={imagen} alt={hotel.nombre} />
                        <span className="hotel-card-badge">{visual.etiqueta}</span>
                        <button
                          type="button"
                          className="hotel-favorite"
                          aria-label="Agregar a favoritos"
                        >
                          <Heart size={20} />
                        </button>

                        {calificacion > 0 && (
                          <span className="hotel-rating">
                            <Star size={16} fill="currentColor" />
                            {calificacion.toFixed(1)}
                          </span>
                        )}
                      </div>

                      <div className="hotel-card-content">
                        <h3>{hotel.nombre}</h3>

                        <div className="hotel-location">
                          <MapPin size={16} />
                          <span>{hotel.direccion || "Esmeraldas"}</span>
                        </div>

                        <p className="hotel-description">
                          {hotel.descripcion ||
                            "Hospedaje en Esmeraldas con una excelente ubicación."}
                        </p>

                        <div className="hotel-services">
                          {visual.servicios.map((servicio) => {
                            const Icono = servicio.icono;
                            return (
                              <span key={servicio.texto}>
                                <Icono size={15} />
                                {servicio.texto}
                              </span>
                            );
                          })}
                        </div>

                        {/* Si no hay precio válido, este lado queda vacío. */}
                        <div className="hotel-card-footer">
                          <div className="hotel-price">
                            {precioValido !== null && (
                              <>
                                <span>Desde</span>
                                <strong>${precioValido}</strong>
                                <small>/ noche</small>
                              </>
                            )}
                          </div>

                          <Link
                            to={`/hoteles/${hotel.id}`}
                            className="hotel-detail-button"
                          >
                            Ver detalles
                            <ArrowRight size={18} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <div className="hotel-bottom-banner">
              <div className="hotel-bottom-message">
                <span className="hotel-bottom-icon">🌿</span>
                <strong>
                  “Hospédate en Esmeraldas y vive la magia del Pacífico”
                </strong>
                <span className="hotel-bottom-line" />
              </div>
              <Link to="/" className="hotel-bottom-button">
                Descubre Esmeraldas
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Hoteles;
