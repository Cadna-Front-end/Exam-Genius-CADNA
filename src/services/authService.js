import { apiClient, API_ENDPOINTS } from '../config/api';

export const authService = {
  async login(credentials) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async register(userData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async verifyTwoFA(code, token) {
    try {
      const response = await apiClient.post('/api/auth/verify-2fa', { code }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getProfile() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ME);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('tempAuthToken');
    localStorage.removeItem('tempUserData');
  }
};

export default authService;