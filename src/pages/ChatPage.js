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

  useEffect(() => {
    const input = document.querySelector("input[type='text']");
    const scrollArea = scrollRef.current;

    const handleFocus = () => {
      setTimeout(() => {
        scrollArea?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 300);
    };

    input?.addEventListener("focus", handleFocus);
    return () => input?.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "100dvh",
        backgroundColor: "#71C0BB",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <div className="d-flex justify-content-between align-items-center mb-2 px-2">
          <button
            className="btn btn-dark rounded-pill"
            style={{ width: "fit-content" }}
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-auto px-2 py-3 hide-scrollbar d-flex flex-column-reverse"
        style={{
          flex: 1,
          borderRadius: "10px",
          backgroundColor: "transprerant",
          minHeight: 0,
        }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        `}</style>
        {messages
          .slice()
          .reverse()
          .map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
      </div>

      <div style={{ flexShrink: 0 }}>
        <ChatInput onSend={handleSend} enableVoice={true} />
      </div>
    </div>
  );
}

export default ChatPage;
