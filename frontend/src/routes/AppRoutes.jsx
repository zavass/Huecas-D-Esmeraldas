import {
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";

import Huecas from "../pages/Huecas/Huecas.jsx";
import HuecaDetalle from "../pages/HuecaDetalle/HuecaDetalle.jsx";

import Hoteles from "../pages/Hoteles/Hoteles.jsx";
import HotelDetalle from "../pages/HotelDetalle/HotelDetalle.jsx";

import Rutas from "../pages/Rutas/Rutas.jsx";
import RutaDetalle from "../pages/RutaDetalle/RutaDetalle.jsx";

import Favoritos from "../pages/Favoritos/Favoritos.jsx";
import Perfil from "../pages/Perfil/Perfil.jsx";

import Dashboard from "../pages/admin/Dashboard/Dashboard.jsx";
import AdminHuecas from "../pages/admin/Huecas/AdminHuecas.jsx";
import AdminCategorias from "../pages/admin/Categorias/AdminCategorias.jsx";
import AdminHoteles from "../pages/admin/Hoteles/AdminHoteles.jsx";
import AdminRutas from "../pages/admin/Rutas/AdminRutas.jsx";
import AdminResenas from "../pages/admin/Resenas/AdminResenas.jsx";
import AdminUsuarios from "../pages/admin/Usuarios/AdminUsuarios.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleProtectedRoute from "./RoleProtectedRoute.jsx";

function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/huecas"
                element={<Huecas />}
            />

            <Route
                path="/huecas/:id"
                element={<HuecaDetalle />}
            />

            <Route
                path="/hoteles"
                element={<Hoteles />}
            />

            <Route
                path="/hoteles/:id"
                element={<HotelDetalle />}
            />

            <Route
                path="/rutas"
                element={<Rutas />}
            />

            <Route
                path="/rutas/:id"
                element={<RutaDetalle />}
            />

            <Route element={<ProtectedRoute />}>

                <Route
                    path="/favoritos"
                    element={<Favoritos />}
                />

                <Route
                    path="/perfil"
                    element={<Perfil />}
                />

                <Route
                    element={
                        <RoleProtectedRoute
                            allowedRoles={["ADMIN"]}
                        />
                    }
                >
                    <Route
                        path="/admin/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/admin/huecas"
                        element={<AdminHuecas />}
                    />

                    <Route
                        path="/admin/categorias"
                        element={<AdminCategorias />}
                    />

                    <Route
                        path="/admin/hoteles"
                        element={<AdminHoteles />}
                    />

                    <Route
                        path="/admin/rutas"
                        element={<AdminRutas />}
                    />

                    <Route
                        path="/admin/resenas"
                        element={<AdminResenas />}
                    />

                    <Route
                        path="/admin/usuarios"
                        element={<AdminUsuarios />}
                    />
                </Route>

            </Route>

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />

        </Routes>
    );
}

export default AppRoutes;