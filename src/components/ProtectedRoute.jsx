import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextDefinition";
import Loading from "./UI/Loading";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Validate user role exists and handle invalid roles
    if (!user.role) {
      console.error('User role is missing or invalid');
      return <Navigate to="/signin" replace />;
    }
    
    const validRoles = ['admin', 'instructor', 'student'];
    if (!validRoles.includes(user.role)) {
      console.error('Invalid user role detected:', user.role);
      return <Navigate to="/signin" replace />;
    }
    
    const redirectPath = user.role === "instructor" ? "/instructor" : "/student";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;