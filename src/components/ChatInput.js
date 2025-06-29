import React, { useState, useRef } from "react";

function ChatInput({ onSend, enableVoice = false }) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
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
    <div className="d-flex justify-content-center px-2">
      <div
        className="d-flex flex-column flex-sm-row flex-grow-1 align-items-center gap-2 px-3 py-2 shadow rounded-pill"
        style={{
          maxWidth: "100%",
          backgroundColor: "#ffffff",
        }}
      >
        <input
          type="text"
          className="form-control border-0 shadow-none flex-grow-1"
          style={{
            backgroundColor: "transparent",
            padding: "8px 0",
            minWidth: 0,
            fontSize: "1rem",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />

        <div className="d-flex gap-2 mt-2 mt-sm-0">
          {enableVoice && (
            <button
              onClick={handleVoiceInput}
              className="btn text-white border-0 shadow d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#0A2647",
                borderRadius: "30px",
                padding: "6px 20px",
                fontSize: "1rem",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#144272")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A2647")
              }
              title={isListening ? "Stop Listening" : "Start Voice Input"}
            >
              <i
                className={`bi ${isListening ? "bi-mic-fill" : "bi-mic"}`}
                style={{
                  fontSize: "1.2rem",
                  display: "block",
                  lineHeight: 1,
                }}
              ></i>
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
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#144272")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#0A2647")
            }
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
