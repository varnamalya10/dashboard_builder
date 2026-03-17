import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Settings, ShoppingCart, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 modern-transition">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary-600 modern-transition">
              Dashboard Builder
            </h1>
            {user && (
              <div className="flex space-x-4">
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 modern-transition ${
                    isActive('/dashboard')
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <BarChart3 size={18} />
                  <span className="font-semibold">Dashboard</span>
                </Link>
                <Link
                  to="/dashboard-config"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 modern-transition ${
                    isActive('/dashboard-config')
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Settings size={18} />
                  <span className="font-semibold">Configure</span>
                </Link>
                <Link
                  to="/orders"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 modern-transition ${
                    isActive('/orders')
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <ShoppingCart size={18} />
                  <span className="font-semibold">Orders</span>
                </Link>
              </div>
            )}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 modern-transition shadow-sm hover:shadow-md"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? (
                  <Moon size={18} />
                ) : (
                  <Sun size={18} />
                )}
                <span className="hidden sm:inline font-semibold">
                  {theme === 'light' ? '🌙' : '☀️'}
                </span>
              </button>
              
              {user && (
                <>
                  <span className="text-sm text-gray-600 dark:text-gray-300 mr-4 font-medium">Welcome, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 modern-transition shadow-sm hover:shadow-md"
                  >
                    <LogOut size={18} />
                    <span className="font-semibold">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
