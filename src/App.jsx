import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Signin from "./pages/signin/signin.jsx";
import TwoFactorAuth from "./pages/TwoFactorAuth.jsx";
import RoleSelector from "./pages/registration/RoleSelector.jsx";
import AccountDetails from "./pages/registration/accountdetails.jsx";
import PersonalInfo from "./pages/registration/personalinfo.jsx";
import SecurityAndFinalize from "./pages/registration/securityandfinalize.jsx";
import CreatingAccount from "./pages/registration/CreatingAccount.jsx";
import RegistrationComplete from "./pages/registration/RegistrationComplete.jsx";
import StudentDashboard from "./dashboards/studentdashboard/StudentDashboard.jsx";
import InstructorDashboard from "./dashboards/instructor-dashboards/Dashboard.jsx";
import CreateExamPage from "./dashboards/instructor-dashboards/CreateExamPage.jsx";
import AdminDashboard from "./dashboards/admindashboard/AdminDashboard.jsx";
import ExamTaking from "./pages/ExamTaking.jsx";
import StudentExams from "./pages/studentexams/StudentExams.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={
        <PublicRoute>
          <Signin />
        </PublicRoute>
      } />
      <Route path="/2fa" element={
        <PublicRoute>
          <TwoFactorAuth />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <RoleSelector />
        </PublicRoute>
      } />
      <Route path="/register/account" element={
        <PublicRoute>
          <AccountDetails />
        </PublicRoute>
      } />
      <Route path="/register/personal" element={
        <PublicRoute>
          <PersonalInfo />
        </PublicRoute>
      } />
      <Route path="/register/security" element={
        <PublicRoute>
          <SecurityAndFinalize />
        </PublicRoute>
      } />
      <Route path="/registration/creating" element={
        <PublicRoute>
          <CreatingAccount />
        </PublicRoute>
      } />
      <Route path="/registration/complete" element={
        <PublicRoute>
          <RegistrationComplete />
        </PublicRoute>
      } />
      <Route path="/student" element={
        <ProtectedRoute requiredRole="student">
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/student/exams" element={
        <ProtectedRoute requiredRole="student">
          <StudentExams />
        </ProtectedRoute>
      } />
      <Route path="/instructor" element={
        <ProtectedRoute requiredRole="instructor">
          <InstructorDashboard />
        </ProtectedRoute>
      } />
      <Route path="/create-exam" element={
        <ProtectedRoute requiredRole="instructor">
          <CreateExamPage />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/exam/:examId" element={
        <ProtectedRoute requiredRole="student">
          <ExamTaking />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </ErrorBoundary>
  );
}

export default App;