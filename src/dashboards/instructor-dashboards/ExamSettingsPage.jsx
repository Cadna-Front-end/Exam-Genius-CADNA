import Sidebar from "./Sidebar";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ADD useLocation
import Header from "./Header";
import { FiArrowLeft } from "react-icons/fi";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function ExamSettingsPage() {
  const navigate = useNavigate();
  const location = useLocation(); // ADD this to receive data
  const { darkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Receive exam data from CreateExamPage
  const examData = location.state?.examData || {
    name: "Final Examination",
    course: "Mathematics",
    scheduledDate: "2025-10-10T14:00:00",
    duration: "2 hours",
    studentsEnrolled: 45,
    questions: 25,
    totalMarks: 100,
  };

  const [settings, setSettings] = useState({
    shuffleQuestions: false,
    shuffleOptions: false,
    aiProctoring: false,
    allowResume: false,
    gradingMethod: "automatic",
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleGradingMethodChange = (method) => {
    setSettings((prev) => ({
      ...prev,
      gradingMethod: method,
    }));
  };

  const handlePublishExam = () => {
    console.log("Publishing exam with data:", examData); // Debug log

    // Navigate to ExamPublished and pass the exam data
    navigate("/exam-published", {
      state: { examData },
    });
  };

  const handleBack = () => {
    navigate("/create-exam");
  };

  return (
    <div
      className={`h-screen flex flex-col ${
        darkMode ? "bg-[#0F1A28] text-white" : "bg-[#f9fafb]"
      }`}
    >
      <Header title="Exam Settings" />

      {/* HAMBURGER MENU - Same as Dashboard and CreateExamPage */}
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
        {/* SIDEBAR - Same structure as Dashboard and CreateExamPage */}
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

        {/* MAIN CONTENT - Same structure as Dashboard and CreateExamPage */}
        <div
          className={`flex-1 p-4 sm:p-6 overflow-auto w-full ${
            darkMode ? "bg-[#0F1A28]" : ""
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                {/* Consistent Back Button - Same as CreateExamPage */}
                <button
                  onClick={handleBack}
                  className={`p-2 rounded-lg border transition-colors ${
                    darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FiArrowLeft className="text-lg" />
                </button>

                <div>
                  <h1
                    className={`text-2xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Exam Settings
                  </h1>
                  <p
                    className={`mt-1 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Configure your exam settings and preferences
                  </p>
                  {/* Show the subject being configured */}
                  <p
                    className={`mt-1 text-sm font-medium ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    Subject: {examData.course}
                  </p>
                </div>
              </div>
            </div>

            {/* Settings Options */}
            <div className="space-y-6">
              {/* Shuffle Questions */}
              <div
                className={`p-6 rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Shuffle Questions
                    </h3>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Randomize the order of questions for each student.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("shuffleQuestions")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.shuffleQuestions
                        ? "bg-blue-600"
                        : darkMode
                        ? "bg-gray-600"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.shuffleQuestions
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Shuffle Options */}
              <div
                className={`p-6 rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Shuffle Options
                    </h3>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Randomize the order of options within each question.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("shuffleOptions")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.shuffleOptions
                        ? "bg-blue-600"
                        : darkMode
                        ? "bg-gray-600"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.shuffleOptions
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Enable AI Proctoring */}
              <div
                className={`p-6 rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Enable AI Proctoring
                    </h3>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Enable AI-powered proctoring to monitor student behavior
                      during the exam.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("aiProctoring")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.aiProctoring
                        ? "bg-blue-600"
                        : darkMode
                        ? "bg-gray-600"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.aiProctoring
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Allow Resume After Disconnect */}
              <div
                className={`p-6 rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Allow Resume After Disconnect
                    </h3>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Allow students to resume the exam if they get
                      disconnected.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("allowResume")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.allowResume
                        ? "bg-blue-600"
                        : darkMode
                        ? "bg-gray-600"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.allowResume ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Grading Method - Dropdown */}
              <div
                className={`p-6 rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Grading Method
                    </h3>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Choose between automatic grading or manual grading by
                      instructors.
                    </p>
                  </div>
                </div>

                {/* Dropdown for Grading Method */}
                <div className="mt-4">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Select Grading Method
                  </label>
                  <select
                    value={settings.gradingMethod}
                    onChange={(e) => handleGradingMethodChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="automatic">Automatic Grading</option>
                    <option value="manual">Manual Grading</option>
                    <option value="semi-automatic">
                      Semi-Automatic Grading
                    </option>
                  </select>

                  {/* Description based on selection */}
                  <div className="mt-3">
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {settings.gradingMethod === "automatic" &&
                        "Answers will be automatically graded by the system."}
                      {settings.gradingMethod === "manual" &&
                        "Instructors will manually review and grade all submissions."}
                      {settings.gradingMethod === "semi-automatic" &&
                        "Multiple-choice questions are auto-graded, while open-ended questions require manual review."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Publish Exam Button */}
            <div className="mt-8">
              <button
                onClick={handlePublishExam}
                className={`w-full py-4 rounded-lg text-center transition-all duration-200 font-semibold text-lg ${
                  darkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                }`}
              >
                Publish Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
