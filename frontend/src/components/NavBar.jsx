import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-purple-400 shadow-md">
      <div className="text-3xl font-bold">
        Launch<span className="text-3xl font-bold text-red-600">pad</span>
      </div>
      <div className="flex gap-4">
        <Link to="/">
          <button className="text-base font-medium bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Home
          </button>
        </Link>
        <Link to="/login">
          <button className="text-base font-medium bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
