// 📁 src/pages/VoiceChatPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VoiceChatPage() {
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = async (event) => {
      const voiceText = event.results[0][0].transcript;
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: voiceText }),
      });

      const data = await res.json();
      setResponse(data.reply);

      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(data.reply);
      synth.speak(utterance);
    };
  };

  return (
    <div className="container py-5 text-center" style={{ maxWidth: "600px" }}>
      <button className="btn btn-link mb-3" onClick={() => navigate("/")}>
        ← Home
      </button>
      <h2 className="fw-bold mb-4">🎙️ Voice Chatbot</h2>

      <button
        className="btn btn-lg btn-danger rounded-circle shadow mb-3"
        onClick={handleVoiceInput}
        style={{ width: "70px", height: "70px" }}
      >
        🎤
      </button>
      <p className="text-muted">Tap to speak</p>

      {response && (
        <div className="alert alert-info mt-4" role="alert">
          <strong>Bot:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default VoiceChatPage;
