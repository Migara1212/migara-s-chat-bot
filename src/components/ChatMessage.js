import React from "react";

function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`d-flex ${
        isUser ? "justify-content-end" : "justify-content-start"
      } mb-2`}
    >
      <div
        className={`p-2 px-3 rounded-pill ${
          isUser ? "bg-primary text-white" : "bg-light text-dark"
        }`}
        style={{ maxWidth: "80%" }}
      >
        {message.text}
      </div>
    </div>
  );
}

export default ChatMessage;
