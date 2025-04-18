import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

const StartupDetail = () => {
  const { startupId } = useParams(); // Get startupId from URL
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    const fetchStartupDetail = async () => {
      try {
        const res = await API.get(`/getStartupById/${startupId}`);
        setStartup(res.data.startup);

        // Check if the user has already liked or disliked
        const userId = "YOUR_USER_ID"; // Get logged-in user's ID
        setHasLiked(res.data.startup.likedBy.includes(userId));
        setHasDisliked(res.data.startup.dislikedBy.includes(userId));
      } catch (err) {
        console.error('Error fetching startup details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (startupId) fetchStartupDetail();
  }, [startupId]);

  const likeStartup = async () => {
    try {
      const res = await API.post(`/startup/like/${startupId}`);
      setStartup((prevState) => ({
        ...prevState,
        likes: res.data.likes,
        dislikes: res.data.dislikes
      }));
      setHasLiked(!hasLiked); // Toggle the like state
      setHasDisliked(false); // Remove dislike if already disliked
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const dislikeStartup = async () => {
    try {
      const res = await API.post(`/startup/dislike/${startupId}`);
      setStartup((prevState) => ({
        ...prevState,
        likes: res.data.likes,
        dislikes: res.data.dislikes
      }));
      setHasDisliked(!hasDisliked); // Toggle the dislike state
      setHasLiked(false); // Remove like if already liked
    } catch (error) {
      console.error('Error toggling dislike:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!startup) return <p>Startup not found or you don’t have access.</p>;

  return (
    <div className="p-6 mt-14 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{startup.title}</h2>
      <p className="text-gray-600">{startup.description}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Founder:</h3>
        <p>{startup.founderId?.companyName}</p>
        <p>{startup.founderId?.bio}</p>
      </div>

      {startup.pitch && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Pitch Video:</h3>
          <video controls className="w-full h-64" src={startup.pitch}></video>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={likeStartup}
          className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
          disabled={hasLiked}  // Disable if already liked
        >
          {hasLiked ? 'Undo Like' : 'Like'} ({startup.likes})
        </button>
        <button
          onClick={dislikeStartup}
          className="bg-red-500 text-white py-2 px-4 rounded"
          disabled={hasDisliked}  // Disable if already disliked
        >
          {hasDisliked ? 'Undo Dislike' : 'Dislike'} ({startup.dislikes})
        </button>
      </div>
    </div>
  );
};

export default StartupDetail;
