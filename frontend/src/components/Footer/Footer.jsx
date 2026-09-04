import {
    Facebook,
    Instagram,
    MapPin,
    UtensilsCrossed
} from "lucide-react";

import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="container footer-content">

                <div className="footer-brand">

                    <div className="footer-logo">
                        <UtensilsCrossed size={24} />
                    </div>

                    <div>
                        <h3>
                            Las Huecas de Esmeraldas
                        </h3>

                        <p>
                            Descubre sabores, lugares y experiencias
                            de nuestra tierra verde.
                        </p>
                    </div>

                </div>

                <div className="footer-location">
                    <MapPin size={18} />

                    <span>
                        Esmeraldas, Ecuador
                    </span>
                </div>

                <div className="footer-social">

                    <button type="button">
                        <Instagram size={19} />
                    </button>

                    <button type="button">
                        <Facebook size={19} />
                    </button>

                </div>

            </div>

            <div className="footer-bottom">
                © 2026 Las Huecas de Esmeraldas
            </div>

        </footer>
    );
}

export default Footer;