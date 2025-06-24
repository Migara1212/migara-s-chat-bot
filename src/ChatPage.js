// 📁 src/pages/ChatPage.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const endRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async (text) => {
    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();
    const botMessage = { sender: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMessage]);

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(data.reply);
    synth.speak(utterance);
  }, []);

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <button className="btn btn-link mb-3" onClick={() => navigate("/")}>
        ← Home
      </button>
      <h2 className="text-center mb-4 fw-bold">🗣️ English Chatbot</h2>

      <div
        className="border rounded p-3 bg-light shadow-sm mb-3"
        style={{ height: "400px", overflowY: "auto" }}
      >
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
        <div ref={endRef}></div>
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default ChatPage;
