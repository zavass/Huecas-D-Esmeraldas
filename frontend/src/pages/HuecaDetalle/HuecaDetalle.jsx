import {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    Clock3,
    ExternalLink,
    Facebook,
    Instagram,
    MapPin,
    Phone,
    Star
} from "lucide-react";

import {
    Link,
    useParams
} from "react-router-dom";

import Layout from "../../components/Layout/Layout.jsx";
import { obtenerHuecaPorId } from "../../services/huecaService.js";
import "./HuecaDetalle.css";

function HuecaDetalle() {

    const { id } = useParams();

    const [hueca, setHueca] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarHueca();
    }, [id]);

    async function cargarHueca() {
        try {
            setLoading(true);
            setError("");
            const data = await obtenerHuecaPorId(id);
            setHueca(data);
        } catch (err) {
            setError(err.message || "No se pudo cargar la información.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Layout>
                <div className="hueca-detalle-status">
                    Cargando información...
                </div>
            </Layout>
        );
    }

    if (error || !hueca) {
        return (
            <Layout>
                <div className="hueca-detalle-status hueca-detalle-error">
                    {error || "Hueca no encontrada."}
                    <Link to="/huecas">Volver a Huecas</Link>
                </div>
            </Layout>
        );
    }

    const calificacion = Number(hueca.calificacion || 0);
    const tieneCalificacion = calificacion > 0;

    return (
        <Layout>
            <main className="hueca-detalle-page">
                <div className="hueca-detalle-container">

                    <Link to="/huecas" className="hueca-detalle-back">
                        <ArrowLeft size={18} />
                        Volver a Huecas
                    </Link>

                    <section className="hueca-detalle-hero">

                        <div className="hueca-detalle-image">
                            <img
                                src={hueca.imagen || "/images/logo/encabezado.png"}
                                alt={hueca.nombre}
                            />

                            {hueca.destacado && (
                                <span className="hueca-detalle-featured">
                                    Muy recomendada
                                </span>
                            )}
                        </div>

                        <div className="hueca-detalle-info">

                            <span className="hueca-detalle-category">
                                {hueca.categoriaNombre || "Gastronomía"}
                            </span>

                            <h1>{hueca.nombre}</h1>

                            <div className="hueca-detalle-badges">
                                <span className={
                                    tieneCalificacion
                                        ? "hueca-detalle-rating"
                                        : "hueca-detalle-rating hueca-rating-new"
                                }>
                                    {tieneCalificacion ? (
                                        <>
                                            <Star size={17} fill="currentColor" />
                                            {calificacion.toFixed(1)}
                                        </>
                                    ) : (
                                        "Nuevo"
                                    )}
                                </span>

                                {hueca.etiqueta && (
                                    <span className="hueca-detalle-tag">
                                        {hueca.etiqueta}
                                    </span>
                                )}
                            </div>

                            <p className="hueca-detalle-description">
                                {hueca.descripcion || "Descubre este lugar de Esmeraldas."}
                            </p>

                            {(hueca.instagramUrl ||
                                hueca.tiktokUrl ||
                                hueca.facebookUrl) && (
                                <section className="hueca-social-section">
                                    <span className="hueca-social-title">
                                        Redes oficiales
                                    </span>

                                    <div className="hueca-social-buttons">

                                        {hueca.instagramUrl && (
                                            <a
                                                href={hueca.instagramUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hueca-social-button instagram"
                                            >
                                                <Instagram size={20} />
                                                Instagram
                                                <ExternalLink size={15} />
                                            </a>
                                        )}

                                        {hueca.tiktokUrl && (
                                            <a
                                                href={hueca.tiktokUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hueca-social-button tiktok"
                                            >
                                                <span className="tiktok-icon">♪</span>
                                                TikTok
                                                <ExternalLink size={15} />
                                            </a>
                                        )}

                                        {hueca.facebookUrl && (
                                            <a
                                                href={hueca.facebookUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hueca-social-button facebook"
                                            >
                                                <Facebook size={20} />
                                                Facebook
                                                <ExternalLink size={15} />
                                            </a>
                                        )}

                                    </div>
                                </section>
                            )}

                            <div className="hueca-detalle-data">
                                <div>
                                    <span className="detail-data-icon">
                                        <MapPin size={19} />
                                    </span>
                                    <div>
                                        <small>Dirección</small>
                                        <strong>{hueca.direccion || "Esmeraldas"}</strong>
                                    </div>
                                </div>

                                <div>
                                    <span className="detail-data-icon">
                                        <Phone size={19} />
                                    </span>
                                    <div>
                                        <small>Teléfono</small>
                                        {hueca.telefono && hueca.telefono !== "Consultar" ? (
                                            <a href={`tel:${hueca.telefono}`}>
                                                {hueca.telefono}
                                            </a>
                                        ) : (
                                            <strong>Consultar</strong>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <span className="detail-data-icon">
                                        <Clock3 size={19} />
                                    </span>
                                    <div>
                                        <small>Horario</small>
                                        <strong>{hueca.horario || "Consultar horario"}</strong>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    );
}

export default HuecaDetalle;
