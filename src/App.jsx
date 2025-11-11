import { Routes, Route } from "react-router-dom";
import CreateExamPage from "./dashboards/instructor-dashboards/CreateExamPage";
import ExamSettingsPage from "./dashboards/instructor-dashboards/ExamSettingsPage";
import Dashboard from "./dashboards/instructor-dashboards/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-exam" element={<CreateExamPage />} />
      <Route path="/exam-settings" element={<ExamSettingsPage />} />
    </Routes>
  );
}

export default App;
