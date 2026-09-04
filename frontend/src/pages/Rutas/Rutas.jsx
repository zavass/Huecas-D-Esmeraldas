import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    ArrowRight,
    Clock3,
    MapPin,
    Search,
    Signpost
} from "lucide-react";

import Layout
    from "../../components/Layout/Layout.jsx";

import {
    listarRutas
} from "../../services/rutaService.js";

import {
    imagenRutaPorIndice,
    resolverImagen
} from "../../assets/images/imageMap.js";

import "./Rutas.css";

function Rutas() {

    const [rutas, setRutas] =
        useState([]);

    const [q, setQ] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

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

    function buscar(event) {

        event.preventDefault();

        cargarRutas();
    }

    return (
        <Layout>

            <section className="rutas-hero">

                <div className="container">

                    <span>
                        Explora Esmeraldas
                    </span>

                    <h1>
                        Rutas para descubrir
                        nuestra tierra.
                    </h1>

                    <p>
                        Encuentra caminos, destinos y
                        experiencias para recorrer
                        Esmeraldas.
                    </p>

                </div>

            </section>

            <section className="rutas-section">

                <div className="container">

                    <form
                        className="rutas-search"
                        onSubmit={buscar}
                    >

                        <Search size={19} />

                        <input
                            type="search"
                            placeholder="Buscar ruta..."
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

                    <div className="rutas-header">

                        <span>
                            {rutas.length} rutas
                        </span>

                        <h2>
                            Elige tu próximo destino
                        </h2>

                    </div>

                    {loading && (
                        <div className="ruta-status">
                            Cargando rutas...
                        </div>
                    )}

                    {!loading && error && (
                        <div className="ruta-status ruta-error">
                            {error}
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        rutas.length === 0 && (
                            <div className="ruta-status">
                                <Signpost size={40} />
                                No hay rutas disponibles.
                            </div>
                        )}

                    {!loading &&
                        !error &&
                        rutas.length > 0 && (
                            <div className="rutas-grid">

                                {rutas.map(
                                    (ruta, index) => {

                                        const imagen =
                                            resolverImagen(
                                                ruta.imagen,
                                                imagenRutaPorIndice(
                                                    index
                                                )
                                            );

                                        return (
                                            <Link
                                                to={`/rutas/${ruta.id}`}
                                                className="ruta-card"
                                                key={ruta.id}
                                            >

                                                <div className="ruta-image">

                                                    <img
                                                        src={imagen}
                                                        alt={ruta.titulo}
                                                    />

                                                </div>

                                                <div className="ruta-content">

                                                    <span className="ruta-label">
                                                        Ruta
                                                    </span>

                                                    <h3>
                                                        {ruta.titulo}
                                                    </h3>

                                                    <p>
                                                        {
                                                            ruta.descripcion ||
                                                            "Descubre Esmeraldas."
                                                        }
                                                    </p>

                                                    <div className="ruta-meta">

                                                        <span>
                                                            <MapPin
                                                                size={15}
                                                            />

                                                            {
                                                                ruta.destino ||
                                                                "Esmeraldas"
                                                            }
                                                        </span>

                                                        {ruta.duracion && (
                                                            <span>

                                                                <Clock3
                                                                    size={15}
                                                                />

                                                                {
                                                                    ruta.duracion
                                                                }

                                                            </span>
                                                        )}

                                                    </div>

                                                    <div className="ruta-more">

                                                        Ver ruta

                                                        <ArrowRight
                                                            size={16}
                                                        />

                                                    </div>

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

export default Rutas;