import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authAPI from '../services/authAPI';
import { Mail, Lock, User } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (response.user) {
        login(response.user, response.token);
        navigate('/dashboard');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit} className="bg-blue-600 p-6 rounded-xl space-y-4 w-full">
          <div>
            <label htmlFor="name" className="block text-sm text-blue-100 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-white text-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>
          </div>

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
                autoComplete="email"
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
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-white text-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-blue-100 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-white text-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></span>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-blue-600 hover:underline">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
