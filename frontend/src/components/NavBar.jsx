import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome     = location.pathname === '/';
  const isInvestor = location.pathname === '/investor-profile';
  const isFounder  = location.pathname === '/founder-profile';

  const handleLogout = () => {
    // TODO: clear auth storage
    navigate('/');
  };

  const handleExploreStartups = () => {
    navigate('/explore-startups');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-6 py-4 flex justify-between items-center">
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
            <Link to="/founder-profile-startup">
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
