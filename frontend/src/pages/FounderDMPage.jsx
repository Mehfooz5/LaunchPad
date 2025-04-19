import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const FounderDMPage = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await API.get('/messages/conversations');
        setConversations(res.data);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Failed to load conversations.');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const handleConversationClick = (userId) => {
    navigate(`/chat/${userId}`); // Navigate to ChatPage with the other user's ID
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 mt-14 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Direct Messages</h2>
      {conversations.length > 0 ? (
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation._id}
              className="p-4 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleConversationClick(conversation._id)}
            >
              <p className="font-semibold">{conversation.fullName}</p>
              <p className="text-gray-600 text-sm mt-1">
                {conversation.lastMessage}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No conversations yet.</p>
      )}
    </div>
  );
};

export default FounderDMPage;