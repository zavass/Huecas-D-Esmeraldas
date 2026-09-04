import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    Store
} from "lucide-react";

import "./AdminHuecas.css";

function AdminHuecas() {
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

                    <h1>Administrar Huecas</h1>

                    <p>
                        Gestiona los establecimientos gastronómicos
                        registrados en el sistema.
                    </p>
                </div>

                <button type="button">
                    <Plus size={18} />
                    Nueva hueca
                </button>

            </div>

            <div className="admin-simple-card">

                <Store size={42} />

                <h2>Huecas</h2>

                <p>
                    Aquí conectaremos el CRUD de huecas
                    con Spring Boot y PostgreSQL.
                </p>

            </div>

        </div>
    );
}

export default AdminHuecas;