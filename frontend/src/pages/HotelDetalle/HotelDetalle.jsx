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
    MapPin,
    Phone,
    Star
} from "lucide-react";

import Layout
    from "../../components/Layout/Layout.jsx";

import {
    obtenerHotel
} from "../../services/hotelService.js";

import {
    imagenHotelPorIndice,
    resolverImagen
} from "../../assets/images/imageMap.js";

import "./HotelDetalle.css";

function HotelDetalle() {

    const { id } =
        useParams();

    const [hotel, setHotel] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        cargarHotel();
    }, [id]);

    async function cargarHotel() {

        try {

            setLoading(true);

            const data =
                await obtenerHotel(id);

            setHotel(data);

        } catch (err) {

            setError(
                err.message ||
                "No se pudo cargar el hotel."
            );

        } finally {

            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Layout>
                <div className="hotel-detail-status">
                    Cargando hotel...
                </div>
            </Layout>
        );
    }

    if (error || !hotel) {
        return (
            <Layout>
                <div className="hotel-detail-status">
                    {
                        error ||
                        "Hotel no encontrado."
                    }
                </div>
            </Layout>
        );
    }

    const imagen =
        resolverImagen(
            hotel.imagen,
            imagenHotelPorIndice(0)
        );

    return (
        <Layout>

            <section className="hotel-detail-page">

                <div className="container">

                    <Link
                        to="/hoteles"
                        className="hotel-detail-back"
                    >
                        <ArrowLeft size={17} />
                        Volver a hoteles
                    </Link>

                    <div className="hotel-detail-grid">

                        <div className="hotel-detail-image">

                            <img
                                src={imagen}
                                alt={hotel.nombre}
                            />

                        </div>

                        <div className="hotel-detail-info">

                            <span>
                                Hospedaje en Esmeraldas
                            </span>

                            <h1>
                                {hotel.nombre}
                            </h1>

                            <div className="hotel-detail-rating">

                                <Star
                                    size={18}
                                    fill="currentColor"
                                />

                                {
                                    Number(
                                        hotel.calificacion ||
                                        0
                                    ).toFixed(1)
                                }

                            </div>

                            <p>
                                {
                                    hotel.descripcion ||
                                    "Disfruta tu estadía en Esmeraldas."
                                }
                            </p>

                            <div className="hotel-detail-data">

                                <div>
                                    <MapPin size={19} />

                                    {
                                        hotel.direccion ||
                                        "Esmeraldas"
                                    }
                                </div>

                                <div>
                                    <Phone size={19} />

                                    {
                                        hotel.telefono ||
                                        "No disponible"
                                    }
                                </div>

                            </div>

                            {hotel.precioDesde && (
                                <div className="hotel-detail-price">

                                    <small>
                                        Precio referencial
                                    </small>

                                    <strong>
                                        Desde $
                                        {hotel.precioDesde}
                                    </strong>

                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </section>

        </Layout>
    );
}

export default HotelDetalle;