import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    Users
} from "lucide-react";

import "./AdminUsuarios.css";

function AdminUsuarios() {
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

                    <h1>Administrar Usuarios</h1>

                    <p>
                        Gestiona los usuarios registrados
                        en la plataforma.
                    </p>
                </div>

                <button type="button">
                    <Plus size={18} />
                    Nuevo usuario
                </button>

            </div>

            <div className="admin-simple-card">

                <Users size={42} />

                <h2>Usuarios</h2>

                <p>
                    Aquí conectaremos la administración
                    de usuarios con el backend.
                </p>

            </div>

        </div>
    );
}

export default AdminUsuarios;