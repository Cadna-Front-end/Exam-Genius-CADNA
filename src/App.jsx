import { Routes, Route } from "react-router-dom";
import CreateExamPage from "./dashboards/instructor-dashboards/CreateExamPage";
import ExamSettingsPage from "./dashboards/instructor-dashboards/ExamSettingsPage";
import Dashboard from "./dashboards/instructor-dashboards/Dashboard";

// Temporary placeholder components
const ExamsPage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Exams Management</h1>
    <p>This page is under development.</p>
  </div>
);

const QuestionBankPage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Question Bank</h1>
    <p>This page is under development.</p>
  </div>
);

const AnalyticsPage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Analytics</h1>
    <p>This page is under development.</p>
  </div>
);

const SettingsPage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <p>This page is under development.</p>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-exam" element={<CreateExamPage />} />
      <Route path="/exam-settings" element={<ExamSettingsPage />} />

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
      <Route path="/dashboard/instructor/settings" element={<SettingsPage />} />
    </Routes>
  );
}

export default App;
