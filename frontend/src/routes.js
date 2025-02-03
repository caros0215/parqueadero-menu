import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Login from "./components/Login/LoginPage";
import Inicio from "./components/Inicio/Inicio";
import Usuarios from "./components/usuarios/usuarios";

const RoutesComponent = () => {
  return (
    <Routes>
      {/* Rutas */}
      <Route path="/" element={<Login />} /> {/* Login como ruta principal */}
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="*" element={<NoMatch />} /> {/* Corregido aquí */}
    </Routes>
  );
};

function NoMatch() {
  return (
    <>
      <section className="page_404">
        <div>
          <div className="four_zero_four_bg">
            <h1>404</h1>
          </div>
          <div className="box_404">
            <h3>
              <center>Pagina No encontrada</center>
            </h3>
          </div>
          <center>
            <button className="boton404">
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "#ffffff" }}
              >
                Ir al Menú
              </NavLink>
            </button>
          </center>
        </div>
      </section>
    </>
  );
}

export default RoutesComponent;