import React, { useEffect } from "react";
import {
  FaHome,
  FaDatabase,
  FaInfoCircle,
  FaEnvelope,
  FaMoon,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Extract username from email
  const username = user?.email ? user.email.split("@")[0] : "";

  return (
    <div
      className={`fixed top-0 left-0 h-screen border-1 border-r w-64 p-4 flex flex-col relative ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Top section with title and user greeting */}
      <h1 className="text-2xl font-bold mb-2">AI Model Studio</h1>
      <div className="flex items-center gap-2 mb-6 text-1.5xl mt-4 font-bold">
        <FaUser className="text-gray-500" />
        <span>Hi, {username.charAt(0).toUpperCase() + username.slice(1)}</span>
      </div>

      <hr />
      <br />

      {/* Search section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search models..."
          className="w-full px-3 py-2 rounded-lg focus:outline-none border dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Navigation menu */}
      <ul className="space-y-4">
        <li className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
          <FaHome />
          <span>
            <NavLink to="/">Models</NavLink>
          </span>
        </li>
        {/* <li className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
          <FaDatabase />
          <span>Models</span>
        </li> */}
        <li className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
          <FaInfoCircle />
          <span>About</span>
        </li>
        <li className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
          <FaEnvelope />
          <span>Contact</span>
        </li>
      </ul>

      {/* Bottom section with dark mode and logout */}
      <div className="mt-auto">
        {/* Dark mode toggle */}
        <div className="mb-4 flex items-center gap-3 cursor-pointer">
          <button
            className="flex items-center gap-2"
            onClick={toggleDarkMode} // Use the global toggle function
          >
            <FaMoon />
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
