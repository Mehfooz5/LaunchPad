import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios'; // adjust path if needed

const AddStartup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    domain: 'tech',
    stage: 'Idea',
    location: '',
    description: '',
    startupPdf: null,
    pitch: null,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      // build multipart form data
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val != null) payload.append(key, val);
      });

      const res = await API.post('/startup', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.status === 200 || res.status === 201) {
        setSuccessMessage('Startup submitted successfully!');
        setTimeout(() => navigate('/founder-profile'), 1200);
      } else {
        setError('Something went wrong!');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-12 flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 px-4 py-10">
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl w-full max-w-3xl p-8 border border-white/20 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Startup</h2>

        {error && (
          <div className="bg-red-500/10 text-red-200 border border-red-300 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-500/10 text-green-200 border border-green-300 px-4 py-2 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1">Startup Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter title"
            />
          </div>

          {/* Domain */}
          <div>
            <label className="block mb-1">Domain</label>
            <select
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option className="text-black" value="medical">Medical</option>
              <option className="text-black" value="agriculture">Agriculture</option>
              <option className="text-black" value="tech">Tech</option>
              <option className="text-black" value="education">Education</option>
            </select>
          </div>

          {/* Stage */}
          <div>
            <label className="block mb-1">Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option className="text-black" value="Idea">Idea</option>
              <option className="text-black" value="Prototype">Prototype</option>
              <option className="text-black" value="MVP">MVP</option>
              <option className="text-black" value="Revenue">Revenue</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="City, Country"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Brief about the startup"
            />
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block mb-1">Startup PDF</label>
            <input
              type="file"
              name="startupPdf"
              onChange={handleChange}
              accept="application/pdf"
              className="w-full text-white"
            />
          </div>

          {/* Pitch Upload */}
          <div>
            <label className="block mb-1">Pitch Video</label>
            <input
              type="file"
              name="pitch"
              onChange={handleChange}
              accept="video/*"
              className="w-full text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition shadow-lg mt-4"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Startup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStartup;
