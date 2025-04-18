import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const FounderProfile = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await API.get('/getMyStartupProfile');
        setStartups(res.data);
        console.log('Startups:', res.data);
      } catch (err) {
        setError('Failed to load startups');
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6">Founder Dashboard</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : startups.length === 0 ? (
          <p className="text-gray-700">You haven’t added any startups yet.</p>
        ) : (
          <div className="space-y-6">
            {startups.map((startup, index) => (
              <div
                key={startup._id || index}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{startup.title}</h3>
                <p className="text-gray-700 mb-2">{startup.description}</p>

                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Domain:</strong> {startup.domain}</p>
                  <p><strong>Stage:</strong> {startup.stage}</p>
                  <p><strong>Location:</strong> {startup.location}</p>
                  <p><strong>Likes:</strong> {startup.likes} | <strong>Dislikes:</strong> {startup.dislikes}</p>

                  {startup.pitch && (
                    <p>
                      <strong>Pitch Video:</strong>{' '}
                      <a
                        href={`/${startup.pitch}`}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Pitch
                      </a>
                    </p>
                  )}

                  <div className="mt-2 pt-2 border-t border-gray-300">
                    <p><strong>Company:</strong> {startup.founderId?.companyName || 'N/A'}</p>
                    <p><strong>Bio:</strong> {startup.founderId?.bio || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FounderProfile;
