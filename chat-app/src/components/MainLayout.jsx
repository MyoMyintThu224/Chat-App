import React, { useState } from "react"; 
// React ကို import လုပ်တယ်။ useState ဟာ React မှာ state ကို handle လုပ်ဖို့ အသုံးပြုတယ်။

import { Outlet, useNavigate } from "react-router-dom";
// Outlet ဟာ nested routes တွေကို render လုပ်ဖို့ အသုံးပြုတယ်။
// useNavigate ဟာ route ပြောင်းဖို့ navigation function တစ်ခုပေးတယ်။

import { FiMenu, FiX } from "react-icons/fi";
// Menu ဖွင့်ဖို့ FiMenu icon နဲ့ ပိတ်ဖို့ FiX icon ကို import လုပ်တယ်။

import DarkMode from "./DarkMode";
// DarkMode component ကို import လုပ်တယ်။

import { FaMoon, FaSignOutAlt } from "react-icons/fa";
// FaMoon သည် လမင်းပုံလေးပါ။ Dark mode ရွေးချယ်ဖို့။
// FaSignOutAlt သည် Logout icon အဖြစ်သုံးတယ်။

// MainLayout component ကို define လုပ်တယ်။ prop တစ်ခုပေးထားတယ် (onLogout)
const MainLayout = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Sidebar menu ကိုဖွင့်/ပိတ်ဖို့ isOpen ဆိုတဲ့ boolean state တစ်ခုကို သုံးတယ်။

  const navigate = useNavigate();
  // route ပြောင်းဖို့ navigation function ရယူတယ်။

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Menu ကို ဖွင့်/ပိတ် toggle လုပ်တယ်။
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300 text-gray-800">
      {/* MainLayout Component ရဲ့ background layout ကို design လုပ်တယ် */}
      
      {/* Sidebar Overlay */}
      {isOpen && (
        // isOpen true ဖြစ်တဲ့အခါ Sidebar menu ကိုပြတယ်။
        <div className="absolute top-0 left-0 z-50 w-64 h-full bg-sky bg-opacity-90 shadow-lg backdrop-blur-md border-r border-gray-300 transition-all duration-300 ease-in-out text-green-600">
          
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <h1 className="text-xl font-bold">ROM Devices</h1>
            <button onClick={toggleMenu} className="text-2xl text-gray-700 focus:outline-none">
              <FiX />
              {/* Menu ပိတ် icon */}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="p-4 space-y-2">
            {/* Dark Mode Toggle Button */}
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-700">
              <div className="flex items-center text-blue-600">
                <FaMoon className="text-lg mr-2" />
                Dark Mode
              </div>
              <DarkMode />
              {/* DarkMode component ကို render လုပ်တယ် */}
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                onLogout(); // logout function ကို run လုပ်တယ်
                navigate("/login"); // login page ကို ပြန်ပေးပို့တယ်
              }}
              className="flex items-center p-2 rounded-lg hover:bg-red-200 text-red-600 w-full"
            >
              <FaSignOutAlt className="text-lg mr-2" />
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Menu Toggle Button (Top Left) */}
      <button
        onClick={toggleMenu}
        className="absolute top-4 left-4 z-40 text-3xl bg-white bg-opacity-70 p-2 rounded-full shadow-md focus:outline-none"
      >
        <FiMenu />
        {/* Menu ဖွင့်တဲ့ button */}
      </button>

      {/* Main Page Content Area */}
      <div className="h-full overflow-y-auto p-6 z-10 relative">
        <Outlet />
        {/* Nested route component (Home, ChatBox, etc.) တွေ ပြသဖို့ Outlet အသုံးပြုတယ် */}
      </div>
    </div>
  );
};

export default MainLayout;
// MainLayout component ကို export လုပ်တယ်။
