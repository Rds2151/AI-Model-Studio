import React, { useEffect } from "react";
import {
  FaHome,
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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 999,
      }}
    >
      {/* Top section with title and user greeting */}
      <a target="_blank" href="https://innosquares.com/">
        <img
          src="https://innosquares.com/wp-content/uploads/2024/08/Innosquares-Logo-Rect.svg"
          className={darkMode ? `mb-2 bg-white rounded-lg` : `mb-2 `}
          alt=""
        />
      </a>
      <hr />
      <div className="ml-2 flex items-center gap-2 mb-5 text-1.5xl mt-4 font-bold">
        <FaUser className="text-gray-500" />
        <span>Hi, {username.charAt(0).toUpperCase() + username.slice(1)}</span>
      </div>

      <hr />
      <br />

      {/* Navigation menu */}
      <ul className="space-y-4 ml-2">
        {/* Models Link */}
        <li className="flex items-center gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 cursor-pointer hover:text-blue-500 ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`
            }
          >
            <FaHome />
            <span>Models</span>
          </NavLink>
        </li>
        {/* About Link */}
        <li className="flex items-center gap-3">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center gap-3 cursor-pointer hover:text-blue-500 ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`
            }
          >
            <FaInfoCircle />
            <span>About</span>
          </NavLink>
        </li>
        {/* Contact Link */}
        <li className="flex items-center gap-3">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex items-center gap-3 cursor-pointer hover:text-blue-500 ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`
            }
          >
            <FaEnvelope />
            <span>Contact</span>
          </NavLink>
        </li>
      </ul>

      {/* Bottom section with dark mode and logout */}
      <div className="mt-auto">
        {/* Dark mode toggle */}
        <div className="ml-2 mb-4 flex items-center gap-3 cursor-pointer">
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
