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

    const utterance = new SpeechSynthesisUtterance(botMessage.text);
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    if (isListening) {
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
        backgroundImage: 'url("/blue-background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
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

      {/* Chat Box with voice button inside (centered) */}
      <div
        className="hide-scrollbar position-relative"
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "90vh",
          backgroundColor: "transperant",
          backdropFilter: "blur(0px)",
          borderRadius: "30px",
          padding: "25px",
          boxShadow: "0 0 0px rgba(0,0,0,0.3)",
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

        {/* Voice Button Centered Over Chat Box */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 5,
          }}
        >
          <div
            onClick={handleVoiceInput}
            style={{
              width: "140px",
              height: "140px",
              backgroundColor: isListening ? "#B33030" : "#0A2647",
              color: "#fff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              cursor: "pointer",
              boxShadow: "0 0 25px rgba(0,0,0,0.5)",
              transition: "all 0.3s ease",
              animation: isListening ? "pulse 2s infinite" : "none",
            }}
          >
            <i className={`bi ${isListening ? "bi-mic-fill" : "bi-mic"}`}></i>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default VoiceChatPage;
