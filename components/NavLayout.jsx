// app/components/Navbar.js
"use client"; // This component will run on the client

import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from "./Sidebar";
import NavLinks from "./NavLinks"; // Import your links component

const NavLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input type="checkbox" id="my-drawer-2" className="drawer-toggle" checked={isOpen} onChange={handleToggle} />
      <div className="drawer-content">
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden fixed top-6 right-6" onClick={handleToggle}>
          <FaBarsStaggered className="w-8 h-8 text-primary" />
        </label>
        <div className="bg-base-200 px-8 py-12 min-h-screen">{children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" onClick={handleToggle}></label>
        <Sidebar closeSidebar={closeSidebar} />
      </div>
    </div>
  );
};

export default NavLayout;
