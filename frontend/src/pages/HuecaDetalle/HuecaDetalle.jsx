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
    MapPin,
    Phone,
    Star,
    UtensilsCrossed
} from "lucide-react";

import Layout from "../../components/Layout/Layout.jsx";

import {
    obtenerHueca
} from "../../services/huecaService.js";

import {
    obtenerImagenHueca
} from "../../assets/images/imageMap.js";

import "./HuecaDetalle.css";


function HuecaDetalle() {

    const { id } =
        useParams();

    const [hueca, setHueca] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ===================================================
    // CARGAR HUECA
    // ===================================================

    useEffect(() => {

        cargarHueca();

    }, [id]);


    async function cargarHueca() {

        try {

            setLoading(true);
            setError("");

            const data =
                await obtenerHueca(id);

            setHueca(data);

        } catch (err) {

            console.error(
                "Error cargando hueca:",
                err
            );

            setError(
                err.message ||
                "No se pudo cargar la hueca."
            );

        } finally {

            setLoading(false);
        }
    }


    // ===================================================
    // LOADING
    // ===================================================

    if (loading) {

        return (

            <Layout>

                <div className="detalle-status">

                    <UtensilsCrossed
                        size={38}
                    />

                    <span>
                        Cargando hueca...
                    </span>

                </div>

            </Layout>

        );
    }


    // ===================================================
    // ERROR
    // ===================================================

    if (
        error ||
        !hueca
    ) {

        return (

            <Layout>

                <div className="detalle-status">

                    <h3>
                        No se pudo cargar
                        la información
                    </h3>

                    <p>
                        {
                            error ||
                            "Hueca no encontrada."
                        }
                    </p>

                    <Link
                        to="/huecas"
                        className="btn btn-primary"
                    >
                        Volver a huecas
                    </Link>

                </div>

            </Layout>

        );
    }


    // ===================================================
    // IMAGEN
    // ===================================================

    const imagen =
        obtenerImagenHueca(
            hueca,
            Number(id) - 1
        );


    // ===================================================
    // RENDER
    // ===================================================

    return (
        <Layout>

            <section className="detalle-page">

                <div className="container">

                    {/* VOLVER */}

                    <Link
                        to="/huecas"
                        className="detalle-back"
                    >

                        <ArrowLeft
                            size={17}
                        />

                        Volver a huecas

                    </Link>


                    <div className="detalle-grid">


                        {/* ========================= */}
                        {/* IMAGEN */}
                        {/* ========================= */}

                        <div className="detalle-image">

                            <img
                                src={imagen}
                                alt={
                                    hueca.nombre
                                }
                            />

                        </div>


                        {/* ========================= */}
                        {/* INFORMACIÓN */}
                        {/* ========================= */}

                        <div className="detalle-info">


                            <span className="detalle-category">

                                {
                                    hueca.categoriaNombre ||
                                    hueca.categoria?.nombre ||
                                    "Gastronomía"
                                }

                            </span>


                            <h1>
                                {hueca.nombre}
                            </h1>


                            <div className="detalle-rating">

                                <Star
                                    size={18}
                                    fill="currentColor"
                                />

                                {
                                    Number(
                                        hueca.calificacion ||
                                        0
                                    ).toFixed(1)
                                }

                            </div>


                            {
                                hueca.etiqueta &&
                                (

                                    <span className="detalle-tag">

                                        {
                                            hueca.etiqueta
                                        }

                                    </span>

                                )
                            }


                            <p className="detalle-description">

                                {
                                    hueca.descripcion ||
                                    "Descubre los sabores tradicionales de Esmeraldas."
                                }

                            </p>


                            {/* ========================= */}
                            {/* DATOS */}
                            {/* ========================= */}

                            <div className="detalle-data">


                                <div>

                                    <MapPin
                                        size={19}
                                    />

                                    <section>

                                        <small>
                                            Dirección
                                        </small>

                                        <strong>

                                            {
                                                hueca.direccion ||
                                                "Esmeraldas"
                                            }

                                        </strong>

                                    </section>

                                </div>


                                <div>

                                    <Phone
                                        size={19}
                                    />

                                    <section>

                                        <small>
                                            Teléfono
                                        </small>

                                        <strong>

                                            {
                                                hueca.telefono ||
                                                "No disponible"
                                            }

                                        </strong>

                                    </section>

                                </div>


                                <div>

                                    <Clock3
                                        size={19}
                                    />

                                    <section>

                                        <small>
                                            Horario
                                        </small>

                                        <strong>

                                            {
                                                hueca.horario ||
                                                "Horario no disponible"
                                            }

                                        </strong>

                                    </section>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </Layout>
    );
}


export default HuecaDetalle;