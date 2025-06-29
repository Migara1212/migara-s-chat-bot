import React, { useState, useRef } from "react";

function ChatInput({ onSend, enableVoice = false }) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null); // Store recognition instance

  // Handle sending text
  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  // Toggle voice input
  const handleVoiceInput = () => {
    if (!enableVoice) return;

    // Initialize only once
    if (!recognitionRef.current) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = false;

      // When voice is recognized
      recognitionRef.current.onresult = (event) => {
        const voiceText = event.results[0][0].transcript;
        setInput(voiceText);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Toggle on/off
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="d-flex justify-content-center px-2">
      <div
        className="d-flex flex-grow-1 align-items-center gap-2 px-3 py-2 shadow rounded-pill"
        style={{
          maxWidth: "600px",
          backgroundColor: "#ffffff",
        }}
      >
        <input
          type="text"
          className="form-control border-0 shadow-none"
          style={{
            backgroundColor: "transparent",
            padding: "8px 0",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />

        {/* Voice Button Styled Like Send Button */}
        {enableVoice && (
          <button
            className="btn text-white border-0 shadow d-flex align-items-center justify-content-center"
            onClick={handleVoiceInput}
            style={{
              backgroundColor: "#0A2647",
              borderRadius: "30px",
              padding: "6px 20px",
              transition: "background-color 0.3s ease",
              fontSize: "1rem",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#144272")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#0A2647")}
            title={isListening ? "Stop Listening" : "Start Voice Input"}
          >
            <i className={`bi ${isListening ? "bi-mic-fill" : "bi-mic"}`}></i>
          </button>
        )}

        {/* Send Button */}
        <button
          className="btn text-white border-0 shadow"
          style={{
            backgroundColor: "#0A2647",
            borderRadius: "30px",
            padding: "6px 20px",
            transition: "background-color 0.3s ease",
          }}
          onClick={handleSend}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#144272")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0A2647")}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
