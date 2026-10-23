import {
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import Home
    from "../pages/public/Home.jsx";

import Huecas
    from "../pages/public/Huecas.jsx";

import HuecaDetalle
    from "../pages/public/HuecaDetalle.jsx";

import Hoteles
    from "../pages/public/Hoteles.jsx";

import HotelDetalle
    from "../pages/public/HotelDetalle.jsx";

import Rutas
    from "../pages/public/Rutas.jsx";

import RutaDetalle
    from "../pages/public/RutaDetalle.jsx";

import Noticias
    from "../pages/noticia/Noticias.jsx";


function AppRoutes() {

    return (
        <Routes>

            <Route
                path="/"
                element={<Home />}
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

            <Route
                path="/noticias"
                element={<Noticias />}
            />

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
