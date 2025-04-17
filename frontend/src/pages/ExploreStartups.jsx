import React, { useEffect, useState } from 'react';
import API from '../api/axios'; // adjust the path as needed

const StartupCards = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await API.get('/startup'); // Your backend route for fetching all startups
        setStartups(res.data.startups || []);
      } catch (error) {
        console.error('Error fetching startups:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading startups...</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {startups.length === 0 ? (
        <p className="col-span-full text-center text-gray-600">No startups available.</p>
      ) : (
        startups.map((startup) => (
          <div
            key={startup._id}
            className="bg-white shadow-md rounded-2xl p-5 transition hover:shadow-xl border border-gray-200"
          >
            <h3 className="text-xl font-bold text-blue-700">{startup.title}</h3>
            <p className="text-sm text-gray-500 mb-2">Domain: {startup.domain}</p>
            <p className="text-gray-700 mb-4">{startup.description}</p>
            <p className="text-sm text-gray-600">Location: {startup.location || 'Unknown'}</p>
            <a
              href={startup.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Visit Website
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default StartupCards;
