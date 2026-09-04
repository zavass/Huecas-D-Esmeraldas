import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Hotel,
    Plus
} from "lucide-react";

import "./AdminHoteles.css";

function AdminHoteles() {
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

                    <h1>Administrar Hoteles</h1>

                    <p>
                        Gestiona los hoteles registrados
                        en Las Huecas de Esmeraldas.
                    </p>
                </div>

                <button type="button">
                    <Plus size={18} />
                    Nuevo hotel
                </button>

            </div>

            <div className="admin-simple-card">

                <Hotel size={42} />

                <h2>Hoteles</h2>

                <p>
                    Aquí conectaremos el CRUD de hoteles
                    con Spring Boot.
                </p>

            </div>

        </div>
    );
}

export default AdminHoteles;