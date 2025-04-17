import React from 'react';
import { useNavigate } from 'react-router-dom';

const FounderProfile = () => {
  const navigate = useNavigate();

  const handleAddStartup = () => {
    navigate('/founder-profile-startup');
  };

  const handleLogout = () => {
    // Clear auth data if needed (like localStorage/session)
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Founder Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg mb-4">Welcome! Manage your profile and startups here.</p>

        <button
          onClick={handleAddStartup}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add / Promote New Startup
        </button>
      </div>
    </div>
  );
};

export default FounderProfile;
