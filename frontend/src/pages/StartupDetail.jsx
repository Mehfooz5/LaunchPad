import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MessageCircle, Send, Bookmark } from 'lucide-react';
import API from '../api/axios';

const StartupDetail = () => {
  const { startupId } = useParams();
  const navigate = useNavigate();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // State for saved status
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState({});
  const [showReplyField, setShowReplyField] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startupRes = await API.get(`/getStartupById/${startupId}`);
        const startupData = startupRes.data.startup;

        const commentsRes = await API.get(`/comments/${startupId}`);

        const savedRes = await API.get('/savedStartups'); // Fetch saved startups
        const isStartupSaved = savedRes.data.some((s) => s._id === startupId);

        setStartup(startupData);
        setHasLiked(startupData.hasLiked || false);
        setHasDisliked(startupData.hasDisliked || false);
        setIsSaved(isStartupSaved); // Set saved status
        setComments(commentsRes.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (startupId) fetchData();
  }, [startupId]);

  const likeStartup = async () => {
    try {
      const res = await API.post(`/startup/like/${startupId}`);
      setStartup((prev) => ({
        ...prev,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
      }));
      setHasLiked(res.data.userState.hasLiked);
      setHasDisliked(res.data.userState.hasDisliked);
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
        dislikes: res.data.dislikes,
      }));
      setHasLiked(res.data.userState.hasLiked);
      setHasDisliked(res.data.userState.hasDisliked);
    } catch (error) {
      console.error('Error toggling dislike:', error);
    }
  };

  const toggleSaveStartup = async () => {
    try {
      const res = await API.post(`/startup/save/${startupId}`);
      setIsSaved(res.data.isSaved);
    } catch (error) {
      console.error('Error saving startup:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await API.post('/comments', {
        startupId,
        content: newComment,
      });

      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const toggleReplyField = (commentId) => {
    setShowReplyField((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplyChange = (commentId, value) => {
    setReplyContent((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const submitReply = async (commentId) => {
    const content = replyContent[commentId];
    if (!content || !content.trim()) return;

    try {
      const res = await API.post(`/comments/${commentId}/reply`, { content });

      setComments(
        comments.map((comment) =>
          comment._id === commentId ? res.data : comment
        )
      );

      setReplyContent((prev) => ({ ...prev, [commentId]: '' }));
      setShowReplyField((prev) => ({ ...prev, [commentId]: false }));
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const goToChatPage = () => {
    navigate(`/chat/${startupId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (!startup) return <p>Startup not found or access denied.</p>;

  return (
    <div className="p-6 mt-14 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      {startup.pitch && (
        <div className="mb-6">
          <video
            controls
            className="w-full h-64 rounded-lg"
            src={startup.pitch}
          ></video>
        </div>
      )}

      <h2 className="text-3xl font-bold text-gray-800 mb-2">{startup.title}</h2>
      <p className="text-gray-700 mb-1">
        <strong>Domain:</strong> {startup.domain}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Stage:</strong> {startup.stage}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Location:</strong> {startup.location}
      </p>
      <p className="text-gray-600 mb-6">{startup.description}</p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={likeStartup}
          className={`flex items-center gap-2 py-2 px-4 rounded ${
            hasLiked ? 'bg-blue-600' : 'bg-blue-500'
          } text-white`}
        >
          <ThumbsUp size={18} /> {hasLiked ? 'Upvoted' : 'Upvote'} (
          {startup.likes || 0})
        </button>

        <button
          onClick={dislikeStartup}
          className={`flex items-center gap-2 py-2 px-4 rounded ${
            hasDisliked ? 'bg-red-600' : 'bg-red-500'
          } text-white`}
        >
          <ThumbsDown size={18} /> {hasDisliked ? 'Downvoted' : 'Downvote'} (
          {startup.dislikes || 0})
        </button>

        <button
          onClick={goToChatPage}
          className="flex items-center gap-2 py-2 px-4 rounded bg-green-500 text-white"
        >
          <MessageCircle size={18} /> Reach Out
        </button>

        {/* Save Startup Button */}
        <button
          onClick={toggleSaveStartup}
          className={`flex items-center gap-2 py-2 px-4 rounded ${
            isSaved ? 'bg-yellow-500' : 'bg-gray-500'
          } text-white`}
        >
          <Bookmark size={18} /> {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>

      {/* Founder Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Founder:</h3>
        <p>{startup.founderId?.companyName}</p>
        <p>{startup.founderId?.bio}</p>
        <p>{startup.founderId?.userId?.fullName}</p>
      </div>

      {/* Comment Form */}
      <div className="mt-8 mb-6">
        <h3 className="text-xl font-semibold mb-4">Add Comment</h3>
        <form onSubmit={handleSubmitComment} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-grow p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-1"
          >
            <Send size={16} /> Post
          </button>
        </form>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
         <h3 className="text-2xl font-semibold mb-6 border-b pb-2">Comments</h3>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="mb-6 bg-gray-50 p-4 rounded-md shadow-sm"
            >
        <p className="font-semibold text-gray-800">
          {comment.userId?.fullName}
        </p>
        <p className="text-gray-700 mt-1">{comment.content}</p>

        {/* Replies */}
        {comment.replies?.length > 0 && (
          <div className="mt-3 ml-4 border-l-2 border-gray-200 pl-4">
            {comment.replies.map((reply) => (
              <div
                key={reply._id}
                className="mb-2 p-2 bg-white rounded border border-gray-100 shadow-sm"
              >
                <p className="text-sm font-medium text-gray-800">
                  {reply.userId?.fullName}
                </p>
                <p className="text-sm text-gray-700">{reply.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Reply Field */}
        <div className="mt-3">
          <button
            onClick={() => toggleReplyField(comment._id)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            <MessageCircle size={14} /> Reply
          </button>

          {showReplyField[comment._id] && (
            <div className="mt-2 flex gap-2 items-center">
              <input
                type="text"
                value={replyContent[comment._id] || ''}
                onChange={(e) =>
                  handleReplyChange(comment._id, e.target.value)
                }
                placeholder="Write a reply..."
                className="flex-grow p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={() => submitReply(comment._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm"
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
};

export default StartupDetail;