import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = (text) => {
    const userMessage = { sender: "user", text };
    const botMessage = { sender: "bot", text: `You said: ${text}` };
    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundImage: 'url("/blue-background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="container py-3 d-flex flex-column"
        style={{ height: "100%" }}
      >
        {/* Home Button */}
        <button
          className="btn mb-3 rounded-pill px-4"
          style={{
            backgroundColor: "#0A2647",
            color: "#fff",
            width: "fit-content",
          }}
          onClick={() => navigate("/")}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#144272")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0A2647")}
        >
          Home
        </button>

        {/* Scrollable Message Area */}
        <div
          ref={scrollRef}
          className="flex-grow-1 overflow-auto px-2 py-3 hide-scrollbar"
          style={{
            borderRadius: "10px",
            backgroundColor: "",
          }}
        >
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          `}</style>

          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
        </div>

        {/* Input Bar Fixed at Bottom */}
        <div className="pt-3">
          <ChatInput onSend={handleSend} enableVoice={false} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
