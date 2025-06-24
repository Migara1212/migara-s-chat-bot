from flask import Flask, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests

app = Flask(__name__)

GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"

@app.route("/api/auth/google", methods=["POST"])
def google_auth():
    token = request.json.get("token")
    try:
        # Verify the token with Google
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)

        # idinfo contains user info
        user_info = {
            "user_id": idinfo["sub"],
            "email": idinfo.get("email"),
            "name": idinfo.get("name"),
            "picture": idinfo.get("picture"),
        }

        return jsonify(user_info)

    except ValueError:
        # Invalid token
        return jsonify({"error": "Invalid token"}), 400

if __name__ == "__main__":
    app.run(debug=True)
