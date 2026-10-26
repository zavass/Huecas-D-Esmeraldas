
import {
  Building2,
  Compass,
  Home,
  Newspaper,
  Search,
  Store
} from "lucide-react";

import {
  Link,
  NavLink
} from "react-router-dom";

import "./Navbar.css";

function Navbar() {

  const navClass = ({ isActive }) =>
    isActive
      ? "navbar-link active"
      : "navbar-link";

  return (
    <header className="navbar-shell">

      <nav className="navbar-container">

        {/* LOGOTIPO */}
        <Link
          to="/"
          className="navbar-brand"
        >
          <img
            src="/images/logo/esmeralda.png"
            alt="Las Huecas Esmeraldas"
            className="navbar-logo"
          />

          <div className="navbar-brand-text">
            <strong>Las Huecas</strong>
            <span>ESMERALDAS</span>
          </div>

          <div className="navbar-divider" />

          <div className="navbar-slogan">
            Sabores que
            <br />
            cuentan historias
          </div>
        </Link>

        {/* MENU PRINCIPAL */}
        <div className="navbar-menu">

          <NavLink
            to="/"
            end
            className={navClass}
          >
            <Home size={17} />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/huecas"
            className={navClass}
          >
            <Store size={17} />
            <span>Huecas</span>
          </NavLink>

          <NavLink
            to="/hoteles"
            className={navClass}
          >
            <Building2 size={17} />
            <span>Hoteles</span>
          </NavLink>

          <NavLink
            to="/noticias"
            className={navClass}
          >
            <Newspaper size={17} />
            <span>Noticias</span>
          </NavLink>

        </div>

        {/* BUSQUEDA Y BOTON EXPLORAR */}
        <div className="navbar-actions">

          <div className="navbar-search">
            <Search size={17} />

            <input
              type="search"
              placeholder="Buscar lugares..."
              aria-label="Buscar lugares"
            />
          </div>

          <Link
            to="/huecas"
            className="navbar-explore"
          >
            <Compass size={18} />
            <span>Explorar</span>
          </Link>

        </div>

      </nav>

    </header>
  );
}

export default Navbar;
