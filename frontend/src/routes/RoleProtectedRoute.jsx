import {
    Navigate,
    Outlet
} from "react-router-dom";

import {
    obtenerUsuario
} from "../services/authService.js";

function RoleProtectedRoute({
    allowedRoles = []
}) {
    const usuario =
        obtenerUsuario();

    if (!usuario) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    const rol =
        usuario.rol?.toUpperCase();

    const permitido =
        allowedRoles
            .map(
                item =>
                    item.toUpperCase()
            )
            .includes(rol);

    if (!permitido) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return <Outlet />;
}

export default RoleProtectedRoute;