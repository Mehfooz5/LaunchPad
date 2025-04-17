import React from 'react';

const startups = [
  {
    id: 1,
    name: 'AgroSmart',
    domain: 'AgriTech',
    description: 'Connecting farmers with AI-powered crop solutions.',
    website: 'https://agrosmart.ai',
    founder: 'Riya Patil',
  },
  {
    id: 2,
    name: 'MediTrack',
    domain: 'HealthTech',
    description: 'Real-time patient monitoring and alert system.',
    website: 'https://meditrack.io',
    founder: 'Aarav Deshmukh',
  },
  {
    id: 3,
    name: 'EduVerse',
    domain: 'EdTech',
    description: 'Interactive learning platform for school students.',
    website: 'https://eduverse.in',
    founder: 'Sanya Kulkarni',
  },
];

const StartupCards = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {startups.map((startup) => (
        <div
          key={startup.id}
          className="bg-white shadow-md rounded-2xl p-5 transition hover:shadow-xl border border-gray-200"
        >
          <h3 className="text-xl font-bold text-blue-700">{startup.name}</h3>
          <p className="text-sm text-gray-500 mb-2">Domain: {startup.domain}</p>
          <p className="text-gray-700 mb-4">{startup.description}</p>
          <p className="text-sm text-gray-600">Founder: {startup.founder}</p>
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Visit Website
          </a>
        </div>
      ))}
    </div>
  );
};

export default StartupCards;
