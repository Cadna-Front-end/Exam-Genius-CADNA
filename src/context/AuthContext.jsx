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
      
      // Check if 2FA is enabled for this user
      if (userData.enableTwoFA) {
        // Store temporary data for 2FA verification
        localStorage.setItem("tempAuthToken", token);
        localStorage.setItem("tempUserData", JSON.stringify(userData));
        return { success: true, requiresTwoFA: true, userData };
      }
      
      // No 2FA required, complete login
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const verifyTwoFA = async (code) => {
    try {
      const tempToken = localStorage.getItem("tempAuthToken");
      const tempUserData = localStorage.getItem("tempUserData");
      
      if (!tempToken || !tempUserData) {
        throw new Error('No pending 2FA verification');
      }
      
      // Verify 2FA code with backend
      const response = await apiClient.post('/api/auth/verify-2fa', { code }, {
        headers: { Authorization: `Bearer ${tempToken}` }
      });
      
      if (response.success) {
        // 2FA verified, complete login
        const userData = JSON.parse(tempUserData);
        localStorage.setItem("authToken", tempToken);
        localStorage.setItem("userData", tempUserData);
        localStorage.removeItem("tempAuthToken");
        localStorage.removeItem("tempUserData");
        setUser(userData);
        
        return { success: true };
      } else {
        return { success: false, error: 'Invalid verification code' };
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      return { success: false, error: error.message || '2FA verification failed' };
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
    <AuthContext.Provider value={{ user, login, register, logout, verifyTwoFA, loading }}>
      {children}
    </AuthContext.Provider>
  );
};