from flask import Flask, jsonify, request, session, redirect, abort
from flask_cors import CORS # Enable Cross-Origin Resource Sharing
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
import os
from config.db_config import get_db_connection


app = Flask(__name__)
CORS(app)
app.secret_key = ""

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

CLIENT_SECRETS_FILE = "config/client_secret.json"
print("Resolved file path:", os.path.abspath(CLIENT_SECRETS_FILE))

flow = Flow.from_client_secrets_file(
    CLIENT_SECRETS_FILE,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", 
            "https://www.googleapis.com/auth/userinfo.email", 
            "openid"],
    redirect_uri='http://localhost:5000/callback'
)

@app.route('/google')
def google_login():
    authorization_url, state = flow.authorization_url()
    session['state'] = state
    return redirect(authorization_url)

@app.route('/callback')
def google_callback():
    
    state = session.get('state')

    if state is None or state != request.args.get('state'):
        abort(401)  # Unauthorized
    try:
        token = flow.fetch_token(authorization_response=request.url)
        session['credentials'] = token

        id_info = id_token.verify_oauth2_token(
            token['id_token'],
            flow.client_config['client_id']
        )

        if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        google_user_id = id_info['sub']
        google_user_email = id_info.get('email')
        google_user_name = id_info.get('name')

        session['google_id'] = google_user_id
        session['email'] = google_user_email
        session['name'] = google_user_name

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            """
            SELECT * 
            FROM user_profile WHERE google_id = %s
            """,
            (google_user_id,)
        )
        user = cur.fetchone()
        if user is None:
            cur.execute(
                """
                INSERT INTO user_profile(google_id, email, username, password)
                VALUES (%s, %s, %s, NULL)
                """,
                (google_user_id, google_user_email, google_user_name)
            )
        cur.close()
        conn.close()

        # Redirect to a logged-in area
        return redirect('/dashboard')

    except Exception as e:
        print("Error processing Google callback:", e)
        return "Failed to log in with Google."

@app.route('/debug-session')
def debug_session():
    print(session)  # Outputs session data to the terminal
    return jsonify(dict(session))  # Returns the session data as a JSON response

# CORS(app)  # Enable CORS

# # Static user data for 5 users mapped by their email addresses.
# registered_users = {
#     "sarveshsridhe@gmail.com": {
#         "username": "User1",
#         "address": "100 First St, CityA",
#         "phone": "111-111-1111"
#     },
#     "user2@example.com": {
#         "username": "User2",
#         "address": "200 Second St, CityB",
#         "phone": "222-222-2222"
#     },
#     "user3@example.com": {
#         "username": "User3",
#         "address": "300 Third St, CityC",
#         "phone": "333-333-3333"
#     },
#     "user4@example.com": {
#         "username": "User4",
#         "address": "400 Fourth St, CityD",
#         "phone": "444-444-4444"
#     },
#     "user5@example.com": {
#         "username": "User5",
#         "address": "500 Fifth St, CityE",
#         "phone": "555-555-5555"
#     }
# }

# # Replace with your actual Google client ID.
# GOOGLE_CLIENT_ID = ""

# @app.route('/api/dashboard', methods=['GET'])
# def dashboard():
#     auth_header = request.headers.get('Authorization')
#     if not auth_header:
#         abort(401, description="Missing authorization token")
    
#     token = auth_header.split(' ')[1] if ' ' in auth_header else auth_header
#     print(f"Received token: {token}", flush=True)
    
#     try:
#         # Verify the token using Google's public keys.
#         idinfo = id_token.verify_oauth2_token(token, grequests.Request(), GOOGLE_CLIENT_ID)
#         print("Decoded token info:", idinfo, flush=True)
#         user_email = idinfo.get("email")
#         print(f"Extracted user email: {user_email}", flush=True)
#         if not user_email:
#             abort(401, description="Email not found in token")
#         if user_email not in registered_users:
#             print(f"User {user_email} is not in registered_users", flush=True)
#             abort(403, description="User authenticated but not registered")
#         # Valid and registered user returns a 200 along with user data.
#         return jsonify(registered_users[user_email])
#     except HTTPException as http_ex:
#         # Re-raise HTTPExceptions so that the intended status code is preserved.
#         raise http_ex
#     except ValueError as ve:
#         print(f"Token verification error: {ve}", flush=True)
#         abort(401, description="User not authenticated")
#     except Exception as e:
#         print(f"Unexpected error: {e}", flush=True)
#         abort(500, description="Internal server error")

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)