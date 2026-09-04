import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    ArrowRight,
    Building2,
    Hotel,
    LogOut,
    Map,
    ShieldCheck,
    Store,
    UtensilsCrossed,
    Users
} from "lucide-react";

import {
    cerrarSesion,
    obtenerUsuario
} from "../../../services/authService.js";

import "./Dashboard.css";

function Dashboard() {
    const navigate =
        useNavigate();

    const usuario =
        obtenerUsuario();

    const salir = () => {
        cerrarSesion();

        navigate(
            "/",
            {
                replace: true
            }
        );
    };

    const cards = [
        {
            title: "Huecas",
            description:
                "Administra los establecimientos gastronómicos.",
            icon: <Store size={28} />,
            path: "/admin/huecas"
        },
        {
            title: "Categorías",
            description:
                "Organiza las categorías gastronómicas.",
            icon: <UtensilsCrossed size={28} />,
            path: "/admin/categorias"
        },
        {
            title: "Hoteles",
            description:
                "Gestiona los hoteles registrados.",
            icon: <Hotel size={28} />,
            path: "/admin/hoteles"
        },
        {
            title: "Rutas",
            description:
                "Administra las rutas turísticas.",
            icon: <Map size={28} />,
            path: "/admin/rutas"
        },
        {
            title: "Usuarios",
            description:
                "Consulta los usuarios del sistema.",
            icon: <Users size={28} />,
            path: "/admin/usuarios"
        },
        {
            title: "Reseñas",
            description:
                "Supervisa opiniones y valoraciones.",
            icon: <Building2 size={28} />,
            path: "/admin/resenas"
        }
    ];

    return (
        <div className="admin-dashboard">

            <aside className="admin-sidebar">

                <div className="admin-brand">

                    <div className="admin-brand-icon">
                        <UtensilsCrossed
                            size={24}
                        />
                    </div>

                    <div>
                        <strong>
                            Las Huecas
                        </strong>

                        <span>
                            Administración
                        </span>
                    </div>

                </div>

                <div className="admin-user-card">

                    <div className="admin-avatar">
                        {
                            usuario?.nombre
                                ?.charAt(0)
                                ?.toUpperCase()
                            || "A"
                        }
                    </div>

                    <div>
                        <strong>
                            {
                                usuario?.nombre
                                || "Administrador"
                            }
                        </strong>

                        <span>
                            {usuario?.correo}
                        </span>
                    </div>

                </div>

                <nav className="admin-menu">

                    <Link
                        to="/admin/dashboard"
                        className="active"
                    >
                        Dashboard
                    </Link>

                    <Link to="/">
                        Ver sitio público
                    </Link>

                </nav>

                <button
                    className="admin-logout"
                    onClick={salir}
                    type="button"
                >
                    <LogOut size={18} />
                    Cerrar sesión
                </button>

            </aside>

            <main className="admin-main">

                <header className="admin-header">

                    <div>

                        <span className="admin-eyebrow">
                            Panel administrativo
                        </span>

                        <h1>
                            Hola,{" "}
                            {
                                usuario?.nombre
                                || "Administrador"
                            }
                        </h1>

                        <p>
                            Gestiona el contenido
                            de Las Huecas de Esmeraldas.
                        </p>

                    </div>

                    <div className="admin-secure">

                        <ShieldCheck
                            size={18}
                        />

                        Sesión protegida con JWT

                    </div>

                </header>

                <section className="admin-grid">

                    {cards.map(
                        item => (
                            <article
                                className="admin-module"
                                key={
                                    item.title
                                }
                            >

                                <div className="admin-module-icon">
                                    {
                                        item.icon
                                    }
                                </div>

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {
                                        item.description
                                    }
                                </p>

                                <Link
                                    to={item.path}
                                    className="admin-module-link"
                                >
                                    Administrar

                                    <ArrowRight
                                        size={17}
                                    />
                                </Link>

                            </article>
                        )
                    )}

                </section>

            </main>

        </div>
    );
}

export default Dashboard;