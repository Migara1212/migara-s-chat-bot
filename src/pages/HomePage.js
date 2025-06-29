import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

function HomePage() {
  const navigate = useNavigate();

  return React.createElement(
    "div",
    {
      className:
        "d-flex flex-column justify-content-center align-items-center vh-100 text-white text-center",
      style: {
        backgroundColor: "#71C0BB",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",
      },
    },
    React.createElement(
      "h1",
      { className: "mb-4 fw-bold", style: { fontSize: "2.5rem" } },
      "Welcome to English Chatbot"
    ),
    React.createElement(
      "div",
      { className: "d-flex flex-column gap-3 mb-3 align-items-center" },
      React.createElement(
        "button",
        {
          className: "btn btn-outline-light rounded-pill px-4 py-2 shadow-sm",
          style: {
            fontWeight: "500",
            fontSize: "1.1rem",
            minWidth: "180px",
          },
          onClick: () => navigate("/chat"),
        },
        "Start Chat"
      ),
      React.createElement(GoogleLoginButton, null)
    )
  );
}

export default HomePage;
