// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <Link to="/signup" className="text-gray-300 hover:text-white">
            SignUp
          </Link>
          <Link to="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-sm text-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Notification */}
        <button className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405M17 13V9a5 5 0 10-10 0v4L5.595 15.595M15 17v1a3 3 0 11-6 0v-1h6z" />
          </svg>
        </button>

        {/* Profile Image */}
        <img className="w-8 h-8 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
      </div>
    </nav>
  );
};

export default Navbar;
