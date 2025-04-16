// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // simulate login state

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Perform logout logic here
      setIsLoggedIn(false);
      navigate('/');
    } else {
      // Perform login logic or navigate to login
      navigate('/login');
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between rounded-md">
      {/* Left Section */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 00-8 8 8 8 0 0016 0A8 8 0 0010 2z"></path>
          </svg>
          <span className="font-semibold text-white text-lg">LaunchPad</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white font-medium hover:text-indigo-400 border-b-2 border-indigo-500 pb-1">
            Dashboard
          </Link>
          <Link to="#" className="text-gray-300 hover:text-white">
            Name
          </Link>
          <Link to="/explore" className="text-gray-300 hover:text-white">
            Explore
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Auth Button */}
        <button
          onClick={handleAuthClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
