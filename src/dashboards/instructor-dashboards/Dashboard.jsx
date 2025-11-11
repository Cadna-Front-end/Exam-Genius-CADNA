import Sidebar from "./Sidebar";
import EmptyState from "./EmptyState";
import StatCard from "./StatCard";
import Header from "../../components/Layout/Header.jsx";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextDefinition.js";

import { FiClock } from "react-icons/fi";
import { TbAlertTriangle } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { FaChartLine } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Safely get username
  const userName = user?.firstName || user?.name || "Instructor";
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [loading, setLoading] = useState(true);
  const [testExamCount, setTestExamCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [isMobile]);

  const stats = [
    { title: "My Exams", value: testExamCount, icon: <TfiWrite />, color: "bg-[#EFF6FF]" },
    {
      title: "Ongoing Exams",
      value: testExamCount > 0 ? Math.floor(testExamCount / 2) : 0,
      icon: <FiClock />,
      color: "bg-[#FFFBEB]",
    },
    {
      title: "Result Summary",
      value: testExamCount > 0 ? testExamCount * 2 : 0,
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

  // State management for Active vs Empty dashboard
  const hasActivity = stats.some(stat => stat.value > 0) || user?.examsCreated > 0 || false;

  // FIXED: Now navigates to the correct route
  const handleCreateExam = (e) => {
    e.stopPropagation();
    navigate("/create-exam"); // CHANGED: Fixed route to match App.jsx
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#f9fafb]"}`}>
      <Header 
        onMenuToggle={() => setSidebarOpen(true)} 
        title="Instructor Dashboard" 
        darkMode={darkMode}
        onDarkModeToggle={toggleDarkMode}
      />
      
      <div className="flex pt-16 relative">
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

          {/* Test State Switcher - Remove in production */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setTestExamCount(0)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              Empty State
            </button>
            <button
              onClick={() => setTestExamCount(5)}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm"
            >
              Active State
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} darkMode={darkMode} />
            ))}
          </div>

          {hasActivity ? (
            // Active Dashboard Content
            <>
              {/* Recent Activity Section */}
              <div className="mt-8 lg:mt-12">
                <h3
                  className={`font-Inter font-normal text-lg sm:text-[22px] ${
                    darkMode ? "text-white" : "text-[#2E2E30]"
                  }`}
                >
                  Recent Activity
                </h3>
                {/* Add recent exams, submissions, etc. */}
              </div>
              
              {/* Quick Actions */}
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
                    src="/image 4.png"
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
            </>
          ) : (
            // Empty Dashboard Content
            <>
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
                    src="/image 4.png"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}