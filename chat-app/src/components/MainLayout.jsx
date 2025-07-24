import React, { useState } from "react";
import {  Outlet, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import DarkMode from "./DarkMode"; // Import DarkMode component
import { FaMoon, FaSignOutAlt } from "react-icons/fa";

const MainLayout = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 text-gray-800">
      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="absolute top-0 left-0 z-50 w-64 h-full bg-sky bg-opacity-90 shadow-lg backdrop-blur-md border-r border-gray-300 transition-all duration-300 ease-in-out text-green-600">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <h1 className="text-xl font-bold">ROM Devices</h1>
            <button onClick={toggleMenu} className="text-2xl text-gray-700 focus:outline-none">
              <FiX />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-4 space-y-2">
                {/*dark mode  */}
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-700">
              <div className="flex items-center text-blue-600">
                <FaMoon className="text-lg mr-2" />
                Dark Mode
              </div>
              <DarkMode />
            </div>

            <button
              onClick={() => {
                onLogout();
                navigate("/login");
              }}
              className="flex items-center p-2 rounded-lg hover:bg-red-200 text-red-600 w-full"
            >
              <FaSignOutAlt className="text-lg mr-2" />
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Menu Toggle Button (top left) */}
      <button
        onClick={toggleMenu}
        className="absolute top-4 left-4 z-40 text-3xl bg-white bg-opacity-70 p-2 rounded-full shadow-md focus:outline-none"
      >
        <FiMenu />
      </button>

      {/* Content */}
      <div className="h-full overflow-y-auto p-6 z-10 relative">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
