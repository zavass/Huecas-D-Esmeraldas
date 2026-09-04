import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    Tags
} from "lucide-react";

import "./AdminCategorias.css";

function AdminCategorias() {
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

                    <h1>Administrar Categorías</h1>

                    <p>
                        Gestiona las categorías gastronómicas.
                    </p>
                </div>

                <button type="button">
                    <Plus size={18} />
                    Nueva categoría
                </button>

            </div>

            <div className="admin-simple-card">

                <Tags size={42} />

                <h2>Categorías</h2>

                <p>
                    Aquí conectaremos el CRUD de categorías
                    con el backend.
                </p>

            </div>

        </div>
    );
}

export default AdminCategorias;