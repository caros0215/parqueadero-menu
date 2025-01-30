import { useLocation } from "react-router-dom"
import SideNavBar from "./SideNavBar/SideNavBar"
import "./Layout.css"

const Layout = ({ children }) => {
  const location = useLocation()
  const isLoginPage = location.pathname === "/"

  return (
    <div className="layout-container">
      {!isLoginPage && <SideNavBar />}
      <main className={isLoginPage ? "main-content-full" : "main-content"}>
        {children}
      </main>
    </div>
  )
}

export default Layout