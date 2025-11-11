import Sidebar from "./Sidebar";
import EmptyState from "./EmptyState";
import StatCard from "./StatCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FiClock } from "react-icons/fi";
import { TbAlertTriangle } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { FaChartLine } from "react-icons/fa6";
import { GoMoon } from "react-icons/go";
import { PiBellThin } from "react-icons/pi";
import { LuUser } from "react-icons/lu";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function Dashboard() {
  const navigate = useNavigate();

  // Safely get username
  let userName = "User";
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Frontend state for dropdowns
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowUserMenu(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      userName = storedUser.name;
    }
  } catch (error) {
    console.warn("Invalid user JSON in localStorage — fixing…");
    localStorage.removeItem("user");
  }

  const stats = [
    { title: "My Exams", value: 0, icon: <TfiWrite />, color: "bg-[#EFF6FF]" },
    {
      title: "Ongoing Exams",
      value: 0,
      icon: <FiClock />,
      color: "bg-[#FFFBEB]",
    },
    {
      title: "Result Summary",
      value: 0,
      icon: <FaChartLine />,
      color: "bg-[#F0FDF4]",
    },
    {
      title: "Malpractice Alert",
      value: 0,
      icon: <TbAlertTriangle />,
      color: "bg-[#FFF5F5]",
    },
  ];

  // FIXED: Now navigates to the correct route
  const handleCreateExam = (e) => {
    e.stopPropagation();
    navigate("/create-exam"); // CHANGED: Fixed route to match App.jsx
  };

  const toggleDarkMode = (e) => {
    e.stopPropagation();
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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

  if (loading) {
    return (
      <div
        className={`h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-[#f9fafb]"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={darkMode ? "text-white" : "text-gray-600"}>
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-[#f9fafb]"
      }`}
    >
      {/* Header */}
      <div
        className={`border-b ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } px-4 sm:px-6 py-4 flex items-center justify-between gap-4 relative`}
      >
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-24 flex-1 min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
          >
            <HiMenu
              size={24}
              className={darkMode ? "text-white" : "text-gray-700"}
            />
          </button>

          <img
            src="Logo icon.png"
            alt="Logo"
            className="w-16 sm:w-20 lg:w-[120px] flex-shrink-0"
          />
          <h1
            className={`font-Poppins text-lg sm:text-xl lg:text-[32px] font-bold ${
              darkMode ? "text-white" : "text-[#2E2E30]"
            } truncate`}
          >
            Dashboard
          </h1>
        </div>

        {/* Icons with Dropdowns */}
        <span className="flex gap-4 sm:gap-8 flex-shrink-0">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <GoMoon size={20} />
          </button>

          {/* Notifications with Dropdown */}
          <div className="relative">
            <button
              onClick={handleNotifications}
              className={`p-2 rounded-lg relative ${
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
              className={`p-2 rounded-lg ${
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

      <div className="flex flex-1 relative">
        {/* Sidebar Popup for Mobile & Tablet */}
        <div
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed inset-0 lg:static z-50
          flex lg:block
        `}
        >
          <div className="w-64 h-full relative">
            <Sidebar darkMode={darkMode} isMobile={isMobile} />

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <IoClose
                size={20}
                className={darkMode ? "text-white" : "text-gray-700"}
              />
            </button>
          </div>

          <div
            className="flex-1 lg:hidden bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 p-4 sm:p-6 overflow-y-auto w-full ${
            darkMode ? "bg-gray-900" : ""
          }`}
        >
          {/* Welcome Section */}
          <div className="mt-4 sm:mt-8 mb-4 sm:mb-6 flex items-start gap-3">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                darkMode ? "bg-gray-700" : "bg-[#B1CDFB]"
              }`}
            >
              <span className="text-xl sm:text-2xl">👋</span>
            </div>

            <div>
              <h2
                className={`text-lg sm:text-[24px] font-bold ${
                  darkMode ? "text-white" : "text-[#0D0722]"
                }`}
              >
                Hello, {userName}
              </h2>
              <p
                className={`text-xs sm:text-[14px] ${
                  darkMode ? "text-gray-300" : "text-[#666666]"
                }`}
              >
                Manage your assessments, analyze class performance
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} darkMode={darkMode} />
            ))}
          </div>

          {/* Ready to start section */}
          <div className="mt-8 lg:mt-12">
            <h3
              className={`font-Inter font-normal text-lg sm:text-[22px] ${
                darkMode ? "text-white" : "text-[#2E2E30]"
              }`}
            >
              Ready to start?
            </h3>
          </div>

          {/* Create Exam Section */}
          <div className="mt-6 lg:mt-8">
            <div
              onClick={handleCreateExam}
              className={`w-full sm:w-[208px] h-auto sm:h-[210px] flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all duration-200 p-4 ${
                darkMode
                  ? "hover:bg-gray-800 hover:shadow-lg"
                  : "hover:bg-gray-50 hover:shadow-lg"
              } hover:scale-[1.02]`}
            >
              <img
                src="image 4.png"
                alt="Create Exam"
                className="w-16 h-16 sm:w-auto sm:h-auto mb-4"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <h3
                  className={`font-bold font-sans text-base sm:text-[20px] ${
                    darkMode ? "text-blue-400" : "text-[#3B82F6]"
                  }`}
                >
                  Create New Exam
                </h3>
                <p
                  className={`text-xs sm:text-[14px] font-Inter font-normal ${
                    darkMode ? "text-gray-300" : "text-[#666666]"
                  }`}
                >
                  Start crafting your next assessment
                </p>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="mt-6 sm:mt-8">
            <EmptyState darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
