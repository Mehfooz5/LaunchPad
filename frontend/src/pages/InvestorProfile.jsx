import React from 'react';

const InvestorProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
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
