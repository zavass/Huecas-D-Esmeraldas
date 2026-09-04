import { Link } from "react-router-dom";
import {
    ArrowLeft,
    MessageSquareText
} from "lucide-react";

import "./AdminResenas.css";

function AdminResenas() {
    return (
        <div className="admin-simple-page">

            <div className="admin-simple-header">

                <div>
                    <Link
                        to="/admin/dashboard"
                        className="admin-simple-back"
                    >
                        <ArrowLeft size={17} />
                        Volver al dashboard
                    </Link>

                    <h1>Administrar Reseñas</h1>

                    <p>
                        Supervisa las reseñas y valoraciones
                        realizadas por los usuarios.
                    </p>
                </div>

            </div>

            <div className="admin-simple-card">

                <MessageSquareText size={42} />

                <h2>Reseñas</h2>

                <p>
                    Aquí mostraremos y gestionaremos
                    las reseñas registradas.
                </p>

            </div>

        </div>
    );
}

export default AdminResenas;