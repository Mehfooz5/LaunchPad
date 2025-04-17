import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
const AddStartup = () => {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    domain: 'tech',
    stage: 'Idea',
    location: '',
    description: '',
    startupPdf: '',
    pitch: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await API.post('/startup', formData); // Adjust route if needed
      if (response.status === 200 || response.status === 201) {
        navigate('/founder-profile');
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
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-2xl w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Startup</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Startup Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded mt-1"
              placeholder="Enter title"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Domain</label>
            <select
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded mt-1"
            >
              <option value="medical">Medical</option>
              <option value="agriculture">Agriculture</option>
              <option value="tech">Tech</option>
              <option value="education">Education</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded mt-1"
            >
              <option value="Idea">Idea</option>
              <option value="Prototype">Prototype</option>
              <option value="MVP">MVP</option>
              <option value="Revenue">Revenue</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1"
              placeholder="City, Country"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border px-4 py-2 rounded mt-1"
              placeholder="Brief about the startup"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Startup PDF URL</label>
            <input
              type="file"
              name="startupPdf"
              value={formData.startupPdf}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1"
              placeholder="upload file"
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium">Pitch (YouTube/Drive link)</label>
            <input
              type="file"
              name="pitch"
              value={formData.pitch}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1"
              placeholder="upload video"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Startup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStartup;
