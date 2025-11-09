import { STORAGE_KEYS } from '../constants';

// Safe localStorage operations with error handling
export const storage = {
  // Get item from localStorage
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },

  // Set item in localStorage
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  },

  // Remove item from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  },

  // Clear all auth-related data
  clearAuth() {
    this.remove(STORAGE_KEYS.AUTH_TOKEN);
    this.remove(STORAGE_KEYS.USER_DATA);
    this.remove(STORAGE_KEYS.TEMP_AUTH_TOKEN);
    this.remove(STORAGE_KEYS.TEMP_USER_DATA);
  },

  // Clear registration data
  clearRegistration() {
    this.remove(STORAGE_KEYS.REGISTRATION_DATA);
  }
};