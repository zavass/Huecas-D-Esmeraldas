import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import {
    ArrowLeft,
    Clock3,
    ExternalLink,
    MapPin,
    Navigation
} from "lucide-react";

import Layout
    from "../../components/Layout/Layout.jsx";

import {
    obtenerRuta
} from "../../services/rutaService.js";

import {
    imagenRutaPorIndice,
    resolverImagen
} from "../../assets/images/imageMap.js";

import "./RutaDetalle.css";

function RutaDetalle() {

    const { id } =
        useParams();

    const [ruta, setRuta] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        cargarRuta();
    }, [id]);

    async function cargarRuta() {

        try {

            setLoading(true);

            const data =
                await obtenerRuta(id);

            setRuta(data);

        } catch (err) {

            setError(
                err.message ||
                "No se pudo cargar la ruta."
            );

        } finally {

            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Layout>
                <div className="route-detail-status">
                    Cargando ruta...
                </div>
            </Layout>
        );
    }

    if (error || !ruta) {
        return (
            <Layout>
                <div className="route-detail-status">
                    {
                        error ||
                        "Ruta no encontrada."
                    }
                </div>
            </Layout>
        );
    }

    const imagen =
        resolverImagen(
            ruta.imagen,
            imagenRutaPorIndice(0)
        );

    return (
        <Layout>

            <section className="route-detail-page">

                <div className="container">

                    <Link
                        to="/rutas"
                        className="route-detail-back"
                    >
                        <ArrowLeft size={17} />
                        Volver a rutas
                    </Link>

                    <div className="route-detail-cover">

                        <img
                            src={imagen}
                            alt={ruta.titulo}
                        />

                        <div className="route-detail-overlay">

                            <span>
                                Explora Esmeraldas
                            </span>

                            <h1>
                                {ruta.titulo}
                            </h1>

                        </div>

                    </div>

                    <div className="route-detail-content">

                        <div>

                            <h2>
                                Sobre esta ruta
                            </h2>

                            <p>
                                {
                                    ruta.descripcion ||
                                    "Conoce una nueva ruta para descubrir Esmeraldas."
                                }
                            </p>

                        </div>

                        <aside>

                            <div>
                                <Navigation size={19} />

                                <section>
                                    <small>
                                        Origen
                                    </small>

                                    <strong>
                                        {
                                            ruta.origen ||
                                            "Esmeraldas"
                                        }
                                    </strong>
                                </section>
                            </div>

                            <div>
                                <MapPin size={19} />

                                <section>
                                    <small>
                                        Destino
                                    </small>

                                    <strong>
                                        {
                                            ruta.destino ||
                                            "Esmeraldas"
                                        }
                                    </strong>
                                </section>
                            </div>

                            {ruta.duracion && (
                                <div>
                                    <Clock3 size={19} />

                                    <section>
                                        <small>
                                            Duración
                                        </small>

                                        <strong>
                                            {
                                                ruta.duracion
                                            }
                                        </strong>
                                    </section>
                                </div>
                            )}

                            {ruta.distanciaKm && (
                                <div>

                                    <Navigation
                                        size={19}
                                    />

                                    <section>

                                        <small>
                                            Distancia
                                        </small>

                                        <strong>
                                            {
                                                ruta.distanciaKm
                                            } km
                                        </strong>

                                    </section>

                                </div>
                            )}

                            {ruta.googleMapsUrl && (
                                <a
                                    href={
                                        ruta.googleMapsUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="maps-button"
                                >
                                    Abrir en Google Maps

                                    <ExternalLink
                                        size={16}
                                    />
                                </a>
                            )}

                        </aside>

                    </div>

                </div>

            </section>

        </Layout>
    );
}

export default RutaDetalle;