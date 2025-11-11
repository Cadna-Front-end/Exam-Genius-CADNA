import Sidebar from "./Sidebar";
import EmptyState from "./EmptyState";
import StatCard from "./StatCard";

import { FiClock } from "react-icons/fi";
import { TbAlertTriangle } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { FaChartLine } from "react-icons/fa6";
import { GoMoon } from "react-icons/go";
import { PiBellThin } from "react-icons/pi";
import { LuUser } from "react-icons/lu";

export default function Dashboard() {
  // Safely get username
  let userName = "User";

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

  const handleCreateExam = () => {
    // Add your create exam logic here
    alert("Create Exam clicked!");
    // Or navigate to create exam page
    // navigate('/create-exam');
  };

  return (
    <div className="h-screen flex flex-col bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-24">
        <img src="Logo icon.png" alt="Logo" className="w-[120px]" />
        <h1 className="font-Poppins text-[32px] font-bold text-[#2E2E30]">
          Dashboard
        </h1>
        <span className="flex gap-8">
          <GoMoon />
          <PiBellThin />
          <LuUser />
        </span>
      </div>

      <div className="flex flex-1">
        <Sidebar />

        {/* Main Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/*Welcome Section */}
          <div className="mt-8 mb-6 flex items-start gap-3">
            <div className="w-12  h-12 rounded-full bg-[#B1CDFB] flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>

            <div>
              <h2 className="text-[24px] font-bold text-intel text-[#0D0722]">
                Hello, {userName}
              </h2>
              <p className="text-[14px] text-[#666666]">
                Manage your assessments, analyze class performance
              </p>
            </div>
          </div>
          <br />
          <br />

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
          <br />
          <br />
          <div>
            <h3 className="font-Inter font-normal text-[22px] text-[#2E2E30]">
              Ready to start?
            </h3>
          </div>
          <br />
          <br />

          {/* Updated Create Exam Section - Vertically aligned and clickable */}
          <div
            onClick={handleCreateExam}
            className="w-[208px] h-[210px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg transition-colors duration-200 p-4"
          >
            <br />
            <br />
            <br />
            <img src="image 4.png" alt="" className="mb-4" />
            <div className="flex flex-col items-center justify-center text-center">
              <h3 className="font-bold font-sans text-[#3B82F6] text-[20px]">
                Create New Exam
              </h3>
              <p className="text-[#666666] text-[14px] font-Inter font-normal">
                Start crafting your next assessment
              </p>
            </div>
          </div>

          {/* Empty State */}
          <div className="mt-8">
            <EmptyState />
          </div>
        </div>
      </div>
    </div>
  );
}





























import Sidebar from "./Sidebar";
import EmptyState from "./EmptyState";
import StatCard from "./StatCard";
import { useState } from "react";

import { FiClock } from "react-icons/fi";
import { TbAlertTriangle } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { FaChartLine } from "react-icons/fa6";
import { GoMoon } from "react-icons/go";
import { PiBellThin } from "react-icons/pi";
import { LuUser } from "react-icons/lu";

export default function Dashboard() {
  // Safely get username
  let userName = "User";

  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      userName = storedUser.name;
    }
  } catch (error) {
    console.warn("Invalid user JSON in localStorage — fixing…");
    localStorage.removeItem("user");
  }

  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);
  // State for notifications (example)
  const [notifications, setNotifications] = useState([]);

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

  const handleCreateExam = () => {
    // Add your create exam logic here
    alert("Create Exam clicked!");
    // Or navigate to create exam page
    // navigate('/create-exam');
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can also add logic to apply dark mode to the entire app
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Handle notifications click
  const handleNotifications = () => {
    alert("Notifications clicked!");
    // You can implement a notifications dropdown or modal here
  };

  // Handle user profile click
  const handleUserProfile = () => {
    alert("User profile clicked!");
    // You can implement a user dropdown or navigate to profile page
  };

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
        } px-6 py-4 flex items-center justify-between`}
      >
        <div className="flex items-center gap-24">
          <img src="Logo icon.png" alt="Logo" className="w-[120px]" />
          <h1
            className={`font-Poppins text-[32px] font-bold ${
              darkMode ? "text-white" : "text-[#2E2E30]"
            }`}
          >
            Dashboard
          </h1>
        </div>
        <span className="flex gap-8">
          {/* Moon Icon - Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              darkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <GoMoon size={20} />
          </button>

          {/* Bell Icon - Notifications */}
          <button
            onClick={handleNotifications}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <PiBellThin size={20} />
          </button>

          {/* User Icon - Profile */}
          <button
            onClick={handleUserProfile}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <LuUser size={20} />
          </button>
        </span>
      </div>

      <div className="flex flex-1">
        <Sidebar darkMode={darkMode} />

        {/* Main Page Content */}
        <div
          className={`flex-1 p-6 overflow-y-auto ${
            darkMode ? "bg-gray-900" : ""
          }`}
        >
          {/*Welcome Section */}
          <div className="mt-8 mb-6 flex items-start gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? "bg-gray-700" : "bg-[#B1CDFB]"
              }`}
            >
              <span className="text-2xl">👋</span>
            </div>

            <div>
              <h2
                className={`text-[24px] font-bold ${
                  darkMode ? "text-white" : "text-[#0D0722]"
                }`}
              >
                Hello, {userName}
              </h2>
              <p
                className={`text-[14px] ${
                  darkMode ? "text-gray-300" : "text-[#666666]"
                }`}
              >
                Manage your assessments, analyze class performance
              </p>
            </div>
          </div>
          <br />
          <br />

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} darkMode={darkMode} />
            ))}
          </div>
          <br />
          <br />
          <div>
            <h3
              className={`font-Inter font-normal text-[22px] ${
                darkMode ? "text-white" : "text-[#2E2E30]"
              }`}
            >
              Ready to start?
            </h3>
          </div>
          <br />
          <br />

          {/* Updated Create Exam Section - Vertically aligned and clickable */}
          <div
            onClick={handleCreateExam}
            className={`w-[208px] h-[210px] flex flex-col items-center justify-center cursor-pointer rounded-lg transition-colors duration-200 p-4 ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
            }`}
          >
            <br />
            <br />
            <br />
            <img src="image 4.png" alt="" className="mb-4" />
            <div className="flex flex-col items-center justify-center text-center">
              <h3
                className={`font-bold font-sans text-[20px] ${
                  darkMode ? "text-blue-400" : "text-[#3B82F6]"
                }`}
              >
                Create New Exam
              </h3>
              <p
                className={`text-[14px] font-Inter font-normal ${
                  darkMode ? "text-gray-300" : "text-[#666666]"
                }`}
              >
                Start crafting your next assessment
              </p>
            </div>
          </div>

          {/* Empty State */}
          <div className="mt-8">
            <EmptyState darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
