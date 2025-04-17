import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import API from '../api/API'; // make sure this path is correct based on your folder structure

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isInvestor = location.pathname === '/investor-profile';
  const isFounder = location.pathname === '/founder-profile';

  const handleLogout = async () => {
    try {
      // Optional: Hit logout endpoint (if your backend supports it)
      await API.get('/logout');

      // Clear auth-related storage
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // adjust key if different
      localStorage.clear(); // or use this to wipe all if needed

      // Navigate back to homepage
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleExploreStartups = () => {
    navigate('/explore-startups');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-teal-200 to-purple-300 shadow-md z-50 px-6 py-4 flex justify-between items-center">
      {/* Logo Always */}
      <Link to="/" className="text-2xl font-bold">
        🚀 LaunchPad
      </Link>

      {/* Right-hand buttons */}
      <div className="flex gap-4">
        {isHome && (
          <Link to="/login">
            <button className="text-blue-600 hover:underline">Login</button>
          </Link>
        )}

        {isInvestor && (
          <>
            <button
              onClick={handleExploreStartups}
              className="text-blue-600 hover:underline"
            >
              Explore Startups
            </button>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        )}

        {isFounder && (
          <>
            <Link to="/add-startup">
              <button className="text-blue-600 hover:underline">
                Add Startup
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;