import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton"; // Adjust path as needed

function HomePage() {
  const navigate = useNavigate();

  return React.createElement(
    "div",
    {
      className:
        "d-flex flex-column justify-content-center align-items-center vh-100 text-white text-center",
      style: {
        backgroundColor: "#71C0BB",
        //backgroundImage: 'url("/blue-background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",
      },
    },
    React.createElement(
      "h1",
      { className: "mb-4" },
      "Welcome to English Chatbot"
    ),
    React.createElement(
      "div",
      { className: "d-flex gap-3 mb-3" },
      React.createElement(
        "button",
        {
          className: "btn btn-outline-light rounded-pill px-4 py-2",
          onClick: function () {
            navigate("/chat");
          },
        },
        "Text Chat"
      ),
      React.createElement(
        "button",
        {
          className: "btn btn-outline-light rounded-pill px-4 py-2",
          onClick: function () {
            navigate("/voice");
          },
        },
        "Voice Chat"
      )
    ),
    React.createElement(GoogleLoginButton, null)
  );
}

export default HomePage;
