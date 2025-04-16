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
      link: 'data:image/png;base64,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'
    },
    {
      title: 'EduVerse',
      desc: 'Immersive VR classrooms for interactive learning.',
      link: 'data:image/png;base64,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'
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
                      className="object-cover  w-full h-full"
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
