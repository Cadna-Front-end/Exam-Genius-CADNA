import { createContext, useContext, useState, useEffect } from "react";
import { apiClient, API_ENDPOINTS } from "../config/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.email && parsedUser.role) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
      console.log('Login response:', response);
      
      let token, userData;
      
      if (response.token) {
        token = response.token;
        userData = response.user || response.data;
      } else if (response.accessToken) {
        token = response.accessToken;
        userData = response.user || response.data;
      } else if (response.data) {
        token = response.data.token || response.data.accessToken;
        userData = response.data.user || response.data;
      }
      
      if (!token || !userData) {
        throw new Error('Could not find token or user data in response');
      }
      
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
      return { success: true, data: response };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};