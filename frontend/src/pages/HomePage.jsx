import React from 'react';
import Footer from '../components/Footer';
import { FaUsers, FaBriefcase } from 'react-icons/fa';

function Home() {
  const stats = [
    { value: '120+', label: 'Startups Launched' },
    { value: '850+', label: 'Pitches Made' },
    { value: '300+', label: 'Investors' },
  ];

  const pitches = [
    {
      title: 'EcoDrive',
      desc: 'AI-powered route optimization for delivery fleets.',
      image: 'https://img.freepik.com/free-photo/close-up-smartphone-screen-showing-location-map-with-navigation_1150-12650.jpg',
    },
    {
      title: 'HealthSync',
      desc: 'Telehealth platform connecting rural clinics.',
      image: 'https://img.freepik.com/free-photo/doctor-using-laptop-computer-video-call-with-patient_1150-14989.jpg',
    },
    {
      title: 'EduVerse',
      desc: 'Immersive VR classrooms for interactive learning.',
      image: 'https://img.freepik.com/free-photo/virtual-reality-headset-with-virtual-screen_1150-12649.jpg',
    },
    {
      title: 'SmartFit',
      desc: 'AI-driven personal training app with real-time fitness tracking and personalized workout plans.',
      image: 'https://img.freepik.com/free-photo/smartwatch-with-fitness-tracking-app_1150-12648.jpg',
    },
    {
      title: 'AgriTech',
      desc: 'Smart farming solutions to enhance productivity.',
      image: 'https://img.freepik.com/free-photo/drone-monitoring-crops-in-field_1150-12647.jpg',
    },
    {
      title: 'FitTrack',
      desc: 'Wearable tech to monitor fitness progress.',
      image: 'https://img.freepik.com/free-photo/fitness-tracker-on-wrist_1150-12646.jpg',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen text-center">
      {/* Hero Section */}
      <div className="relative w-full h-100%">
        <img
          src="https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg?t=st=1744815699~exp=1744819299~hmac=2bf550ce03c25fce2d1227360dfe78012b01b2fc90416c9a5d1dc6b76d25e161&w=1380"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold max-w-2xl">
            We connect business ideas and opportunities with professional, technical, and creative service providers who want to invest skills and resources to make them fly.
          </h2>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-6 bg-blue-50">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Our Success in Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="text-6xl font-extrabold text-blue-600 mb-2">{s.value}</div>
              <div className="text-lg text-gray-700 font-medium mb-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Founders vs Investors Section */}
      <section className="min-h-[400px] flex flex-col justify-center items-center bg-white px-6 py-12">
        <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
          {/* Founder Box */}
          <div className="bg-gray-100 p-8 rounded-xl shadow-lg text-center">
            <FaUsers className="text-4xl mx-auto mb-4 text-black" />
            <h2 className="text-2xl font-bold mb-2">Founders</h2>
            <p className="text-gray-700 mb-6">
              I’m a visionary entrepreneur with innovative ideas and I’m looking for investment and mentorship to bring them to life.
            </p>
            <div className="flex justify-center space-x-4 text-sm font-medium">
              <a href="/login" className="text-blue-600 hover:underline">Get Started</a>
    
            </div>
          </div>

          {/* Investor Box */}
          <div className="bg-gray-100 p-8 rounded-xl shadow-lg text-center">
            <FaBriefcase className="text-4xl mx-auto mb-4 text-black" />
            <h2 className="text-2xl font-bold mb-2">Investors</h2>
            <p className="text-gray-700 mb-6">
              I have the resources and experience to invest in promising startups and help them grow with my mentorship and capital.
            </p>
            <div className="flex justify-center space-x-4 text-sm font-medium">
              <a href="/login" className="text-blue-600 hover:underline">Get Started</a>
       
            </div>
          </div>
        </div>
      </section>

      {/* Sample Pitches Section */}
      <div className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Innovative Startup Pitches</h2>
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700">
            Discover cutting-edge ideas that are changing the world. These startups are innovating in various industries, bringing fresh perspectives and solving real-world problems.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {pitches.map((pitch, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-xl transition-all duration-300"></div>
                <div className="relative">
                  <img
                    src={pitch.image}
                    alt={pitch.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{pitch.title}</h3>
                  <p className="text-sm text-gray-700">{pitch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      

    </div>
  );
}

export default Home;
