import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaUsers, FaBriefcase, FaRocket, FaChartLine, FaHandshake } from "react-icons/fa"
import { useInView } from "react-intersection-observer"

// Stats Counter Animation
function CounterAnimation({ target, duration = 2 }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    let startTime
    let animationFrame

    if (inView) {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * target))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step)
        }
      }

      animationFrame = requestAnimationFrame(step)
    }

    return () => cancelAnimationFrame(animationFrame)
  }, [inView, target, duration])

  return <span ref={ref}>{count}</span>
}

export default function Home() {
  const stats = [
    { value: 120, label: "Startups Launched", icon: <FaRocket /> },
    { value: 850, label: "Pitches Made", icon: <FaChartLine /> },
    { value: 300, label: "Investors", icon: <FaHandshake /> },
  ]

  const pitches = [
    {
      title: "EcoDrive",
      desc: "AI-powered route optimization for delivery fleets.",
      image:
        "https://img.freepik.com/free-photo/close-up-smartphone-screen-showing-location-map-with-navigation_1150-12650.jpg",
      color: "#4ade80",
    },
    {
      title: "HealthSync",
      desc: "Telehealth platform connecting rural clinics.",
      image: "https://img.freepik.com/free-photo/doctor-using-laptop-computer-video-call-with-patient_1150-14989.jpg",
      color: "#60a5fa",
    },
    {
      title: "EduVerse",
      desc: "Immersive VR classrooms for interactive learning.",
      image: "https://img.freepik.com/free-photo/virtual-reality-headset-with-virtual-screen_1150-12649.jpg",
      color: "#f472b6",
    },
    {
      title: "SmartFit",
      desc: "AI-driven personal training app with real-time fitness tracking and personalized workout plans.",
      image: "https://img.freepik.com/free-photo/smartwatch-with-fitness-tracking-app_1150-12648.jpg",
      color: "#fb923c",
    },
    {
      title: "AgriTech",
      desc: "Smart farming solutions to enhance productivity.",
      image: "https://img.freepik.com/free-photo/drone-monitoring-crops-in-field_1150-12647.jpg",
      color: "#a3e635",
    },
    {
      title: "FitTrack",
      desc: "Wearable tech to monitor fitness progress.",
      image: "https://img.freepik.com/free-photo/fitness-tracker-on-wrist_1150-12646.jpg",
      color: "#c084fc",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      {/* Hero Section - Simplified */}
        <div className="relative w-full h-screen flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full">
            <img
          src="https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg?t=st=1744815699~exp=1744819299~hmac=2bf550ce03c25fce2d1227360dfe78012b01b2fc90416c9a5d1dc6b76d25e161&w=1380"
          alt="Hero"
          className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70"></div>
          </div>

          <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
            <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-left mb-10 md:mb-0"
            >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Launch Your Vision
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold max-w-2xl mb-8 leading-relaxed">
            We connect innovative business ideas with investors and service providers who want to make them fly.
          </h2>
          <a
            href="/login"   
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-bold shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
          >
            Get Started
          </a>
            </motion.div>

            <div className="md:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-64 h-64 md:w-80 md:h-80"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
            <div
              className="absolute inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full animate-pulse"
              style={{ animationDelay: "300ms" }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaRocket className="text-7xl md:text-8xl text-white" />
            </div>
          </motion.div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
            >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Stats Section - Simplified */}
      <div className="py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
          >
            Our Success in Numbers
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20 text-center"
              >
                <div className="text-4xl mb-4 flex justify-center">{s.icon}</div>
                <div className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                  <CounterAnimation target={s.value} />+
                </div>
                <div className="text-lg text-blue-100 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Founders vs Investor s Section - Simplified */}
      <section className="min-h-[500px] flex flex-col justify-center items-center px-6 py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
        >
          Connect & Collaborate
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
          {/* Founder Box */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-10 rounded-2xl shadow-xl border border-blue-500/20 text-center"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                <FaUsers className="text-3xl" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-blue-300">Founders</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              I'm a visionary entrepreneur with innovative ideas and I'm looking for investment and mentorship to bring
              them to life.
            </p>
            <a className="underline hover:text-blue-300 text-blue-200 font-medium"
            href="/login"   
          >
            Get Started
          </a>
          </motion.div>

          {/* Investor Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-10 rounded-2xl shadow-xl border border-purple-500/20 text-center"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-6">
                <FaBriefcase className="text-3xl" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Investors</h2>
            <p className="text-purple-100 mb-8 leading-relaxed">
              I have the resources and experience to invest in promising startups and help them grow with my mentorship
              and capital.
            </p>
            <a className="underline hover:text-blue-300 text-blue-200 font-medium"
            href="/login"   
          >
            Get Started
          </a>
          </motion.div>
        </div>
      </section>

      {/* Sample Pitches Section - Simplified */}
      <div className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
            Innovative Startup Pitches
          </h2>
          <div className="text-center mb-12">
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Discover cutting-edge ideas that are changing the world. These startups are innovating in various
              industries, bringing fresh perspectives and solving real-world problems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pitches.map((pitch, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group h-full bg-gray-800/50 p-6 rounded-2xl border border-gray-700 overflow-hidden relative hover:translate-y-[-5px] transition-transform duration-300"
              >
                <div
                  className="absolute -right-10 -top-10 w-24 h-24 rounded-full"
                  style={{ background: `${pitch.color}33` }}
                ></div>

                <div className="relative">
                  <div className="overflow-hidden rounded-xl mb-5">
                    <img
                      src={pitch.image || "/placeholder.svg"}
                      alt={pitch.title}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {pitch.title}
                  </h3>

                  <p className="text-gray-400">{pitch.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section - Simplified */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Launch Your Next Big Idea?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Join our community of innovators, investors, and entrepreneurs today.
            </p>
            <a className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-bold shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            href="/login"   
          >
            Get Started
          </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
