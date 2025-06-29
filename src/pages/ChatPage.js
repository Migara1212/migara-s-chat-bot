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

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(botMessage.text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{
        height: "100vh",
        backgroundColor: "#71C0BB",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      {/* Home button */}
      <button
        className="btn btn-dark rounded-pill mb-2"
        style={{ width: "fit-content" }}
        onClick={() => navigate("/")}
      >
        Home
      </button>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-grow-1 overflow-auto px-2 py-3 hide-scrollbar"
        style={{ borderRadius: "10px", backgroundColor: "transparent" }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        `}</style>
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
      </div>

      {/* Chat input fixed at bottom */}
      <div>
        <ChatInput onSend={handleSend} enableVoice={true} />
      </div>
    </div>
  );
}

export default ChatPage;
