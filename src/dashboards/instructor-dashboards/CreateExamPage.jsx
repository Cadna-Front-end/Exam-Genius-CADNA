import Sidebar from "./Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { FiArrowLeft, FiUpload, FiX, FiEye, FiCheck } from "react-icons/fi";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export default function CreateExamPage() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [importedQuestion, setImportedQuestion] = useState(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const [examData, setExamData] = useState({
    title: "",
    description:
      "1-4, Please include all necessary instructions here, save warnings, deliver requests, and any specific gadget grants for usations.",
    language: "english", // Default to English
    subject: "",
    passingThreshold: "",
    examDate: "03/04/2022",
    startTime: "",
    endTime: "",
  });

  // French translations
  const translations = {
    english: {
      title: "Create New Exam",
      subtitle:
        "Import questions from your question bank to include in this exam",
      examTitle: "Exam Title",
      examDescription: "Exam Description",
      examLanguage: "Exam Language",
      subject: "Subject",
      passingThreshold: "Passing Threshold",
      examDate: "Exam Date",
      startTime: "Exam Start Time",
      endTime: "Exam End Time",
      questions: "Questions",
      importFromBank: "Import From Question Bank",
      importedQuestion: "Imported Question",
      removeQuestion: "Remove question",
      viewQuestion: "View question",
      importSuccess:
        "You have successfully imported 1 question. Remove this question to import a different one.",
      importButton: "Import Questions",
      importClick: "Click to import questions from your question bank",
      proceedButton: "Proceed to Exam Settings",
      importToProceed: "Import Questions to Proceed",
      importModalTitle: "Import Questions",
      selectQuestion: "Select Question",
      importDescription:
        "You can import one question at a time. After importing, you can remove it to import a different question.",
      importingText: "Importing question please wait...",
      importingSubtext: "This may take a few seconds",
      cancel: "Cancel",
      importQuestion: "Import Question",
      selectPlaceholder: "Select a question...",
      enterExamTitle: "Enter exam title",
      thresholdPlaceholder: "e.g., 70",
      selectLanguage: "Select Language",
      english: "English",
      french: "French",
    },
    french: {
      title: "Créer un Nouvel Examen",
      subtitle:
        "Importez des questions de votre banque de questions pour les inclure dans cet examen",
      examTitle: "Titre de l'Examen",
      examDescription: "Description de l'Examen",
      examLanguage: "Langue de l'Examen",
      subject: "Matière",
      passingThreshold: "Seuil de Réussite",
      examDate: "Date de l'Examen",
      startTime: "Heure de Début de l'Examen",
      endTime: "Heure de Fin de l'Examen",
      questions: "Questions",
      importFromBank: "Importer depuis la Banque de Questions",
      importedQuestion: "Question Importée",
      removeQuestion: "Supprimer la question",
      viewQuestion: "Voir la question",
      importSuccess:
        "Vous avez importé 1 question avec succès. Supprimez cette question pour en importer une différente.",
      importButton: "Importer des Questions",
      importClick:
        "Cliquez pour importer des questions de votre banque de questions",
      proceedButton: "Passer aux Paramètres de l'Examen",
      importToProceed: "Importer des Questions pour Continuer",
      importModalTitle: "Importer des Questions",
      selectQuestion: "Sélectionner une Question",
      importDescription:
        "Vous pouvez importer une question à la fois. Après l'importation, vous pouvez la supprimer pour en importer une différente.",
      importingText: "Importation de la question en cours...",
      importingSubtext: "Cela peut prendre quelques secondes",
      cancel: "Annuler",
      importQuestion: "Importer la Question",
      selectPlaceholder: "Sélectionner une question...",
      enterExamTitle: "Entrez le titre de l'examen",
      thresholdPlaceholder: "ex., 70",
      selectLanguage: "Sélectionner la Langue",
      english: "Anglais",
      french: "Français",
    },
  };

  const t = translations[examData.language];

  const handleInputChange = (field, value) => {
    setExamData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Updated question data with more details
  const questionBank = [
    {
      id: 1,
      title: "CSS208 - Advanced Web Development",
      subject: "CSS208",
      questions: 25,
      duration: "2 hours",
      totalMarks: 100,
      studentsEnrolled: 45,
    },
    {
      id: 2,
      title: "FNB401 - Financial Banking Systems",
      subject: "FNB401",
      questions: 30,
      duration: "2.5 hours",
      totalMarks: 120,
      studentsEnrolled: 38,
    },
    {
      id: 3,
      title: "CALCULUS - Differential Equations",
      subject: "CALCULUS",
      questions: 20,
      duration: "1.5 hours",
      totalMarks: 80,
      studentsEnrolled: 52,
    },
  ];

  const handleOpenImportModal = () => {
    // Don't open modal if already imported a question
    if (importedQuestion) {
      return;
    }
    setShowImportModal(true);
    setSelectedQuestion("");
  };

  const handleCloseImportModal = () => {
    setShowImportModal(false);
    setImporting(false);
    setSelectedQuestion("");
  };

  const handleImportQuestion = () => {
    if (!selectedQuestion) {
      alert(
        examData.language === "english"
          ? "Please select a question first"
          : "Veuillez d'abord sélectionner une question"
      );
      return;
    }

    setImporting(true);

    // Simulate import process
    setTimeout(() => {
      const imported = questionBank.find((q) => q.title === selectedQuestion);
      setImportedQuestion(imported);

      // Auto-fill the subject field with the imported subject
      if (imported) {
        setExamData((prev) => ({
          ...prev,
          subject: imported.subject,
        }));
      }

      setImportSuccess(true);
      setImporting(false);
      setShowImportModal(false);
    }, 2000);
  };

  const handleRemoveImportedQuestion = () => {
    setImportedQuestion(null);
    setImportSuccess(false);
    // Clear the subject field when removing imported question
    setExamData((prev) => ({
      ...prev,
      subject: "",
    }));
  };

  const handleViewQuestion = () => {
    if (importedQuestion) {
      alert(
        examData.language === "english"
          ? `Viewing: ${importedQuestion.title}`
          : `Visualisation: ${importedQuestion.title}`
      );
    }
  };

  const handleProceedToSettings = () => {
    if (importSuccess) {
      // Get the subject from the imported question or user input
      const subject = importedQuestion?.subject || examData.subject;

      // Create exam data with the actual subject and imported question details
      const examDataToPass = {
        name: examData.title || "Final Examination",
        course: subject, // This will be the actual subject (CSS208, FNB401, CALCULUS, etc.)
        scheduledDate:
          `${examData.examDate}T${examData.startTime}:00` ||
          "2025-10-10T14:00:00",
        duration: importedQuestion?.duration || "2 hours",
        studentsEnrolled: importedQuestion?.studentsEnrolled || 45,
        questions: importedQuestion?.questions || 25,
        totalMarks: importedQuestion?.totalMarks || 100,
        importedFrom: importedQuestion?.title,
      };

      navigate("/exam-settings", {
        state: { examData: examDataToPass },
      });
    }
  };

  return (
    <div
      className={`h-screen flex flex-col ${
        darkMode ? "bg-[#0F1A28] text-white" : "bg-[#f9fafb]"
      }`}
    >
      <Header title={t.title} />

      {/* HAMBURGER MENU - Same as Dashboard */}
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
        {/* SIDEBAR - Same structure as Dashboard */}
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

        {/* MAIN CONTENT - Same structure as Dashboard */}
        <div
          className={`flex-1 p-4 sm:p-6 overflow-auto w-full ${
            darkMode ? "bg-[#0F1A28]" : ""
          }`}
        >
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
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
                  {t.title}
                </h1>
                <p
                  className={`mt-1 text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {t.subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Exam Title Section */}
            <div
              className={`p-6 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {t.examTitle}
              </h2>

              <input
                type="text"
                value={examData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder={t.enterExamTitle}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            {/* Exam Description Section */}
            <div
              className={`p-6 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {t.examDescription}
              </h2>

              <textarea
                value={examData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            {/* Form Fields Grid */}
            <div
              className={`p-6 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exam Language */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-3 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.examLanguage}
                  </label>
                  <select
                    value={examData.language}
                    onChange={(e) =>
                      handleInputChange("language", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="english">{t.english}</option>
                    <option value="french">{t.french}</option>
                  </select>
                </div>

                {/* Subject - Changed to text input */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-3 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.subject}
                  </label>
                  <input
                    type="text"
                    value={examData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    placeholder={t.subject}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                {/* Passing Threshold */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-3 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.passingThreshold}
                  </label>
                  <input
                    type="number"
                    value={examData.passingThreshold}
                    onChange={(e) =>
                      handleInputChange("passingThreshold", e.target.value)
                    }
                    placeholder={t.thresholdPlaceholder}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                {/* Exam Date */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-3 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.examDate}
                  </label>
                  <input
                    type="text"
                    value={examData.examDate}
                    onChange={(e) =>
                      handleInputChange("examDate", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                {/* Exam Start Time */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-3 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.startTime}
                  </label>
                  <input
                    type="time"
                    value={examData.startTime}
                    onChange={(e) =>
                      handleInputChange("startTime", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                {/* Exam End Time */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-3 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t.endTime}
                  </label>
                  <input
                    type="time"
                    value={examData.endTime}
                    onChange={(e) =>
                      handleInputChange("endTime", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div
              className={`p-6 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {t.questions}
              </h2>

              {/* Import From Question Bank */}
              <div className="mb-6">
                <h3
                  className={`font-medium mb-3 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {t.importFromBank}
                </h3>

                {/* Subject tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm border font-medium ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-300"
                        : "bg-gray-100 border-gray-300 text-gray-700"
                    }`}
                  >
                    CSS208
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm border font-medium ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-300"
                        : "bg-gray-100 border-gray-300 text-gray-700"
                    }`}
                  >
                    FNB401
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm border font-medium ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-300"
                        : "bg-gray-100 border-gray-300 text-gray-700"
                    }`}
                  >
                    CALCULUS
                  </span>
                </div>
              </div>

              {/* Question Display Area */}
              <div
                className={`min-h-[200px] rounded-lg border-2 ${
                  importedQuestion ? "border-solid" : "border-dashed"
                } flex flex-col items-center justify-center p-8 ${
                  darkMode
                    ? importedQuestion
                      ? "bg-gray-800 border-gray-600"
                      : "bg-gray-700 border-gray-600 text-gray-400"
                    : importedQuestion
                    ? "bg-white border-gray-300"
                    : "bg-gray-50 border-gray-300 text-gray-500"
                }`}
              >
                {importedQuestion ? (
                  // Display imported question
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className={`text-lg font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {t.importedQuestion}
                      </h3>
                      <button
                        onClick={handleRemoveImportedQuestion}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode
                            ? "text-red-400 hover:bg-red-900/30"
                            : "text-red-600 hover:bg-red-100"
                        }`}
                        title={t.removeQuestion}
                      >
                        <FiX className="text-lg" />
                      </button>
                    </div>

                    <div
                      className={`p-4 rounded-lg border ${
                        darkMode
                          ? "bg-green-900/20 border-green-800"
                          : "bg-green-50 border-green-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-1 rounded-full ${
                              darkMode ? "bg-green-800" : "bg-green-100"
                            }`}
                          >
                            <FiCheck
                              className={`text-lg ${
                                darkMode ? "text-green-300" : "text-green-600"
                              }`}
                            />
                          </div>
                          <div>
                            <span
                              className={`font-medium ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {importedQuestion.subject}
                            </span>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {importedQuestion.title}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleViewQuestion}
                            className={`p-2 rounded-lg transition-colors ${
                              darkMode
                                ? "text-blue-400 hover:bg-blue-900/30"
                                : "text-blue-600 hover:bg-blue-100"
                            }`}
                            title={t.viewQuestion}
                          >
                            <FiEye className="text-lg" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {t.importSuccess}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Empty state - show import button
                  <>
                    <button
                      type="button"
                      onClick={handleOpenImportModal}
                      className={`flex items-center gap-3 px-6 py-3 rounded-lg border transition-all duration-200 mb-4 ${
                        darkMode
                          ? "bg-gray-600 border-gray-500 text-gray-300 hover:bg-gray-500 hover:shadow-lg"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-lg"
                      }`}
                    >
                      <FiUpload className="text-lg" />
                      {t.importButton}
                    </button>

                    <p className="text-center text-sm">{t.importClick}</p>
                  </>
                )}
              </div>
            </div>

            {/* Proceed to Exam Settings Button */}
            <button
              type="button"
              onClick={handleProceedToSettings}
              className={`w-full py-4 rounded-lg text-center transition-all duration-200 font-semibold text-lg ${
                importSuccess
                  ? darkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                  : darkMode
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!importSuccess}
            >
              {importSuccess ? t.proceedButton : t.importToProceed}
            </button>
          </div>

          {/* Import Questions Modal */}
          {showImportModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div
                className={`rounded-lg shadow-xl max-w-md w-full mx-auto ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                {/* Modal Header */}
                <div
                  className={`flex items-center justify-between p-6 border-b ${
                    darkMode ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {t.importModalTitle}
                  </h3>
                  <button
                    onClick={handleCloseImportModal}
                    className={`transition-colors ${
                      darkMode
                        ? "text-gray-400 hover:text-gray-200"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    disabled={importing}
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {importing ? (
                    <div className="text-center py-8">
                      <div className="flex justify-center items-center mb-4">
                        <div className="relative">
                          <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
                          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full animate-ping"></div>
                        </div>
                      </div>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {t.importingText}
                      </p>
                      <p
                        className={`text-sm mt-2 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {t.importingSubtext}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            darkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          {t.selectQuestion}
                        </label>
                        <select
                          value={selectedQuestion}
                          onChange={(e) => setSelectedQuestion(e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        >
                          <option value="">{t.selectPlaceholder}</option>
                          {questionBank.map((question) => (
                            <option key={question.id} value={question.title}>
                              {question.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div
                        className={`p-4 rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-gray-300"
                            : "bg-gray-50 border-gray-200 text-gray-600"
                        }`}
                      >
                        <p className="text-sm">{t.importDescription}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                {!importing && (
                  <div
                    className={`flex justify-end space-x-3 p-6 border-t ${
                      darkMode ? "border-gray-600" : "border-gray-200"
                    }`}
                  >
                    <button
                      onClick={handleCloseImportModal}
                      className={`px-6 py-2 transition-colors font-medium ${
                        darkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {t.cancel}
                    </button>
                    <button
                      onClick={handleImportQuestion}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      disabled={!selectedQuestion}
                    >
                      {t.importQuestion}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
