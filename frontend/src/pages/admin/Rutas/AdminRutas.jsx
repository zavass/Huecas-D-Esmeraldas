import { Link } from "react-router-dom";
import {
    ArrowLeft,
    MapPinned,
    Plus
} from "lucide-react";

import "./AdminRutas.css";

function AdminRutas() {
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

                    <h1>Administrar Rutas</h1>

                    <p>
                        Gestiona las rutas turísticas
                        y gastronómicas.
                    </p>
                </div>

                <button type="button">
                    <Plus size={18} />
                    Nueva ruta
                </button>

            </div>

            <div className="admin-simple-card">

                <MapPinned size={42} />

                <h2>Rutas</h2>

                <p>
                    Aquí conectaremos el CRUD de rutas
                    con el backend.
                </p>

            </div>

        </div>
    );
}

export default AdminRutas;