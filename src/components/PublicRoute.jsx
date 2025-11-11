import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextDefinition.js";
import Loading from "./UI/Loading";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    // Define valid role-to-route mappings
    const roleRoutes = {
      admin: "/admin",
      instructor: "/instructor",
      student: "/student"
    };

    // Get redirect path with fallback to student dashboard
    const redirectPath = roleRoutes[user.role] || "/student";

    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PublicRoute;