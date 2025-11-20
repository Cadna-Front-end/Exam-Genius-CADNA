import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx"; // UPDATED: Added .jsx extension
import { GoMoon } from "react-icons/go";
import { PiBellThin } from "react-icons/pi";
import { LuUser } from "react-icons/lu";
import { IoSunny } from "react-icons/io5";

export default function Header({ title = "Dashboard" }) {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Safely get username
  let userName = "User";
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      userName = storedUser.name;
    }
  } catch (error) {
    console.warn("Invalid user JSON in localStorage");
    localStorage.removeItem("user");
  }

  const handleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const handleUserProfile = (e) => {
    e.stopPropagation();
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div
      className={`border-b flex-shrink-0 ${
        darkMode ? "bg-[#0F1A28] border-[#0F1A28]" : "bg-white border-gray-200"
      } px-4 sm:px-6 py-4 flex items-center justify-between gap-4 relative`}
    >
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-24 flex-1 min-w-0">
        {/* Conditional Logo - Dark mode: Dark mode logo.png, Light mode: Logo icon.png */}
        <img
          src={darkMode ? "/Darkmode logo.png" : "/Logo icon.png"}
          alt="Logo"
          className="w-16 sm:w-20 lg:w-[120px] flex-shrink-0"
        />
        <h1
          className={`font-Poppins text-lg sm:text-xl lg:text-[32px] font-bold ${
            darkMode ? "text-white" : "text-[#2E2E30]"
          } truncate`}
        >
          {title}
        </h1>
      </div>

      {/* Icons with Dropdowns */}
      <span className="flex gap-2 sm:gap-4 flex-shrink-0">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full transition-colors ${
            darkMode
              ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {darkMode ? <IoSunny size={20} /> : <GoMoon size={20} />}
        </button>

        {/* Notifications with Dropdown */}
        <div className="relative">
          <button
            onClick={handleNotifications}
            className={`p-3 rounded-full relative transition-colors ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <PiBellThin size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"></span>
          </button>

          {showNotifications && (
            <div
              className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg z-50 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="p-4">
                <h3
                  className={`font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Notifications
                </h3>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <p>No new notifications</p>
                  <p className="text-xs mt-2">
                    Student submissions will appear here
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Menu with Dropdown */}
        <div className="relative">
          <button
            onClick={handleUserProfile}
            className={`p-3 rounded-full transition-colors ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <LuUser size={20} />
          </button>

          {showUserMenu && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="p-2">
                <div
                  className={`px-3 py-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Signed in as <strong>{userName}</strong>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    darkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </span>
    </div>
  );
}
