import { useState, useEffect, useCallback } from "react";
import { apiClient, API_ENDPOINTS } from "../config/api";
import { AuthContext } from "./AuthContextDefinition.js";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const refreshAuthToken = useCallback(async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) return false;
      
      const response = await apiClient.post('/api/auth/refresh', { refreshToken: storedRefreshToken });
      if (response.success) {
        localStorage.setItem("authToken", response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
        return true;
      }
    } catch (error) {
      console.error('AuthContext: Token refresh failed', {
        timestamp: new Date().toISOString(),
        error: error.message || 'Unknown error',
        hasRefreshToken: !!localStorage.getItem("refreshToken")
      });
      logout();
    }
    return false;
  }, []);

  const checkTokenExpiration = (token) => {
    try {
      // amazonq-ignore-next-line
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp && payload.exp > currentTime;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("userData");
        
        if (token && userData) {
          // Quick token validation without API call
          if (checkTokenExpiration(token)) {
            const parsedUser = JSON.parse(userData);
            if (parsedUser && parsedUser.email && parsedUser.role) {
              setUser(parsedUser);
            } else {
              logout();
            }
          } else {
            // Token expired, try refresh in background
            const refreshed = await refreshAuthToken();
            if (!refreshed) logout();
          }
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, [refreshAuthToken]);

  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            if (payload.exp && payload.exp < currentTime) {
              logout();
            }
          } catch {
            logout();
          }
        }
      }, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Login failed');
      }
      

      
      const { user: userData, accessToken: token, twoFARequired, tempToken } = response.data;
      
      // If 2FA is required, store temp token and return 2FA flag
      if (twoFARequired) {
        localStorage.setItem("tempToken", tempToken);
        return { success: true, requiresTwoFA: true };
      }
      
      // Complete login without 2FA
      if (!token || !userData) {
        throw new Error('Invalid response from server');
      }
      
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      setUser(userData);
      
      return { success: true, requiresTwoFA: false };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const verifyTwoFA = async (code) => {
    try {
      const tempToken = localStorage.getItem("tempToken");
      
      if (!tempToken) {
        throw new Error('No pending 2FA verification');
      }
      
      const response = await apiClient.post('/api/auth/verify-2fa-login', { tempToken, code });
      
      if (!response.success) {
        throw new Error(response.message || '2FA verification failed');
      }
      
      const { user: userData, accessToken } = response.data;
      
      // Clear temp data
      localStorage.removeItem("tempToken");
      
      // Set authenticated user
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("userData", JSON.stringify(userData));
      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || '2FA verification failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
      
      if (!response.success) {
        throw new Error(response.message || 'Registration failed');
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, verifyTwoFA }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;