import React, { useState } from 'react';
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

const SideNavBar  = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({}); // Estado para controlar submenús abiertos

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
      [index]: !prev[index], // Alternar entre abierto y cerrado
    }));
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
            <p className="title">web developer</p>
            <p className="name">John Doe</p>
          </div>
        </div>
        <div className="nav">
          <div className="menu">
            <p className="title">Main</p>
            <ul>
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
                      toggleSubMenu(index); // Abrir/cerrar submenú
                    }
                  }}
                >
                  <a href="#">
                    {item.icon}
                    <span className="text">{item.text}</span>
                    {item.subMenu && <CaretDown size={14} weight="bold" />}
                  </a>
                  {item.subMenu && (
                    <ul
                      className="sub-menu"
                      style={{
                        display: openSubMenus[index] ? 'block' : 'none', // Mostrar/ocultar submenú
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
              <li>
                <a href="#">
                  <Gear size={20} weight="bold" />
                  <span className="text">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="menu">
          <p className="title">Account</p>
          <ul>
            <li>
              <a href="#">
                <Info size={20} weight="bold" />
                <span className="text">Help</span>
              </a>
            </li>
            <li>
              <a href="#">
                <SignOut size={20} weight="bold" />
                <span className="text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="credits">
        <h1>
          Fully Responsive <br />
          Sidebar by OSC
        </h1>
      </div>
    </div>
  );
};

export default SideNavBar ;