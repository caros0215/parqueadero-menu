import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/LoginPage";
// import Inicio from "./inicio/inicio";
import NotFound from "./NotFound";

const RoutesComponent = () => {
  return (
    <Routes>
      {/* Rutas */}
      <Route path="/" element={<Login />} /> {/* Login como ruta principal */}
      {/* <Route path="/inicio" element={<Inicio />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
