
import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";

// PAGINAS PRINCIPALES
import Home from "../pages/Home/Home.jsx";

import Huecas from "../pages/Huecas/Huecas.jsx";

import HuecaDetalle from "../pages/HuecaDetalle/HuecaDetalle.jsx";

import Hoteles from "../pages/Hoteles/Hoteles.jsx";

import HotelDetalle from "../pages/HotelDetalle/HotelDetalle.jsx";

import Noticias from "../pages/noticia/Noticias.jsx";

function AppRoutes() {
  return (
    <Routes>

      {/* INICIO */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* HUECAS */}
      <Route
        path="/huecas"
        element={<Huecas />}
      />

      <Route
        path="/huecas/:id"
        element={<HuecaDetalle />}
      />

      {/* HOTELES */}
      <Route
        path="/hoteles"
        element={<Hoteles />}
      />

      <Route
        path="/hoteles/:id"
        element={<HotelDetalle />}
      />

      {/* NOTICIAS */}
      <Route
        path="/noticias"
        element={<Noticias />}
      />

      {/* RUTAS NO EXISTENTES */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;
