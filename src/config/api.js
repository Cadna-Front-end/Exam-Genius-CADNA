const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  VERIFY_2FA_LOGIN: '/api/auth/verify-2fa-login',
  SETUP_2FA: '/api/auth/setup-2fa',
  VERIFY_2FA_ENABLE: '/api/auth/verify-2fa-enable',
  REFRESH_TOKEN: '/api/auth/refresh',
  ME: '/api/auth/me',
  PROFILE: '/api/user/profile',
  UPDATE_PROFILE: '/api/user/profile',
  EXAMS: '/api/exams',
  EXAM_DETAILS: (id) => `/api/exams/${id}`,
  SUBMIT_EXAM: (id) => `/api/exams/${id}/submit`,
  RESULTS: '/api/results',
  RESULT_DETAILS: (id) => `/api/results/${id}`,
  START_EXAM_SESSION: '/api/exam/start-session',
  REFRESH_EXAM_TOKEN: '/api/exam/refresh-token',
  END_EXAM_SESSION: '/api/exam/end-session'
};

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    // Validate endpoint to prevent SSRF - only allow specific API paths
    if (!endpoint || typeof endpoint !== 'string' || !endpoint.startsWith('/api/')) {
      throw new Error('Invalid endpoint format');
    }
    
    // Additional validation for allowed endpoints
    const allowedPaths = ['/api/auth/', '/api/user/', '/api/exams/', '/api/results/', '/api/exam/'];
    const isAllowed = allowedPaths.some(path => endpoint.startsWith(path));
    if (!isAllowed) {
      throw new Error('Endpoint not allowed');
    }
    
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const config = {
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // CSRF protection
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401 && endpoint !== '/api/auth/refresh') {
          // Try to refresh token
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const refreshResponse = await fetch(`${this.baseURL}/api/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken })
              });
              
              if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                // Validate and sanitize token before storing
                if (refreshData.data && refreshData.data.accessToken && 
                    typeof refreshData.data.accessToken === 'string' &&
                    /^[a-zA-Z0-9._-]+$/.test(refreshData.data.accessToken)) {
                  localStorage.setItem('authToken', refreshData.data.accessToken);
                  
                  // Retry original request with new token
                  config.headers.Authorization = `Bearer ${refreshData.data.accessToken}`;
                  const retryResponse = await fetch(`${this.baseURL}${endpoint}`, config);
                  if (retryResponse.ok) {
                    return await retryResponse.json();
                  }
                }
              }
            } catch (refreshError) {
              console.warn('Token refresh failed:', refreshError.message);
            }
          }
        }
        
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.message && typeof errorData.message === 'string') {
            // Sanitize error message to prevent XSS
            errorMessage = errorData.message.replace(/[<>"'&]/g, '');
          }
        } catch (parseError) {
          console.warn('Failed to parse error response:', parseError.message);
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Request failed:', {
        endpoint,
        method: config.method || 'GET',
        status: error.status,
        message: error.message
      });
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);