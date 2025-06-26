import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function VoiceChatPage() {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = (text) => {
    const userMessage = { sender: "user", text };
    const botMessage = { sender: "bot", text: `You said: ${text}` };

    setMessages((prev) => [...prev, userMessage, botMessage]);

    if ("speechSynthesis" in window) {
      // Stop any ongoing speech so it doesn't overlap
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(botMessage.text);
      utterance.lang = "en-US"; // set language
      utterance.rate = 1; // normal speed
      utterance.pitch = 1; // normal pitch

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      handleSend(voiceText);
    };

    recognition.start();
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#71C0BB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="btn rounded-pill px-4"
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          backgroundColor: "#0A2647",
          color: "#fff",
          zIndex: 10,
        }}
      >
        Home
      </button>

      {/* Chat Box */}
      <div
        className="hide-scrollbar position-relative"
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "90vh",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(6px)",
          borderRadius: "30px",
          padding: "25px",
          boxShadow: "0 0 12px rgba(0,0,0,0.2)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Messages Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingRight: "5px",
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`d-flex mb-3 ${
                msg.sender === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-pill ${
                  msg.sender === "user" ? "bg-primary text-white" : "text-dark"
                }`}
                style={{
                  backgroundColor:
                    msg.sender === "bot" ? "rgba(255,255,255,0.85)" : undefined,
                  maxWidth: "70%",
                  fontWeight: 500,
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Button - Bottom Center */}
      <div
        onClick={handleVoiceInput}
        title={isListening ? "Listening..." : "Tap to speak"}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "52px",
          height: "52px",
          background: isListening
            ? "rgba(255, 76, 76, 0.25)"
            : "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderRadius: "12px",
          color: isListening ? "#FF4C4C" : "#0A2647",
          fontSize: "1.3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 2px 6px rgba(0,0,0,0.2), inset 0 0 2px rgba(255,255,255,0.3)",
          cursor: "pointer",
          zIndex: 9999,
          transition: "all 0.3s ease",
        }}
      >
        <i className={`bi ${isListening ? "bi-mic-fill" : "bi-mic"}`}></i>
      </div>

      {/* Optional: Hide scrollbar style */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.75; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default VoiceChatPage;
