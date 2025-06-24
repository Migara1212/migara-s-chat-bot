import React from "react";
import { motion } from "framer-motion";

function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      className="d-flex mb-3"
      style={{
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div
        style={{
          maxWidth: "75%",
          background: isUser
            ? "linear-gradient(to right, #0A2647, #144272)"
            : "rgba(255, 255, 255, 0.85)",
          color: isUser ? "#fff" : "#0A2647",
          padding: "12px 18px",
          borderRadius: isUser ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
          fontSize: "1rem",
          lineHeight: "1.5",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        }}
      >
        {message.text}
      </div>
    </motion.div>
  );
}

export default ChatMessage;
