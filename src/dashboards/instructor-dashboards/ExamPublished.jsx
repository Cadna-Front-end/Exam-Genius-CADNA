import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ADD useLocation
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";
import { useExam } from "../../contexts/ExamContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";

const ExamPublished = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ADD this to get passed data
  const { darkMode } = useDarkMode();
  const { addExam } = useExam();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile] = useState(window.innerWidth < 1024);
  const [copied, setCopied] = useState(false);

  // Get exam data from location state or use defaults
  const examData = location.state?.examData || {
    name: "Final Examination",
    course: "Mathematics", // This will be replaced by actual imported subject
    scheduledDate: "2025-10-10T14:00:00",
    duration: "2 hours",
    studentsEnrolled: 45,
    questions: 25,
    totalMarks: 100,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://yourexamplatform.com/exam/${examData.course.toLowerCase()}-${examData.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoToDashboard = () => {
    // Add the exam to context with the actual user data
    addExam(examData);
    // Navigate to dashboard after adding the exam
    navigate("/dashboard");
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
            {/* Header Section */}
            <div className="flex items-center justify-center mb-8">
              <div>
                <h1
                  className={`text-2xl font-bold text-center ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Exam Published
                </h1>
                <p
                  className={`mt-1 text-sm text-center ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {examData.course} - {examData.name}
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
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center animate-pulse ${
                    darkMode ? "bg-green-900" : "bg-green-50"
                  }`}
                  style={{
                    animation: "pulse 2s infinite, bounce 2s infinite",
                    animationDelay: "0s, 1s",
                  }}
                >
                  <svg
                    className={`w-10 h-10 ${
                      darkMode ? "text-green-300" : "text-green-500"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h2
                className={`text-3xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {examData.name} Successfully Set!
              </h2>

              <p
                className={`mb-8 text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                The {examData.course} exam has been published and is now
                available to students.
              </p>

              {/* Exam Details */}
              <div
                className={`mb-6 space-y-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <p className="text-lg">
                  <strong>Exam:</strong> {examData.name}
                </p>
                <p className="text-lg">
                  <strong>Subject:</strong> {examData.course}
                </p>
                <p className="text-lg">
                  <strong>Scheduled:</strong>{" "}
                  {formatDate(examData.scheduledDate)}
                </p>
                <p className="text-lg">
                  <strong>Duration:</strong> {examData.duration}
                </p>
                <p className="text-lg">
                  <strong>Questions:</strong> {examData.questions}
                </p>
                <p className="text-lg">
                  <strong>Total Marks:</strong> {examData.totalMarks}
                </p>
              </div>

              {/* Copy Exam Link */}
              <div className="mb-8 flex justify-center">
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  <FaCopy className="text-sm" />
                  <span>{copied ? "Copied!" : "Copy Exam Link"}</span>
                </button>
              </div>

              {/* Single Action Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleGoToDashboard}
                  className={`w-full max-w-md py-3 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? "bg-blue-600 text-black hover:bg-blue-700"
                      : "bg-blue-600 text-black hover:bg-blue-700"
                  }`}
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPublished;
