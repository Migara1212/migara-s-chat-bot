import React, { useState, useRef } from "react";

function ChatInput({ onSend, enableVoice = false }) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
      if (inputRef.current) inputRef.current.blur();
    }
  };

  const handleVoiceInput = () => {
    if (!enableVoice) return;

    if (!recognitionRef.current) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const voiceText = event.results[0][0].transcript;
        setInput(voiceText);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <>
      <style>{`
        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 8px 0 rgba(10, 38, 71, 0.7);
          }
          50% {
            box-shadow: 0 0 20px 6px rgba(10, 38, 71, 0.4);
          }
          100% {
            box-shadow: 0 0 8px 0 rgba(10, 38, 71, 0.7);
          }
        }
        @media (max-width: 576px) {
          .chat-input-container {
            padding: 8px 12px !important;
            gap: 8px !important;
          }
          .chat-input-container input {
            font-size: 1rem !important;
            padding: 8px !important;
          }
          .chat-input-container button.send-btn {
            padding: 6px 16px !important;
            font-size: 0.9rem !important;
            min-width: 50px !important;
            height: 40px !important;
          }
          .chat-input-left {
            flex-grow: 1 !important;
          }
        }
      `}</style>

      <div
        className="chat-input-container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 15px",
          background: "#fff",
          borderRadius: "30px",
          boxShadow: "0 2px 6px rgb(0 0 0 / 0.15)",
          maxWidth: "600px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Left side: input + voice */}
        <div
          className="chat-input-left"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexGrow: 1,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              flexGrow: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              padding: "10px",
              fontSize: "1.1rem",
              minWidth: 0,
              borderRadius: "30px",
              boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
          />

          {enableVoice && (
            <button
              onClick={handleVoiceInput}
              style={{
                backgroundColor: "#0A2647",
                borderRadius: "30px",
                padding: "8px 16px",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
                animation: isListening
                  ? "glowPulse 2s infinite ease-in-out"
                  : "none",
                border: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isListening
                  ? "0 0 8px rgba(10, 38, 71, 0.7)"
                  : "none",
                minWidth: "44px",
                height: "44px",
              }}
              title={isListening ? "Stop Listening" : "Start Voice Input"}
              aria-label={
                isListening ? "Stop voice input" : "Start voice input"
              }
            >
              <i
                className={`bi ${isListening ? "bi-mic-fill" : "bi-mic"}`}
                style={{ fontSize: "1.3rem", lineHeight: 1 }}
              />
            </button>
          )}
        </div>

        {/* Send button outside input area with icon only */}
        <button
          className="btn text-white border-0 shadow send-btn"
          style={{
            backgroundColor: "#0A2647",
            borderRadius: "30px",
            padding: "8px 20px",
            fontSize: "1.2rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            minWidth: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleSend}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#144272")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#0A2647")
          }
          aria-label="Send message"
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </div>
    </>
  );
}

export default ChatInput;
