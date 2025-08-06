import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // 1. Import the useAuth hook

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout, loading } = useAuth(); // 2. Get state from context

  // Base navigation links that are always visible
  const baseNavigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Booking', href: '/booking' },
    { name: 'Contact', href: '/contact' },
  ];

  // 3. Define JSX for different auth states
  const authLinks = (
    <>
      <span className="text-gray-700 font-medium px-3 py-2 text-sm hidden md:block">
        Hello, {user?.fullName}
      </span>
      <button
        onClick={logout}
        className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 transition-colors"
      >
        Logout
      </button>
    </>
  );

  const guestLinks = (
    <Link
      to="/login"
      className="px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-md hover:bg-blue-900 transition-colors"
    >
      Login
    </Link>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-900">
              <Crown className="h-8 w-8 text-yellow-600" />
              <span>Royal Banquet</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {baseNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-yellow-600 ${
                  location.pathname === item.href
                    ? 'text-yellow-600 border-b-2 border-yellow-600'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
             {/* 4. Conditionally render links based on auth state */}
            <div className="flex items-center space-x-4 pl-4">
              {!loading && (isAuthenticated ? authLinks : guestLinks)}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-yellow-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {baseNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors duration-200 hover:text-yellow-600 ${
                  location.pathname === item.href ? 'text-yellow-600 bg-yellow-50' : 'text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
             {/* 5. Conditionally render mobile links */}
            <div className="border-t my-2"></div>
            {!loading && (
              isAuthenticated ? (
                <div className="px-3 py-2">
                  <p className="text-base font-medium text-gray-700">Hello, {user?.fullName}</p>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="mt-2 w-full text-left block px-3 py-2 text-base font-medium text-gray-700 hover:text-yellow-600">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-yellow-600">
                  Login
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;