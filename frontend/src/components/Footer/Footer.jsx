
import {
  Facebook,
  Instagram,
  MapPin,
  UtensilsCrossed
} from "lucide-react";

import "./Footer.css";

// ==========================================
// REDES SOCIALES
// ==========================================

const INSTAGRAM_URL =
  "https://www.instagram.com/alcaldiadeesmeraldas?exln=MTBmMHc5ZW54NGxxZA==";

const FACEBOOK_URL =
  "https://www.facebook.com/share/1E18jK7pLq/";

// ==========================================
// COMPONENTE FOOTER
// ==========================================

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-content">

        {/* LOGOTIPO Y DESCRIPCIÓN */}

        <div className="footer-brand">

          <div className="footer-logo">
            <UtensilsCrossed size={24} />
          </div>

          <div>
            <h3>Las Huecas de Esmeraldas</h3>

            <p>
              Descubre sabores, lugares y experiencias
              de nuestra tierra verde.
            </p>
          </div>

        </div>

        {/* UBICACIÓN */}

        <div className="footer-location">
          <MapPin size={18} />

          <span>
            Esmeraldas, Ecuador
          </span>
        </div>

        {/* REDES SOCIALES */}

        <div className="footer-social">

          {/* INSTAGRAM */}

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de la Alcaldía de Esmeraldas"
            title="Visitar Instagram"
          >
            <Instagram size={19} />
          </a>

          {/* FACEBOOK */}

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar Facebook"
            title="Visitar Facebook"
          >
            <Facebook size={19} />
          </a>

        </div>

      </div>

      {/* DERECHOS RESERVADOS */}

      <div className="footer-bottom">
        © 2026 Las Huecas de Esmeraldas.
        Todos los derechos reservados.
      </div>

    </footer>
  );
}

export default Footer;
