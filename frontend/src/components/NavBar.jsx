import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-500 via-pink-400 to-red-400 shadow-md px-8 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <div className="text-3xl font-bold text-white tracking-wide">
        🚀 Launch<span className="text-yellow-200">Pad</span>
      </div>

      {/* Show Login button only on Home page */}
      {isHome && (
        <div className="flex gap-4">
          <Link to="/login">
            <button className="bg-white/20 text-white px-5 py-2 rounded-lg hover:bg-white/30 transition-all font-medium backdrop-blur-sm">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
