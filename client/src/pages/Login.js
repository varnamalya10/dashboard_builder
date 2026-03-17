import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authAPI from '../services/authAPI';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      if (response.token) {
        login(response.user, response.token);
        navigate('/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome 
        </h2>
        
        <form onSubmit={handleSubmit} className="bg-blue-600 p-6 rounded-xl space-y-4 w-full">
          {error && (
            <div className="text-red-200 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm text-blue-100 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-white text-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm text-blue-100 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-white text-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-blue-600 hover:underline">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Create one here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
