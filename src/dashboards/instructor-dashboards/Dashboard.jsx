import Sidebar from "./Sidebar";
import EmptyState from "./EmptyState";
import StatCard from "./StatCard";
import Header from "./Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";
import { useExam } from "../../contexts/ExamContext";

import { FiClock } from "react-icons/fi";
import { TbAlertTriangle } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { FaChartLine } from "react-icons/fa6";
import { FaCheckCircle, FaFileAlt } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function Dashboard() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { exams, recentActivities, getStats } = useExam(); // ADD getStats

  // Safely get username
  let userName = "User";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
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

  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      userName = storedUser.name;
    }
  } catch (error) {
    console.warn("Invalid user JSON in localStorage — fixing…");
    localStorage.removeItem("user");
  }

  // Get dynamic stats from context instead of hardcoded zeros
  const statsData = getStats();

  const stats = [
    {
      title: "My Exams",
      value: statsData.totalExams,
      icon: <TfiWrite />,
      color: "bg-[#EFF6FF]",
    },
    {
      title: "Ongoing Exams",
      value: statsData.publishedExams,
      icon: <FiClock />,
      color: "bg-[#FFFBEB]",
    },
    {
      title: "Result Summary",
      value: statsData.totalStudents,
      icon: <FaChartLine />,
      color: "bg-[#F0FDF4]",
    },
    {
      title: "Malpractice Alert",
      value: statsData.draftExams,
      icon: <TbAlertTriangle />,
      color: "bg-[#FFF5F5]",
    },
  ];

  const handleCreateExam = (e) => {
    e.stopPropagation();
    navigate("/create-exam");
  };

  // Add Recent Activities component
  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case "exam_created":
          return <FaCheckCircle className="text-green-500" />;
        default:
          return <FaFileAlt className="text-blue-500" />;
      }
    };

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    return (
      <div
        className={`flex items-start space-x-3 p-3 rounded-lg ${
          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
        } transition-colors`}
      >
        <div className="mt-1">{getActivityIcon(activity.type)}</div>
        <div className="flex-1">
          <p
            className={`font-medium ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {activity.title}
          </p>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {activity.description}
          </p>
        </div>
        <div
          className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}
        >
          {formatTime(activity.timestamp)}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div
        className={`h-screen flex items-center justify-center ${
          darkMode ? "bg-[#0F1A28]" : "bg-[#f9fafb]"
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
        darkMode ? "bg-[#0F1A28] text-white" : "bg-[#f9fafb]"
      }`}
    >
      <Header title="Dashboard" />

      {/* HAMBURGER */}
      <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <HiMenu
            size={24}
            className={darkMode ? "text-white" : "text-gray-700"}
          />
        </button>
      </div>

      <div className="flex flex-1 min-h-0 relative">
        {/* Sidebar */}
        <div
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed inset-0 lg:static z-50
          flex lg:block flex-shrink-0
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
          className={`flex-1 p-4 sm:p-6 overflow-auto w-full ${
            darkMode ? "bg-[#0F1A28]" : ""
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

          {/* Stats - NOW DYNAMIC */}
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
              className="flex flex-col items-start cursor-pointer transition-all duration-200 hover:scale-[1.02] max-w-max"
            >
              <div className="mb-4 flex justify-start">
                <img
                  src="image 4.png"
                  alt="Create Exam"
                  className="w-20 h-20 flex-shrink-0"
                />
              </div>

              <div className="flex flex-col items-start justify-center text-left space-y-2">
                <h3
                  className={`font-bold font-sans text-lg ${
                    darkMode ? "text-blue-400" : "text-[#3B82F6]"
                  } leading-tight`}
                >
                  Create New Exam
                </h3>
                <p
                  className={`text-sm font-Inter font-normal ${
                    darkMode ? "text-gray-300" : "text-[#666666]"
                  } leading-tight break-words max-w-[200px]`}
                >
                  Start crafting your next assessment
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activities Section - ONLY shows when there are activities */}
          {recentActivities.length > 0 && (
            <div className="mt-8 lg:mt-12">
              <div
                className={`rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`p-6 border-b ${
                    darkMode ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <h2
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Recent Activity
                  </h2>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    {recentActivities.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          <div className="mt-6 sm:mt-8">
            <EmptyState darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
