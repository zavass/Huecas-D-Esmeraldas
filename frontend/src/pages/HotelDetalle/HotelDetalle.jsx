import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  MapPin,
  Navigation,
  Phone,
  Star,
} from "lucide-react";

import Layout from "../../components/Layout/Layout.jsx";
import { obtenerHotel } from "../../services/hotelService.js";
import {
  imagenHotelPorIndice,
  resolverImagen,
} from "../../assets/images/imageMap.js";
import "./HotelDetalle.css";

function enlaceTelefono(telefono) {
  if (!telefono || typeof telefono !== "string") return null;
  const limpio = telefono.replace(/[^\d+]/g, "");
  return limpio.replace(/\D/g, "").length >= 7 ? `tel:${limpio}` : null;
}

function enlaceMapa(hotel) {
  const lat = Number(hotel.latitud);
  const lon = Number(hotel.longitud);

  if (
    hotel.latitud != null &&
    hotel.longitud != null &&
    Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lon) <= 180 &&
    (lat !== 0 || lon !== 0)
  ) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  }

  if (hotel.direccion?.trim()) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${hotel.nombre || "Hotel"}, ${hotel.direccion}, Ecuador`
    )}`;
  }

  return null;
}

export default function HotelDetalle() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;
    setLoading(true);
    setError("");
    setHotel(null);

    obtenerHotel(id)
      .then((datos) => {
        if (activo) setHotel(datos);
      })
      .catch((err) => {
        if (activo) setError(err.message || "No se pudo cargar el hotel.");
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [id]);

  if (loading || error || !hotel) {
    return (
      <Layout>
        <main className="hotel-detail-page">
          <div className="hotel-detail-container">
            <div className="hotel-detail-status" role={error ? "alert" : "status"}>
              <BedDouble size={35} />
              <h2>{loading ? "Cargando hotel..." : "No se pudo mostrar el hotel"}</h2>
              {!loading && <p>{error || "Hotel no encontrado."}</p>}
              <Link to="/hoteles">Volver a hoteles</Link>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  const fotoAlternativa = imagenHotelPorIndice(0);
  const imagen = resolverImagen(hotel.imagen, fotoAlternativa);
  const calificacion = Number(hotel.calificacion);
  const tieneCalificacion = Number.isFinite(calificacion) && calificacion > 0;
  const precio = Number(hotel.precioDesde);
  const tienePrecio = hotel.precioDesde != null && Number.isFinite(precio) && precio > 0;
  const telefono = enlaceTelefono(hotel.telefono);
  const mapa = enlaceMapa(hotel);

  return (
    <Layout>
      <main className="hotel-detail-page">
        <div className="hotel-detail-container">
          <Link to="/hoteles" className="hotel-detail-back">
            <ArrowLeft size={18} /> Volver a Hoteles
          </Link>

          <section className="hotel-detail-grid" aria-labelledby="hotel-titulo">
            <div className="hotel-detail-image">
              <img
                src={imagen}
                alt={`Imagen de ${hotel.nombre || "hotel en Esmeraldas"}`}
                onError={(evento) => {
                  if (evento.currentTarget.src !== new URL(fotoAlternativa, window.location.href).href) {
                    evento.currentTarget.src = fotoAlternativa;
                  }
                }}
              />
              <span className="hotel-detail-photo-label">
                <BedDouble size={16} /> Hospedaje en Esmeraldas
              </span>
            </div>

            <div className="hotel-detail-info">
              <span className="hotel-detail-category">Descubre dónde descansar</span>
              <h1 id="hotel-titulo">{hotel.nombre}</h1>

              <div className="hotel-detail-badges">
                {tieneCalificacion ? (
                  <span className="hotel-detail-rating">
                    <Star size={17} fill="currentColor" /> {calificacion.toFixed(1)}
                  </span>
                ) : (
                  <span className="hotel-detail-tag">Hospedaje</span>
                )}
                <span className="hotel-detail-tag">Esmeraldas, Ecuador</span>
              </div>

              <p className="hotel-detail-description">
                {hotel.descripcion || "Conoce este hospedaje en Esmeraldas y consulta sus datos de contacto."}
              </p>

              <div className="hotel-detail-section-label">Información del alojamiento</div>
              <div className="hotel-detail-data">
                <div className="hotel-detail-data-item">
                  <span className="hotel-detail-data-icon"><MapPin size={19} /></span>
                  <div>
                    <small>Dirección</small>
                    <strong>{hotel.direccion || "Dirección no disponible"}</strong>
                  </div>
                </div>

                <div className="hotel-detail-data-item">
                  <span className="hotel-detail-data-icon"><Phone size={19} /></span>
                  <div>
                    <small>Teléfono</small>
                    {telefono ? (
                      <a href={telefono}>{hotel.telefono}</a>
                    ) : (
                      <strong>{hotel.telefono || "Consultar con el alojamiento"}</strong>
                    )}
                  </div>
                </div>
              </div>

              {tienePrecio && (
                <div className="hotel-detail-price">
                  <div>
                    <small>Precio referencial desde</small>
                    <strong>
                      ${precio.toLocaleString("es-EC", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </strong>
                  </div>
                  <span>Consulta tarifas y disponibilidad directamente con el hotel.</span>
                </div>
              )}

              {(telefono || mapa) && (
                <div className="hotel-detail-actions">
                  {telefono && (
                    <a className="hotel-detail-action primary" href={telefono}>
                      <Phone size={18} /> Llamar al hotel
                    </a>
                  )}
                  {mapa && (
                    <a
                      className="hotel-detail-action secondary"
                      href={mapa}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation size={18} /> Cómo llegar <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
