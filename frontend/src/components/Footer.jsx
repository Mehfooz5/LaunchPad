import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-teal-800  text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Logo & Description */}
        <div>
          <h3 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">
            🚀 Startup Pitch Portal
          </h3>
          <p className="text-lg text-gray-300">
            Empowering startups to showcase their ideas and connect with investors, mentors, and fellow innovators.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#home" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="#about" className="hover:text-yellow-400 transition">About Us</a></li>
            <li><a href="#pitch" className="hover:text-yellow-400 transition">Our Pitch</a></li>
            <li><a href="#contact" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">Follow Us</h3>
          <div className="flex space-x-6 text-xl">
            <a href="https://facebook.com" className="hover:text-yellow-400 transition" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="hover:text-yellow-400 transition" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" className="hover:text-yellow-400 transition" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" className="hover:text-yellow-400 transition" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">Stay Updated</h3>
          <p className="text-sm text-gray-300 mb-4">
            Join our newsletter for the latest updates on startups, pitches, and news.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-lg w-3/4 text-black outline-none"
            />
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-r-lg hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-12 border-t border-gray-700 pt-6">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Startup Pitch Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
