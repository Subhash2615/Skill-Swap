import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Avatar } from './ui';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (!user) {
    return (
      <nav className="bg-white shadow-soft border-b border-neutral-200">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-soft border-b border-neutral-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              SkillSwap
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/dashboard">
              <div className={`nav-link ${isActive('/dashboard') ? 'nav-link-active' : 'nav-link-inactive'}`}>
                Dashboard
              </div>
            </Link>
            <Link to="/matches">
              <div className={`nav-link ${isActive('/matches') ? 'nav-link-active' : 'nav-link-inactive'}`}>
                Matches
              </div>
            </Link>
            <Link to="/requests">
              <div className={`nav-link ${isActive('/requests') ? 'nav-link-active' : 'nav-link-inactive'}`}>
                Requests
              </div>
            </Link>
            <Link to="/connections">
              <div className={`nav-link ${isActive('/connections') ? 'nav-link-active' : 'nav-link-inactive'}`}>
                Connections
              </div>
            </Link>
            <Link to="/appointments">
              <div className={`nav-link ${isActive('/appointments') ? 'nav-link-active' : 'nav-link-inactive'}`}>
                Appointments
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Avatar name={user.name} size="sm" />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                <p className="text-xs text-neutral-500">{user.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;