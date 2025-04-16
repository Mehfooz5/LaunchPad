import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-purple-500 shadow-md">
      <div className="text-4xl font-bold">Launch<span className='text-4xl text-yellow-400 font-bold '>pad</span></div>
      
      <Link to="/login">
        <button className="text-base font-medium bg-yellow-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Login
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;
