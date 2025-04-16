import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function LaunchPadLanding() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Pitches',
        data: [50, 75, 60, 90, 120, 100],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Pitches per Month' },
    },
  };

  const featured = [
    {
      title: 'EcoDrive',
      desc: 'AI-powered route optimization for delivery fleets.',
      link: 'https://images.stockcake.com/public/8/f/f/8ffe74fd-c897-4c83-b9d4-9c46abb269f6_large/vr-classroom-experience-stockcake.jpg'
    },
    {
      title: 'HealthSync',
      desc: 'Telehealth platform connecting rural clinics.',
      // no link provided, will use placeholder
    },
    {
      title: 'EduVerse',
      desc: 'Immersive VR classrooms for interactive learning.',
      // no link provided, will use placeholder
    },
  ];

  const stats = [
    { value: '120+', label: 'Startups Launched' },
    { value: '850+', label: 'Pitches Made' },
    { value: '300+', label: 'Investors' },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <header className="bg-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to LaunchPad</h1>
        <p className="text-lg max-w-xl mx-auto">
          Discover, pitch, and fund the next generation of startups—all in one place.
        </p>
      </header>

      {/* Stats */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx}>
              <div className="text-3xl font-semibold">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Startups */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Startups</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((f, idx) => (
            <div key={idx} className="bg-gray-100 rounded-2xl shadow p-4">
              <div className="h-40 bg-gray-300 rounded mb-4 overflow-hidden flex items-center justify-center">
                {f.link
                  ? <img
                      src={f.link}
                      alt={f.title}
                      className="object-cover w-full h-full"
                    />
                  : <span className="text-gray-500">No Image</span>
                }
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chart */}
      <section className="py-12 px-6">
        <div className="max-w-xl mx-auto">
          <Bar data={data} options={options} />
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-white py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Pitch?</h2>
        <p className="mb-6">Join hundreds of founders and investors on LaunchPad today.</p>
        <button className="bg-blue-600 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-700 transition">
          Get Started
        </button>
      </footer>
    </div>
  );
}
