import React, { useState } from "react";

const EcoChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const sendQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = { text: question, type: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const botMessage = { text: data.answer, type: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: `❌ EcoBot error: ${error.message}`, type: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendQuestion();
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left panel with image */}
      <div
        className="w-2/3 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/frontend/assets/leaf.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl z-10"></div>
      </div>

      {/* Chat UI */}
      <div className="w-1/3 bg-[#051501] text-white flex flex-col p-5 z-20 relative">
        <h2 className="text-center text-2xl mb-4 text-green-500">🌱</h2>

        <div className="flex-1 overflow-y-auto mb-5 pr-2" id="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[90%] px-4 py-3 rounded-xl my-2 whitespace-pre-wrap leading-relaxed ${
                msg.type === "user"
                  ? "bg-green-200 text-green-900 self-end text-right ml-auto"
                  : "bg-[#2e3d31] text-[#e4ffe6] self-start text-left mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 justify-center bg-[#2e3d31] text-[#e4ffe6] px-4 py-3 rounded-xl my-2">
              <TypingDot delay="0s" />
              <TypingDot delay="0.2s" />
              <TypingDot delay="0.4s" />
            </div>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask something eco-friendly..."
            className="flex-1 px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-300 focus:outline-none"
          />
          <button
            onClick={sendQuestion}
            className="bg-green-500 text-white px-5 py-3 rounded-md text-lg hover:bg-green-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const TypingDot = ({ delay }) => (
  <div
    className="w-2.5 h-2.5 rounded-full bg-green-500 animate-bounce"
    style={{ animationDelay: delay }}
  />
);

export default EcoChatbot;
