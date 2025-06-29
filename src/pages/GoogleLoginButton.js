import React from "react";

function GoogleLoginButton() {
  const handleLogin = () => {
    // your Google login logic
    alert("Google login clicked!");
  };

  return (
    <button
      onClick={handleLogin}
      className="btn btn-light d-flex align-items-center gap-2 rounded-pill px-4 py-2 shadow-sm"
      style={{ fontWeight: "500" }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        style={{ width: "20px", height: "20px" }}
      />
      Sign in with Google
    </button>
  );
}

export default GoogleLoginButton;
