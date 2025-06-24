import React, { useEffect } from "react";

function GoogleLoginButton() {
  useEffect(() => {
    function handleCredentialResponse(response) {
      console.log("JWT Token:", response.credential);
      // Send token to backend here
    }

    function initializeGSI() {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large", shape: "pill" }
      );
      // Do NOT call prompt()
    }

    if (window.google && window.google.accounts) {
      initializeGSI();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGSI;
      document.body.appendChild(script);
    }
  }, []);

  return React.createElement("div", {
    id: "googleSignInDiv",
    style: { display: "flex", justifyContent: "center", marginTop: "20px" },
  });
}

export default GoogleLoginButton;
