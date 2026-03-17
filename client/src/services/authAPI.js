import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      console.error('AuthAPI: Registration error:', error);
      throw error;
    }
  },

  // Login user and get token
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      console.error('AuthAPI: Login error:', error);
      throw error;
    }
  }
};

export default authAPI;
