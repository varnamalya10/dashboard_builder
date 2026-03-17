// API Configuration
import { DASHBOARD_CONFIG } from './dashboard.config';

// API Endpoints
export const API_ENDPOINTS = {
  // Dashboard endpoints
  DASHBOARD: {
    GET: `${DASHBOARD_CONFIG.API.BASE_URL}/dashboard`,
    SAVE: `${DASHBOARD_CONFIG.API.BASE_URL}/dashboard`,
    UPDATE: `${DASHBOARD_CONFIG.API.BASE_URL}/dashboard/:id`,
    DELETE: `${DASHBOARD_CONFIG.API.BASE_URL}/dashboard/:id`,
  },

  // Order endpoints
  ORDERS: {
    GET_ALL: `${DASHBOARD_CONFIG.API.BASE_URL}/orders`,
    GET_BY_ID: `${DASHBOARD_CONFIG.API.BASE_URL}/orders/:id`,
    CREATE: `${DASHBOARD_CONFIG.API.BASE_URL}/orders`,
    UPDATE: `${DASHBOARD_CONFIG.API.BASE_URL}/orders/:id`,
    DELETE: `${DASHBOARD_CONFIG.API.BASE_URL}/orders/:id`,
  },

  // Authentication endpoints (future)
  AUTH: {
    REGISTER: `${DASHBOARD_CONFIG.API.BASE_URL}/auth/register`,
    LOGIN: `${DASHBOARD_CONFIG.API.BASE_URL}/auth/login`,
    LOGOUT: `${DASHBOARD_CONFIG.API.BASE_URL}/auth/logout`,
    PROFILE: `${DASHBOARD_CONFIG.API.BASE_URL}/auth/profile`,
  },

  // Export endpoints (future)
  EXPORT: {
    PDF: `${DASHBOARD_CONFIG.API.BASE_URL}/export/pdf`,
    EXCEL: `${DASHBOARD_CONFIG.API.BASE_URL}/export/excel`,
    JSON: `${DASHBOARD_CONFIG.API.BASE_URL}/export/json`,
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
};

// Request Configuration
export const REQUEST_CONFIG = {
  TIMEOUT: DASHBOARD_CONFIG.API.TIMEOUT,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Export individual configuration parts for easier importing
export const API_BASE_URL = DASHBOARD_CONFIG.API.BASE_URL;
export const API_TIMEOUT = DASHBOARD_CONFIG.API.TIMEOUT;
export const API_HEADERS = REQUEST_CONFIG.HEADERS;

// Response Interceptors
export const setupInterceptors = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add request timestamp
      config.metadata = { startTime: new Date() };
      
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      const duration = new Date() - response.config.metadata.startTime;
      console.log(`✅ API Response: ${response.status} (${duration}ms) - ${response.config.url}`);
      return response;
    },
    (error) => {
      const duration = error.config?.metadata ? 
        new Date() - error.config.metadata.startTime : 0;
      
      console.error(`❌ API Error: ${error.response?.status} (${duration}ms) - ${error.config?.url}`);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
  );
};

// Default export
const apiConfig = {
  API_ENDPOINTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  REQUEST_CONFIG,
  API_BASE_URL,
  API_TIMEOUT,
  API_HEADERS,
  setupInterceptors,
};

export default apiConfig;
