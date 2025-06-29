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
      if (inputRef.current) inputRef.current.blur(); // close keyboard on mobile
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
      <input
        ref={inputRef}
        type="text"
        style={{
          flexGrow: 1,
          border: "none",
          outline: "none",
          boxShadow: "none",
          background: "transparent",
          padding: "10px",
          fontSize: "1rem",
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
            backgroundColor: isListening ? "#c82333" : "#0A2647",
            borderRadius: "30px",
            padding: "8px 20px",
            transition: "background-color 0.3s ease",
            cursor: "pointer",
            border: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title={isListening ? "Stop Listening" : "Start Voice Input"}
        >
          <i
            className={`bi ${isListening ? "bi-mic-fill" : "bi-mic"}`}
            style={{ fontSize: "1.2rem", lineHeight: 1 }}
          />
        </button>
      )}

      <button
        className="btn text-white border-0 shadow"
        style={{
          backgroundColor: "#0A2647",
          borderRadius: "30px",
          padding: "8px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={handleSend}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#144272")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0A2647")}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
