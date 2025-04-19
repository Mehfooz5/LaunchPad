import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import API from '../api/axios';
import { format } from 'date-fns';

const StartupDetail = () => {
  const { startupId } = useParams();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // New state for comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  // Fetch startup details and comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [startupRes, commentsRes] = await Promise.all([
          API.get(`/getStartupById/${startupId}`),
          API.get(`/comments/${startupId}`)
        ]);
        
        setStartup(startupRes.data.startup);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (startupId) fetchData();
  }, [startupId]);

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const res = await API.get(`/startup/isSaved/${startupId}`);
        setIsSaved(res.data.isSaved);
      } catch (err) {
        console.error('Error checking saved status:', err);
      }
    };

    if (startupId) checkSavedStatus();
  }, [startupId]);

  // Like/Dislike handlers stay the same
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

  const saveStartup = async () => {
    try {
      const res = await API.post(`/startup/save/${startupId}`);
      setIsSaved(res.data.isSaved);
    } catch (err) {
      console.error('Error saving startup:', err);
    }
  };

  // New comment handlers
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/comments', {
        startupId,
        content: newComment
      });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };
  const handleReply = async (commentId) => {
    try {
      const res = await API.post(`/comments/${commentId}/reply`, {
        content: replyText
      });
      setComments(comments.map(c => 
        c._id === commentId ? res.data : c
      ));
      setReplyText('');
      setReplyingTo(null);
    } catch (err) {
      console.error('Error posting reply:', err);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (!startup) return <p>Startup not found or you don't have access.</p>;

  return (
    <div className="p-6 mt-14 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      {/* Existing startup details */}
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

      {/* Like/Dislike buttons */}
      <div className="mt-4 flex gap-4 mb-8">
        <button
          onClick={likeStartup}
          className={`flex items-center gap-2 py-2 px-4 rounded ${
            hasLiked ? 'bg-blue-600' : 'bg-blue-500'
          } text-white hover:opacity-90 transition`}
        >
          <ThumbsUp size={18} /> {hasLiked ? 'Upvoted' : 'Upvote'} ({startup.likes})
        </button>

        <button
          onClick={dislikeStartup}
          className={`flex items-center gap-2 py-2 px-4 rounded ${
            hasDisliked ? 'bg-red-600' : 'bg-red-500'
          } text-white hover:opacity-90 transition`}
        >
          <ThumbsDown size={18} /> {hasDisliked ? 'Downvoted' : 'Downvote'} ({startup.dislikes})
        </button>

        <button
          onClick={saveStartup}
          className={`flex items-center gap-2 py-2 px-4 rounded ${
            isSaved ? 'bg-green-600' : 'bg-green-500'
          } text-white hover:opacity-90 transition`}
        >
          {isSaved ? 'Saved' : 'Save Startup'}
        </button>
      </div>

      
      {/* Comment Section */}
      <div className="mt-8 border-t pt-8">
        <h3 className="text-2xl font-bold mb-4">Comments</h3>
        
        {/* Comment Form */}
        <form onSubmit={handleComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Add a comment..."
            rows="3"
            required
          />
          <button 
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{comment.userId.fullName}</p>
                  <p className="text-gray-600 text-sm">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <p className="mt-2">{comment.content}</p>

              {/* Reply Button */}
              <button
                onClick={() => setReplyingTo(comment._id)}
                className="text-blue-600 text-sm mt-2 hover:underline"
              >
                Reply
              </button>

              {/* Reply Form */}
              {replyingTo === comment._id && (
                <div className="mt-3 ml-8">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a reply..."
                    rows="2"
                  />
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleReply(comment._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Post Reply
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies?.length > 0 && (
                <div className="ml-8 mt-4 space-y-4">
                  {comment.replies.map((reply, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{reply.userId.fullName}</p>
                          <p className="text-gray-600 text-sm">
                            {format(new Date(reply.createdAt), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;