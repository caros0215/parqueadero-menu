import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './SideNavBar.css';
import {
  CaretLeft,
  HouseSimple,
  User,
  FileText,
  CalendarBlank,
  ChartBar,
  Gear,
  Info,
  SignOut,
  CaretDown,
} from 'phosphor-react';

const SideNavBar = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});

  const handleMenuClick = (index) => {
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      setActiveMenu(index);
    }
  };

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleSubMenu = (index) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que quieres cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Limpiar localStorage
        localStorage.clear();
        
        // Mostrar mensaje de éxito
        Swal.fire({
          title: '¡Sesión cerrada!',
          text: 'Has cerrado sesión exitosamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // Redireccionar al login
          navigate('/');
        });
      }
    });
  };

  return (
    <div className="container">
      <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <div className="menu-btn" onClick={toggleSidebar}>
          <CaretLeft size={20} weight="bold" />
        </div>
        <div className="head">
          <div className="user-img">
            <img src="user.jpg" alt="User" />
          </div>
          <div className="user-details">
            <p className="title">parqueadro</p>
            <p className="name">Full</p>
          </div>
        </div>
        <div className="nav">
          <div className="menu">
            <p className="title">Main</p>
            <ul className='izquierda'>
              {[
                { icon: <HouseSimple size={20} weight="bold" />, text: 'Dashboard' },
                {
                  icon: <User size={20} weight="bold" />,
                  text: 'Audience',
                  subMenu: ['Users', 'Subscribers'],
                },
                { icon: <FileText size={20} weight="bold" />, text: 'Posts' },
                { icon: <CalendarBlank size={20} weight="bold" />, text: 'Schedules' },
                {
                  icon: <ChartBar size={20} weight="bold" />,
                  text: 'Income',
                  subMenu: ['Earnings', 'Funds', 'Declines', 'Payouts'],
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className={activeMenu === index ? 'active' : ''}
                  onClick={() => {
                    handleMenuClick(index);
                    if (item.subMenu) {
                      toggleSubMenu(index);
                    }
                  }}
                >
                  <a href="#">
                    {item.icon}
                    <span className="text">{item.text}</span>
                    {item.subMenu && <CaretDown size={22} weight="bold" />}
                  </a>
                  {item.subMenu && (
                    <ul
                      className="sub-menu"
                      style={{
                        display: openSubMenus[index] ? 'block' : 'none',
                      }}
                    >
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a href="#">
                            <span className="text">{subItem}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="menu">
            <p className="title">Settings</p>
            <ul>
              <li className='izquierda'>
                <a href="#">
                  <Gear size={20} weight="bold" />
                  <span className="text">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="menu3 menu">
          <p className="title">Account</p>
          <ul>
            <li>
              <a href="#">
                <Info size={20} weight="bold" />
                <span className="text">Help</span>
              </a>
            </li>
            <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <a>
                <SignOut size={20} weight="bold" />
                <span className="text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;