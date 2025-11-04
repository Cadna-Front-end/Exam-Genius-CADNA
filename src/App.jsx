import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Signin from "./pages/signin/signin.jsx";
import TwoFactorAuth from "./pages/TwoFactorAuth.jsx";
import AccountDetails from "./pages/registration/accountdetails.jsx";
import PersonalInfo from "./pages/registration/personalinfo.jsx";
import SecurityAndFinalize from "./pages/registration/securityandfinalize.jsx";
import RegistrationSuccess from "./pages/RegistrationSuccess.jsx";
import StudentDashboard from "./dashboards/studentdashboard/StudentDashboard.jsx";
import AdminDashboard from "./dashboards/admindashboard/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={
        <PublicRoute>
          <Signin />
        </PublicRoute>
      } />
      <Route path="/2fa" element={<TwoFactorAuth />} />
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
      <Route path="/register/success" element={
        <PublicRoute>
          <RegistrationSuccess />
        </PublicRoute>
      } />
      <Route path="/student/*" element={
        <ProtectedRoute requiredRole="student">
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/*" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;