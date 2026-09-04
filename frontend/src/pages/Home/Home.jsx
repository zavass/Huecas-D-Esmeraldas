import {
    Link
} from "react-router-dom";

import {
    ArrowRight,
    ChefHat,
    Hotel,
    MapPinned,
    Search,
    Sparkles,
    Star,
    Utensils
} from "lucide-react";

import Layout
    from "../../components/Layout/Layout.jsx";

import "./Home.css";

function Home() {
    const categorias = [
        {
            icon: <Utensils size={25} />,
            title: "Comida típica",
            text:
                "Disfruta los sabores tradicionales de la gastronomía esmeraldeña."
        },
        {
            icon: <ChefHat size={25} />,
            title: "Las mejores huecas",
            text:
                "Descubre lugares únicos recomendados por quienes conocen la ciudad."
        },
        {
            icon: <Hotel size={25} />,
            title: "Dónde hospedarte",
            text:
                "Encuentra hoteles y opciones para disfrutar tu visita a Esmeraldas."
        },
        {
            icon: <MapPinned size={25} />,
            title: "Rutas",
            text:
                "Conoce rutas para llegar fácilmente a tus destinos favoritos."
        }
    ];

    return (
        <Layout>

            <section className="hero">

                <div className="hero-glow hero-glow-one" />

                <div className="hero-glow hero-glow-two" />

                <div className="container hero-content">

                    <div className="hero-copy">

                        <div className="hero-badge">

                            <Sparkles size={15} />

                            Descubre el sabor
                            de Esmeraldas

                        </div>

                        <h1>
                            Tu próxima
                            <span>
                                {" "}experiencia{" "}
                            </span>
                            comienza aquí.
                        </h1>

                        <p>
                            Conoce las mejores
                            huecas, platos tradicionales,
                            hoteles y rutas para disfrutar
                            Esmeraldas como un verdadero local.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/huecas"
                                className="btn btn-primary hero-main-btn"
                            >
                                Explorar huecas

                                <ArrowRight
                                    size={18}
                                />
                            </Link>

                            <Link
                                to="/rutas"
                                className="btn btn-outline"
                            >
                                Ver rutas
                            </Link>

                        </div>

                        <div className="hero-stats">

                            <div>
                                <strong>
                                    +30
                                </strong>

                                <span>
                                    Lugares
                                </span>
                            </div>

                            <div>
                                <strong>
                                    4.8
                                </strong>

                                <span>
                                    <Star
                                        size={13}
                                        fill="currentColor"
                                    />

                                    Valoración
                                </span>
                            </div>

                            <div>
                                <strong>
                                    100%
                                </strong>

                                <span>
                                    Esmeraldeño
                                </span>
                            </div>

                        </div>

                    </div>

                    <div className="hero-visual">

                        <div className="hero-main-card">

                            <div className="hero-image-placeholder">

                                <div className="hero-food-symbol">

                                    <ChefHat
                                        size={70}
                                    />

                                </div>

                            </div>

                            <div className="hero-card-info">

                                <div>

                                    <span className="hero-card-label">
                                        Recomendación
                                    </span>

                                    <h3>
                                        Sazón Esmeraldeña
                                    </h3>

                                    <p>
                                        Tradición del Pacífico
                                    </p>

                                </div>

                                <div className="hero-rating">

                                    <Star
                                        size={16}
                                        fill="currentColor"
                                    />

                                    4.8

                                </div>

                            </div>

                        </div>

                        <div className="floating-card floating-search">

                            <Search
                                size={19}
                            />

                            <div>

                                <strong>
                                    Encuentra tu hueca
                                </strong>

                                <span>
                                    Busca por nombre
                                    o categoría
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section className="section discovery">

                <div className="container">

                    <div className="section-header">

                        <span className="section-eyebrow">
                            Descubre Esmeraldas
                        </span>

                        <h2 className="section-title">
                            Todo lo que necesitas
                            para vivir la ciudad.
                        </h2>

                        <p className="section-description">
                            Gastronomía, alojamiento y
                            rutas reunidas en un solo lugar.
                        </p>

                    </div>

                    <div className="discovery-grid">

                        {categorias.map(
                            (item, index) => (
                                <article
                                    className="discovery-card"
                                    key={index}
                                >

                                    <div className="discovery-icon">
                                        {item.icon}
                                    </div>

                                    <h3>
                                        {item.title}
                                    </h3>

                                    <p>
                                        {item.text}
                                    </p>

                                    <span className="discovery-arrow">
                                        <ArrowRight
                                            size={18}
                                        />
                                    </span>

                                </article>
                            )
                        )}

                    </div>

                </div>

            </section>

            <section className="cta-section">

                <div className="container">

                    <div className="cta-card">

                        <div>

                            <span className="section-eyebrow cta-eyebrow">
                                Cultura & Gastronomía
                            </span>

                            <h2>
                                Hay lugares que
                                no aparecen en las guías.
                            </h2>

                            <p>
                                Nosotros te ayudamos
                                a encontrarlos.
                            </p>

                        </div>

                        <Link
                            to="/huecas"
                            className="btn btn-light"
                        >
                            Descubrir ahora

                            <ArrowRight
                                size={18}
                            />
                        </Link>

                    </div>

                </div>

            </section>

        </Layout>
    );
}

export default Home;