import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isInvestor = location.pathname === '/investor-profile';
  const isFounder = location.pathname === '/founder-profile';
  const isAboutUs = location.pathname === '/about-us';

  const handleLogout = async () => {
    try {
      await API.post('/logout');
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleExploreStartups = () => {
    navigate('/explore-startups');
  };

  const handleAddStartup = () => {
    navigate('/add-startup');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] shadow-lg z-50 px-8 py-4 flex justify-between items-center backdrop-blur-sm">
      {/* Logo */}
      <Link to="/" className="text-3xl font-extrabold text-white tracking-wide hover:scale-105 transition-transform duration-200">
        🚀 Launch<span className="text-yellow-300">Pad</span>
      </Link>

      {/* Buttons */}
      <div className="flex gap-4 items-center">
        {isHome && (
          <>
          <Link to="/about-us">
            <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition">
              AboutUs
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition">
              Login
            </button>
          </Link>
        </>
          
        )}

        {isInvestor && (
          <>
            <button
              onClick={handleExploreStartups}
              className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition"
            >
              Explore Startups
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}

        {isFounder && (
          <>
            <button
              onClick={handleAddStartup}
              className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-purple-100 transition"
            >
              Add Startup
            </button>
            <button
              onClick={handleExploreStartups}
              className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition"
            >
              Explore Other Startups
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}

        {isAboutUs && (
          <>
            <Link to="/">
            <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition">
              Home
            </button>
            </Link>
            <Link to="/login">
            <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition">
              Login
            </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
