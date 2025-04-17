import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupFounder = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    bio: '',
    websiteUrl: '',
    verifyFounder: 'gstin',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      // await axios.post('/api/founder-details', formData);

      setSuccessMessage('Founder details submitted successfully!');
      // Redirect to founder profile (dashboard)
      navigate('/founder-profile');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Founder Details</h2>

      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1"
            placeholder="e.g. Startup Inc."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1"
            rows="4"
            placeholder="Tell us about your startup..."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Website URL</label>
          <input
            type="url"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1"
            placeholder="https://yourstartup.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Verification Type</label>
          <select
            name="verifyFounder"
            value={formData.verifyFounder}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1"
            required
          >
            <option value="gstin">GSTIN</option>
            <option value="adhar">Adhar</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Founder Details'}
        </button>
      </form>
    </div>
  );
};

export default SignupFounder;
