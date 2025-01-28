import React from "react";
import { HashRouter as Router, useLocation } from "react-router-dom";
import RoutesComponent from "./routes";
import SideNavBar from "./SideNavBar/SideNavBar";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Rutas donde NO quieres que aparezca el sidebar
  const noSidebarRoutes = ["/", "/login"];

  return (
    <>
      {/* Renderiza el SideNavBar solo si no estás en las rutas de login */}
      {!noSidebarRoutes.includes(location.pathname) && <SideNavBar />}
      <RoutesComponent />
    </>
  );
}

export default App;