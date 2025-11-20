import { Routes, Route } from "react-router-dom";
import { DarkModeProvider, useDarkMode } from "./contexts/DarkModeContext.jsx";
import { ExamProvider } from "./contexts/ExamContext"; // ADD THIS IMPORT
import Dashboard from "./dashboards/instructor-dashboards/Dashboard.jsx";
import CreateExamPage from "./dashboards/instructor-dashboards/CreateExamPage.jsx";
import ExamSettingsPage from "./dashboards/instructor-dashboards/ExamSettingsPage.jsx";
import ExamPublished from "./dashboards/instructor-dashboards/ExamPublished.jsx";
import Header from "./dashboards/instructor-dashboards/Header.jsx";

// Layout wrapper component to ensure consistent header across all pages
const PageLayout = ({ children, title = "Dashboard" }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header title={title} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

// Updated placeholder components with header and dark mode
const ExamsPage = () => {
  const { darkMode } = useDarkMode();
  return (
    <PageLayout title="Exams Management">
      <div
        className={`min-h-full ${
          darkMode ? "bg-[#0F1A28] text-white" : "bg-gray-50"
        }`}
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Exams Management</h1>
          <p>This page is under development.</p>
        </div>
      </div>
    </PageLayout>
  );
};

const QuestionBankPage = () => {
  const { darkMode } = useDarkMode();
  return (
    <PageLayout title="Question Bank">
      <div
        className={`min-h-full ${
          darkMode ? "bg-[#0F1A28] text-white" : "bg-gray-50"
        }`}
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Question Bank</h1>
          <p>This page is under development.</p>
        </div>
      </div>
    </PageLayout>
  );
};

const AnalyticsPage = () => {
  const { darkMode } = useDarkMode();
  return (
    <PageLayout title="Analytics">
      <div
        className={`min-h-full ${
          darkMode ? "bg-[#0F1A28] text-white" : "bg-gray-50"
        }`}
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Analytics</h1>
          <p>This page is under development.</p>
        </div>
      </div>
    </PageLayout>
  );
};

const SettingsPage = () => {
  const { darkMode } = useDarkMode();
  return (
    <PageLayout title="Settings">
      <div
        className={`min-h-full ${
          darkMode ? "bg-[#0F1A28] text-white" : "bg-gray-50"
        }`}
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <p>This page is under development.</p>
        </div>
      </div>
    </PageLayout>
  );
};

// Main App component
function App() {
  return (
    <DarkModeProvider>
      <ExamProvider>
        {" "}
        {/* ADD THIS WRAPPER */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-exam" element={<CreateExamPage />} />
          <Route path="/exam-settings" element={<ExamSettingsPage />} />
          <Route path="/exam-published" element={<ExamPublished />} />
          {/* Add these routes to match your sidebar */}
          <Route path="/dashboard/instructor" element={<Dashboard />} />
          <Route path="/dashboard/instructor/exams" element={<ExamsPage />} />
          <Route
            path="/dashboard/instructor/questions"
            element={<QuestionBankPage />}
          />
          <Route
            path="/dashboard/instructor/analytics"
            element={<AnalyticsPage />}
          />
          <Route
            path="/dashboard/instructor/settings"
            element={<SettingsPage />}
          />
        </Routes>
      </ExamProvider>{" "}
      {/* CLOSE THE WRAPPER */}
    </DarkModeProvider>
  );
}

export default App;
