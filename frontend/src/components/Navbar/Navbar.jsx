import { useState } from "react";

import {
    Link,
    NavLink
} from "react-router-dom";

import {
    Compass,
    Heart,
    LogOut,
    Menu,
    Shield,
    UtensilsCrossed,
    User,
    X
} from "lucide-react";

import {
    cerrarSesion,
    esAdmin,
    estaAutenticado,
    obtenerUsuario
} from "../../services/authService.js";

import "./Navbar.css";

function Navbar() {
    const [open, setOpen] = useState(false);

    const autenticado = estaAutenticado();
    const usuario = obtenerUsuario();
    const admin = esAdmin();

    const closeMenu = () => {
        setOpen(false);
    };

    const salir = () => {
        cerrarSesion();
        window.location.href = "/";
    };

    return (
        <header className="navbar">

            <div className="container navbar-inner">

                <Link
                    to="/"
                    className="navbar-brand"
                    onClick={closeMenu}
                >
                    <div className="brand-icon">
                        <UtensilsCrossed size={22} />
                    </div>

                    <div>
                        <span className="brand-title">
                            Las Huecas
                        </span>

                        <span className="brand-subtitle">
                            Esmeraldas
                        </span>
                    </div>
                </Link>

                <nav
                    className={
                        open
                            ? "navbar-links navbar-links-open"
                            : "navbar-links"
                    }
                >
                    <NavLink
                        to="/"
                        onClick={closeMenu}
                    >
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/huecas"
                        onClick={closeMenu}
                    >
                        Huecas
                    </NavLink>

                    <NavLink
                        to="/hoteles"
                        onClick={closeMenu}
                    >
                        Hoteles
                    </NavLink>

                    <NavLink
                        to="/rutas"
                        onClick={closeMenu}
                    >
                        Rutas
                    </NavLink>

                    {autenticado && (
                        <NavLink
                            to="/favoritos"
                            onClick={closeMenu}
                            className="favorites-link"
                        >
                            <Heart size={17} />
                            Favoritos
                        </NavLink>
                    )}

                    {admin && (
                        <NavLink
                            to="/admin/dashboard"
                            onClick={closeMenu}
                            className="admin-link"
                        >
                            <Shield size={17} />
                            Administración
                        </NavLink>
                    )}
                </nav>

                <div className="navbar-actions">

                    {!autenticado ? (
                        <>
                            <Link
                                to="/login"
                                className="navbar-login"
                            >
                                Iniciar sesión
                            </Link>

                            <Link
                                to="/huecas"
                                className="btn btn-primary navbar-explore"
                            >
                                <Compass size={17} />
                                Explorar
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="navbar-user">
                                <User size={17} />

                                <span>
                                    {usuario?.nombre || "Usuario"}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="navbar-logout"
                                onClick={salir}
                            >
                                <LogOut size={17} />
                            </button>
                        </>
                    )}

                    <button
                        type="button"
                        className="navbar-menu-btn"
                        onClick={() => setOpen(!open)}
                        aria-label="Abrir menú"
                    >
                        {open ? <X /> : <Menu />}
                    </button>

                </div>

            </div>

        </header>
    );
}

export default Navbar;