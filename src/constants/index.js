// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor'
};

// Local storage keys - using environment-specific prefixes
const APP_PREFIX = import.meta.env.VITE_APP_PREFIX || 'app';
export const STORAGE_KEYS = {
  AUTH_TOKEN: `${APP_PREFIX}_authToken`,
  USER_DATA: `${APP_PREFIX}_userData`,
  TEMP_AUTH_TOKEN: `${APP_PREFIX}_tempAuthToken`,
  TEMP_USER_DATA: `${APP_PREFIX}_tempUserData`,
  REGISTRATION_DATA: `${APP_PREFIX}_registrationData`,
  REMEMBERED_EMAIL: `${APP_PREFIX}_rememberedEmail`
};

// Route paths
export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  TWO_FA: '/2fa',
  REGISTER: {
    ACCOUNT: '/register/account',
    PERSONAL: '/register/personal',
    SECURITY: '/register/security',
    SUCCESS: '/register/success'
  },
  DASHBOARD: {
    STUDENT: '/student',
    INSTRUCTOR: '/instructor',
    ADMIN: '/admin'
  }
};

// Route validation helper
export const isValidRoute = (route) => {
  const allRoutes = Object.values(ROUTES).flat();
  const nestedRoutes = Object.values(ROUTES.REGISTER).concat(Object.values(ROUTES.DASHBOARD));
  return allRoutes.includes(route) || nestedRoutes.includes(route);
};

// API status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};