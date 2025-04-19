import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown } from 'lucide-react'; // using Lucide icons
import API from '../api/axios';

const StartupDetail = () => {
  const { startupId } = useParams();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    const fetchStartupDetail = async () => {
      try {
        const res = await API.get(`/getStartupById/${startupId}`);
        setStartup(res.data.startup);

        const userId = "YOUR_USER_ID";
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
      setStartup((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes
      }));
      setHasLiked(!hasLiked);
      setHasDisliked(false);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const dislikeStartup = async () => {
    try {
      const res = await API.post(`/startup/dislike/${startupId}`);
      setStartup((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes
      }));
      setHasDisliked(!hasDisliked);
      setHasLiked(false);
    } catch (error) {
      console.error('Error toggling dislike:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!startup) return <p>Startup not found or you don’t have access.</p>;

  return (
    <div className="p-6 mt-14 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      {startup.pitch && (
        <div className="mb-6">
          <video controls className="w-full h-64 rounded-lg" src={startup.pitch}></video>
        </div>
      )}

      <h2 className="text-3xl font-bold text-gray-800 mb-2">{startup.title}</h2>
      <p className="text-gray-700 mb-1"><strong>Domain:</strong> {startup.domain || 'N/A'}</p>
      <p className="text-gray-700 mb-1"><strong>Stage:</strong> {startup.stage || 'N/A'}</p>
      <p className="text-gray-700 mb-4"><strong>Location:</strong> {startup.location || 'N/A'}</p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Description:</h3>
        <p className="text-gray-600 mt-1">{startup.description}</p>
      </div>

      {startup.pdf && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Startup Document:</h3>
          <a
            href={startup.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View PDF
          </a>
        </div>
      )}

      <div className="mt-4 flex gap-4">
        <button
          onClick={likeStartup}
          className={`flex items-center gap-2 py-2 px-4 rounded ${hasLiked ? 'bg-blue-600' : 'bg-blue-500'} text-white`}
          disabled={hasLiked}
        >
          <ThumbsUp size={18} /> {hasLiked ? 'Upvoted' : 'Upvote'} ({startup.likes})
        </button>

        <button
          onClick={dislikeStartup}
          className={`flex items-center gap-2 py-2 px-4 rounded ${hasDisliked ? 'bg-red-600' : 'bg-red-500'} text-white`}
          disabled={hasDisliked}
        >
          <ThumbsDown size={18} /> {hasDisliked ? 'Downvoted' : 'Downvote'} ({startup.dislikes})
        </button>
      </div>
    </div>
  );
};

export default StartupDetail;
