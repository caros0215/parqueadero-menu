import { useLocation } from "react-router-dom";
import { useState } from "react";
import SideNavBar from "../components/SideNavBar/SideNavBar";
import "./Layout.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const [sidebarActive, setSidebarActive] = useState(false);

  const handleSidebarToggle = (state) => {
    setSidebarActive(state);
  };

  return (
    <div className="layout-container">
      {!isLoginPage && (
        <SideNavBar 
          sidebarActive={sidebarActive}
          onSidebarToggle={handleSidebarToggle}
        />
      )}
      <main className={`main-content ${sidebarActive ? 'content-with-sidebar-closed' : ''} ${isLoginPage ? 'main-content-full' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;