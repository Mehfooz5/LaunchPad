import React, { useEffect, useRef, useState } from 'react';
import API from '../api/axios';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext'; // Assuming you're using a context for auth

const socket = io('http://localhost:3000'); // Update if backend is hosted elsewhere

const FounderDMPage = () => {
  const { user } = useAuth(); // Should have user._id
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user?._id) {
      API.get(`/conversations/${user._id}`).then(res => {
        setConversations(res.data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation?._id) {
      socket.emit('joinConversation', selectedConversation._id);
      API.get(`/messages/${selectedConversation._id}`).then(res => {
        setMessages(res.data);
      });
    }
  }, [selectedConversation]);

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      if (msg.conversationId === selectedConversation?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => socket.off('newMessage');
  }, [selectedConversation]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const messageData = {
      conversationId: selectedConversation._id,
      sender: user._id,
      text: newMessage
    };
    socket.emit('sendMessage', messageData);
    setMessages((prev) => [...prev, { ...messageData, sender: user }]);
    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex mt-16">
      {/* Sidebar - Conversations */}
      <div className="w-1/3 border-r h-screen overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4">Inbox</h2>
        {conversations.map((conv) => {
          const other = conv.members.find(m => m._id !== user._id);
          return (
            <div
              key={conv._id}
              className={`p-3 mb-2 rounded cursor-pointer hover:bg-gray-100 ${
                selectedConversation?._id === conv._id ? 'bg-gray-200' : ''
              }`}
              onClick={() => setSelectedConversation(conv)}
            >
              <p className="font-semibold">{other.fullName}</p>
              <p className="text-sm text-gray-600">{other.email}</p>
            </div>
          );
        })}
      </div>

      {/* Message View */}
      <div className="w-2/3 h-screen flex flex-col justify-between p-4">
        {selectedConversation ? (
          <>
            <div className="overflow-y-auto h-full mb-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`my-2 p-3 max-w-md rounded-lg ${
                    msg.sender._id === user._id
                      ? 'bg-blue-500 text-white self-end ml-auto'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default FounderDMPage;
