import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen mt-12 bg-gray-50 py-12 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-10">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">About Us</h1>

        <p className="text-lg text-gray-700 mb-6">
          Welcome to <span className="font-semibold text-blue-600">LaunchPad</span>, your gateway to the startup ecosystem!
          We are a platform built to <span className="font-medium">empower founders</span> and connect them with
          potential investors, mentors, and early adopters.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">🌟 Our Mission</h2>
        <p className="text-gray-700 mb-6">
          To bridge the gap between visionary founders and forward-thinking investors by providing a streamlined,
          transparent, and opportunity-rich environment where ideas transform into thriving ventures.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">💡 What We Do</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>✅ Showcase Startups with detailed profiles and video pitches</li>
          <li>✅ Help investors explore high-potential startups</li>
          <li>✅ Smart matchmaking for startups and investors</li>
          <li>✅ Support for every stage: Idea to Revenue</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">👥 Who We Serve</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>📌 Founders – students, professionals, innovators</li>
          <li>📌 Investors – individuals, VCs, institutions</li>
          <li>📌 Mentors & Incubators – guides and supporters</li>
        </ul>

        <p className="text-center text-blue-700 font-semibold mt-8">
          Join us in shaping the future of innovation. <br />
          Let’s build, back, and bring ideas to life. 🚀
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
