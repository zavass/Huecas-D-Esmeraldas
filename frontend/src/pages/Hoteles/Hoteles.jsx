import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    Hotel,
    MapPin,
    Search,
    Star
} from "lucide-react";

import Layout
    from "../../components/Layout/Layout.jsx";

import {
    listarHoteles
} from "../../services/hotelService.js";

import {
    imagenHotelPorIndice,
    resolverImagen
} from "../../assets/images/imageMap.js";

import "./Hoteles.css";

function Hoteles() {

    const [hoteles, setHoteles] =
        useState([]);

    const [q, setQ] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        cargarHoteles();
    }, []);

    async function cargarHoteles() {

        try {

            setLoading(true);
            setError("");

            const data =
                await listarHoteles(q);

            setHoteles(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            setError(
                err.message ||
                "No se pudieron cargar los hoteles."
            );

        } finally {

            setLoading(false);
        }
    }

    function buscar(event) {

        event.preventDefault();

        cargarHoteles();
    }

    return (
        <Layout>

            <section className="hoteles-hero">

                <div className="container">

                    <span>
                        Hospedaje
                    </span>

                    <h1>
                        Descansa y disfruta
                        Esmeraldas.
                    </h1>

                    <p>
                        Encuentra lugares para hospedarte
                        cerca de los principales atractivos
                        de la ciudad.
                    </p>

                </div>

            </section>

            <section className="hoteles-section">

                <div className="container">

                    <form
                        className="hoteles-search"
                        onSubmit={buscar}
                    >

                        <Search size={19} />

                        <input
                            type="search"
                            placeholder="Buscar hotel..."
                            value={q}
                            onChange={
                                event =>
                                    setQ(
                                        event.target.value
                                    )
                            }
                        />

                        <button type="submit">
                            Buscar
                        </button>

                    </form>

                    <div className="hoteles-title">

                        <span>
                            {hoteles.length} resultados
                        </span>

                        <h2>
                            Lugares para hospedarte
                        </h2>

                    </div>

                    {loading && (
                        <div className="hotel-status">
                            Cargando hoteles...
                        </div>
                    )}

                    {!loading && error && (
                        <div className="hotel-status hotel-error">
                            {error}
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        hoteles.length === 0 && (
                            <div className="hotel-status">

                                <Hotel size={40} />

                                No se encontraron hoteles.

                            </div>
                        )}

                    {!loading &&
                        !error &&
                        hoteles.length > 0 && (
                            <div className="hoteles-grid">

                                {hoteles.map(
                                    (hotel, index) => {

                                        const imagen =
                                            resolverImagen(
                                                hotel.imagen,
                                                imagenHotelPorIndice(
                                                    index
                                                )
                                            );

                                        return (
                                            <Link
                                                to={`/hoteles/${hotel.id}`}
                                                className="hotel-card"
                                                key={hotel.id}
                                            >

                                                <div className="hotel-image">

                                                    <img
                                                        src={imagen}
                                                        alt={hotel.nombre}
                                                    />

                                                    <span className="hotel-rating">

                                                        <Star
                                                            size={15}
                                                            fill="currentColor"
                                                        />

                                                        {
                                                            Number(
                                                                hotel.calificacion ||
                                                                0
                                                            ).toFixed(1)
                                                        }

                                                    </span>

                                                </div>

                                                <div className="hotel-content">

                                                    <span className="hotel-label">
                                                        Hospedaje
                                                    </span>

                                                    <h3>
                                                        {hotel.nombre}
                                                    </h3>

                                                    <p>
                                                        {
                                                            hotel.descripcion ||
                                                            "Hospedaje en Esmeraldas."
                                                        }
                                                    </p>

                                                    <div className="hotel-location">

                                                        <MapPin
                                                            size={15}
                                                        />

                                                        {
                                                            hotel.direccion ||
                                                            "Esmeraldas"
                                                        }

                                                    </div>

                                                    {hotel.precioDesde && (
                                                        <strong className="hotel-price">
                                                            Desde $
                                                            {
                                                                hotel.precioDesde
                                                            }
                                                        </strong>
                                                    )}

                                                </div>

                                            </Link>
                                        );
                                    }
                                )}

                            </div>
                        )}

                </div>

            </section>

        </Layout>
    );
}

export default Hoteles;