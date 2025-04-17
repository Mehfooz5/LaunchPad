import React from 'react';
import { useNavigate } from 'react-router-dom';

const InvestorProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data if needed (like localStorage/session)
    navigate('/');
  };

  const handleExploreStartups = () => {
    // Redirect to explore startups page
    navigate('/explore-startups');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Investor Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-semibold">Investor Dashboard</div>
        <div className="flex gap-4">
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
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Welcome, Investor!</h2>
        <p className="text-gray-700">
          Use the navigation above to explore startup pitches, manage your profile, or logout.
        </p>
      </div>
    </div>
  );
};

export default InvestorProfile;
