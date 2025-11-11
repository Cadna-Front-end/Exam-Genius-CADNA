// Test credentials for development only - use environment variables
export const TEST_CREDENTIALS = {
  student: {
    email: import.meta.env.VITE_TEST_STUDENT_EMAIL || '',
    password: import.meta.env.VITE_TEST_STUDENT_PASSWORD || ''
  },
  admin: {
    email: import.meta.env.VITE_TEST_ADMIN_EMAIL || '',
    password: import.meta.env.VITE_TEST_ADMIN_PASSWORD || ''
  }
};

// Quick test function to populate login form
export const fillTestCredentials = (type = 'student') => {
  const credentials = TEST_CREDENTIALS[type] || TEST_CREDENTIALS.student;
  // Only return credentials if both email and password are available
  if (credentials.email && credentials.password) {
    return credentials;
  }
  return { email: '', password: '' };
};