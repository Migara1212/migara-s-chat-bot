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

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Scroll input into view on focus (helps on mobile when keyboard opens)
  useEffect(() => {
    const inputEl = document.querySelector("input[type='text']");
    if (!inputEl) return;

    const onFocus = () => {
      setTimeout(() => {
        inputEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    };

    inputEl.addEventListener("focus", onFocus);
    return () => inputEl.removeEventListener("focus", onFocus);
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{
        minHeight: "100vh", // Use minHeight instead of height
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
        style={{
          borderRadius: "10px",
          backgroundColor: "#e6f2f2",
          minHeight: 0, // Important for flexbox shrinking
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

      {/* Chat input fixed at bottom */}
      <div>
        <ChatInput onSend={handleSend} enableVoice={true} />
      </div>
    </div>
  );
}

export default ChatPage;
