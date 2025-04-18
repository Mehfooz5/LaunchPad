import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const StartupCards = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await API.get('/getStartups');
        setStartups(res.data || []);
      } catch (error) {
        console.error('Error fetching startups:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading startups…</p>;
  }

  return (
    <div className="p-6 mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {startups.length === 0 ? (
        <p className="col-span-full text-center text-gray-600">No startups available.</p>
      ) : (
        startups.map((s) => (
          <div
            key={s._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl overflow-hidden w-full flex flex-col"
          >
            {/* Video */}
            {s.pitch ? (
              <video
                controls
                className="w-full h-64 object-cover bg-black" // Taller video section
                src={`/${s.pitch}`}
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                No Pitch Video
              </div>
            )}

            {/* Content */}
            <div className="p-4 h-[90px]"> {/* Shorter content section */}
              <div>
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {s.title}
                </h3>

                {/* Founder Name */}
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 20.25a8.25 8.25 0 0115 0"
                    />
                  </svg>
                  <span>{s.founderId?.userId?.fullName || 'Unknown Founder'}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StartupCards;
