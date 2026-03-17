import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, API_HEADERS } from '../config/api.config';
import { setupInterceptors } from '../config/api.config';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: API_HEADERS,
});

// Setup request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Setup response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Setup interceptors for logging and error handling
setupInterceptors(api);

// Orders API
export const ordersAPI = {
  getAll: (dateFilter) => {
    const url = dateFilter ? `/orders?dateFilter=${dateFilter}` : '/orders';
    console.log('API: Getting orders with filter:', dateFilter);
    return api.get(url);
  },
  getById: (id) => {
    console.log('API: Getting order by ID:', id);
    return api.get(`/orders/${id}`);
  },
  create: (data) => {
    console.log('API: Creating order:', data);
    return api.post('/orders', data);
  },
  update: (id, data) => {
    console.log('API: Updating order:', id, data);
    return api.put(`/orders/${id}`, data);
  },
  delete: (id) => {
    console.log('API: Deleting order:', id);
    return api.delete(`/orders/${id}`);
  }
};

// Widgets API
export const widgetsAPI = {
  getAll: () => {
    console.log('API: Getting all widgets');
    return api.get('/widgets');
  },
  create: (widgetData) => {
    console.log('API: Creating widget:', widgetData);
    return api.post('/widgets', widgetData);
  },
  update: (widgetId, widgetData) => {
    console.log('API: Updating widget:', widgetId, widgetData);
    return api.put(`/widgets/${widgetId}`, widgetData);
  },
  delete: (widgetId) => {
    console.log('API: Deleting widget:', widgetId);
    return api.delete(`/widgets/${widgetId}`);
  }
};

// Dashboard API
export const dashboardAPI = {
  get: () => {
    console.log('API: Getting dashboard configuration');
    return api.get('/dashboard');
  },
  save: (data) => {
    console.log('API: Saving dashboard configuration:', data);
    console.log('API: Data being sent:', JSON.stringify(data, null, 2));
    return api.post('/dashboard', data);
  },
  update: (data) => {
    console.log('API: Updating dashboard configuration:', data);
    return api.put('/dashboard', data);
  },
};

export default api;
