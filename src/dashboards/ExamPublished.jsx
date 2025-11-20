// src/dashboards/instructor-dashboards/ExamPublished.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const ExamPublished = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile] = useState(window.innerWidth < 1024);

  const handleDone = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className={`h-screen flex flex-col ${
        darkMode ? "bg-[#0F1A28] text-white" : "bg-[#f9fafb]"
      }`}
    >
      <Header title="Exam Published" />

      {/* HAMBURGER MENU */}
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
        {/* SIDEBAR */}
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

        {/* MAIN CONTENT */}
        <div
          className={`flex-1 p-4 sm:p-6 overflow-auto w-full ${
            darkMode ? "bg-[#0F1A28]" : ""
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Header Section - Removed back button */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Exam Published
                </h1>
                <p
                  className={`mt-1 text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Mathematics Final Exam
                </p>
              </div>
            </div>

            {/* Success Content */}
            <div
              className={`rounded-lg border p-8 text-center ${
                darkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Animated Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Continuous pulsing background */}
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center animate-pulse ${
                      darkMode ? "bg-green-900" : "bg-green-50"
                    }`}
                  >
                    {/* Continuous ping animation */}
                    <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-75"></div>
                    {/* Main check icon */}
                    <svg
                      className={`w-12 h-12 relative z-10 ${
                        darkMode ? "text-green-300" : "text-green-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <h2
                className={`text-3xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Mathematics Finals Successfully Set!
              </h2>

              <p
                className={`mb-8 text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                The Mathematics final exam has been published and is now
                available to students. You can manage the exam settings and view
                submissions from the exams page.
              </p>

              {/* Single Done Button - FIXED: White text on blue background */}
              <div className="mt-8">
                <button
                  onClick={handleDone}
                  className="w-full max-w-xs mx-auto bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105 shadow-lg"
                >
                  Done
                </button>
              </div>

              {/* Quick Stats */}
              <div
                className={`mt-8 pt-8 border-t ${
                  darkMode ? "border-gray-600" : "border-gray-200"
                }`}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      150
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Total Students
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      0
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Submissions
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      100%
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Ready
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPublished;
