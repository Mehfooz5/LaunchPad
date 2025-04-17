import React from 'react'

const Footer = () => {
  return (
    <>
       {/* Footer Section */}
<footer className="bg-gradient-to-r from-purple-800 to-teal-900 text-white py-16">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
    
    {/* Logo and Project Description */}
    <div>
      <h3 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
        Startup Pitch Portal
      </h3>
      <p className="text-lg text-gray-200">
        Empowering startups to showcase their innovative ideas and connect with investors, mentors, and other entrepreneurs.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-xl font-semibold mb-4 text-yellow-400">Quick Links</h3>
      <ul className="space-y-2">
        <li><a href="#home" className="text-sm hover:text-yellow-300 transition">Home</a></li>
        <li><a href="#about" className="text-sm hover:text-yellow-300 transition">About Us</a></li>
        <li><a href="#pitch" className="text-sm hover:text-yellow-300 transition">Our Pitch</a></li>
        <li><a href="#contact" className="text-sm hover:text-yellow-300 transition">Contact</a></li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h3 className="text-xl font-semibold mb-4 text-yellow-400">Follow Us</h3>
      <div className="flex space-x-6">
        <a href="https://facebook.com" className="text-xl hover:text-yellow-300 transition">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com" className="text-xl hover:text-yellow-300 transition">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://linkedin.com" className="text-xl hover:text-yellow-300 transition">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://instagram.com" className="text-xl hover:text-yellow-300 transition">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>

    {/* Newsletter */}
    <div>
      <h3 className="text-xl font-semibold mb-4 text-yellow-400">Stay Updated</h3>
      <p className="text-sm text-gray-200 mb-4">
        Join our newsletter for the latest updates on emerging startups, pitch ideas, and more.
      </p>
      <div className="flex">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 text-black rounded-l-lg w-3/4"
        />
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-r-lg hover:bg-yellow-500 transition">
          Subscribe
        </button>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="text-center mt-12">
    <p className="text-sm text-gray-400">
      &copy; {new Date().getFullYear()} Startup Pitch Portal. All rights reserved.
    </p>
  </div>
</footer>


    </>
  )
}

export default Footer