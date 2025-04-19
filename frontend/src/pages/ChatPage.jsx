import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import io from 'socket.io-client';

const ChatPage = () => {
  const { founderId } = useParams();
  const navigate = useNavigate();
  const socket = useRef(null);

  const [userId, setUserId] = useState('');
  const [conversationId, setConversationId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize Socket.IO connection
    socket.current = io('http://localhost:3000');

    const fetchUserId = async () => {
      try {
        const res = await API.get('/checkauth');
        setUserId(res.data._id);
      } catch (err) {
        console.error('Error fetching user ID:', err);
      }
    };

    fetchUserId();

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (userId && userId === founderId) {
      setError('You cannot message yourself.');
      navigate('/');
    }
  }, [userId, founderId, navigate]);

  useEffect(() => {
    const fetchOrCreateConversation = async () => {
      if (!userId || !founderId || userId === founderId) return;

      try {
        const res = await API.post('/conversations', {
          senderId: userId,
          receiverId: founderId,
        });
        setConversationId(res.data._id);
        socket.current.emit('joinConversation', res.data._id); // Join the conversation room
      } catch (err) {
        console.error('Error fetching/creating conversation:', err);
      }
    };

    fetchOrCreateConversation();
  }, [userId, founderId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
  
      try {
        const res = await API.get(`/messages/${conversationId}`);
        console.log('Fetched messages:', res.data); // Debugging
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };
  
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    if (!socket.current) return;

    socket.current.on('receiveMessage', (message) => {
      if (message.conversationId === conversationId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.current.off('receiveMessage');
    };
  }, [conversationId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      setError('Message cannot be empty');
      return;
    }

    try {
      const messageData = {
        conversationId,
        sender: userId,
        text: newMessage,
      };

      const res = await API.post('/message', messageData);

      socket.current.emit('sendMessage', res.data);

      setMessages((prevMessages) => [...prevMessages, res.data]);
      setNewMessage('');
      setError('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  return (
    <div className="chat-page p-6 mt-14 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>

      {/* Messages List */}
      <div className="messages-list mb-4 h-96 overflow-y-auto border p-4 rounded-lg">
  {messages.length > 0 ? (
    messages.map((msg, index) => (
      <div
        key={`${msg._id || 'msg'}-${index}`}
        className={`message-item mb-2 p-2 rounded-lg ${
          msg.sender === userId ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
        }`}
      >
        <p className="text-sm">{msg?.content || msg?.text || <em className="text-red-500">[No text]</em>}</p>
        <small className="text-xs text-gray-500">
          {msg?.createdAt
            ? new Date(msg.createdAt).toLocaleString()
            : '[No timestamp]'}
        </small>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No messages yet.</p>
  )}
</div>
      {/* New Message Input */}
      <div className="message-form flex items-center gap-2">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ChatPage;