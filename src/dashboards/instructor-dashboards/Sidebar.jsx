import { useNavigate, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { TfiWrite } from "react-icons/tfi";
import { TbMessageQuestion } from "react-icons/tb";
import { FiClipboard, FiBarChart2, FiSettings, FiLogOut } from "react-icons/fi";
import { useState } from "react";

export default function Sidebar({ darkMode = false, isMobile = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <RxDashboard />, link: "/dashboard/instructor" },
    {
      name: "Exams",
      icon: <TfiWrite />,
      link: "/dashboard/instructor/exams",
    },
    {
      name: "Question Bank",
      icon: <TbMessageQuestion />,
      link: "/dashboard/instructor/questions",
    },
    {
      name: "Analytics",
      icon: <FiBarChart2 />,
      link: "/dashboard/instructor/analytics",
    },
    {
      name: "Settings",
      icon: <FiSettings />,
      link: "/dashboard/instructor/settings",
    },
  ];

  // Manual active state check
  const isActive = (link) => {
    if (link === "/dashboard/instructor") {
      return location.pathname === "/dashboard/instructor";
    }
    return location.pathname.startsWith(link);
  };

  const handleNavigation = (link) => {
    navigate(link);
    if (isMobile) {
      console.log("Close mobile sidebar");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div
      className={`w-64 h-full flex flex-col ${
        isMobile
          ? darkMode
            ? "bg-[#0A141F] text-white"
            : "bg-white text-gray-800"
          : darkMode
          ? "bg-[#0A141F] text-white"
          : "bg-[#3B82F6] text-white"
      }`}
    >
      {/* Logo/Brand Area */}
      <div className="p-6 text-xl font-normal text-[18px] font-intel tracking-wide">
        <div
          className={`text-center ${
            isMobile && !darkMode ? "text-gray-800" : "text-white"
          }`}
        ></div>
      </div>

      {/* Navigation Menu - FIXED: Using manual active state */}
      <nav className="flex-1 px-4 space-y-2">
        {menu.map((item) => {
          const active = isActive(item.link);
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.link)}
              className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 group w-full text-left ${
                active
                  ? isMobile
                    ? darkMode
                      ? "bg-[#0A141F] shadow-lg text-white"
                      : "bg-blue-100 shadow-md text-blue-600"
                    : darkMode
                    ? "bg-gray-700 shadow-lg text-white"
                    : "bg-white/25 shadow-lg text-white"
                  : isMobile
                  ? darkMode
                    ? "text-white hover:bg-[#24559F] hover:shadow-md"
                    : "text-gray-800 hover:bg-blue-100 hover:text-blue-600"
                  : darkMode
                  ? "hover:bg-[#24559F] hover:shadow-md text-white hover:text-blue-300"
                  : "hover:bg-[#24559F] hover:shadow-md text-white hover:text-blue-200"
              }`}
            >
              <span
                className={`text-lg ${
                  isMobile
                    ? ""
                    : "group-hover:scale-110 transition-transform duration-200"
                }`}
              >
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleLogoutClick}
          className={`flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-all duration-200 w-full ${
            isMobile
              ? darkMode
                ? "text-white hover:bg-[#24559F] hover:shadow-md"
                : "text-gray-800 hover:bg-blue-100 hover:text-blue-600"
              : darkMode
              ? "hover:bg-gray-700 text-white hover:shadow-md hover:text-blue-300"
              : "hover:bg-white/10 text-white hover:shadow-md hover:text-blue-200"
          }`}
        >
          <FiLogOut
            className={`text-lg ${
              isMobile
                ? ""
                : "group-hover:scale-110 transition-transform duration-200"
            }`}
          />
          <span>Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg shadow-xl max-w-sm w-full mx-4 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Confirm Logout
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelLogout}
                className={`px-4 py-2 rounded-md transition-colors ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
