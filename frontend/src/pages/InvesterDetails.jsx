import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupInvestor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organizationName: '',
    bio: '',
    type: 'Angel',
    preferredDomain: '',
    linkedin: '',
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
      // await axios.post('/api/investor-details', formData);

      setSuccessMessage('Investor details submitted successfully!');
      // Redirect to investor profile
      navigate('/investor-profile');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Investor Details</h2>

      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Organization Name</label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1"
            placeholder="e.g. InvestCorp"
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
            placeholder="Share your background and investment experience..."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Investor Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1"
            required
          >
            <option value="Angel">Angel</option>
            <option value="VC">VC</option>
            <option value="Institutional">Institutional</option>
            <option value="Incubator">Incubator</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Preferred Domain</label>
          <input
            type="text"
            name="preferredDomain"
            value={formData.preferredDomain}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1"
            placeholder="e.g. FinTech, HealthTech"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">LinkedIn Profile</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1"
            placeholder="https://linkedin.com/in/your-profile"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Investor Details'}
        </button>
      </form>
    </div>
  );
};

export default SignupInvestor;
