import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">FakeNewsDetective</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/detect"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/detect' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Verify News
            </Link>
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-600">
                  <span>{user?.name}</span>
                  <User className="h-5 w-5" />
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl invisible group-hover:visible transition-all duration-200 opacity-0 group-hover:opacity-100">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/"
              className={`block text-base font-medium ${
                location.pathname === '/' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/detect"
              className={`block text-base font-medium ${
                location.pathname === '/detect' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Verify News
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className={`block text-base font-medium ${
                    location.pathname === '/profile' ? 'text-primary-600' : 'text-gray-700'
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left text-base font-medium text-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </div>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block text-base font-medium text-primary-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;