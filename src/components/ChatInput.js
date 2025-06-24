import React, { useState } from "react";

function ChatInput({ onSend, enableVoice = false }) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleVoiceInput = () => {
    if (!enableVoice) return;

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setInput(voiceText);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
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

        {enableVoice && (
          <button
            className={`btn ${
              isListening ? "btn-danger" : "btn-outline-secondary"
            } border-0`}
            onClick={handleVoiceInput}
            style={{ borderRadius: "50%" }}
          >
            {isListening ? "🎙️" : "🎤"}
          </button>
        )}

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
