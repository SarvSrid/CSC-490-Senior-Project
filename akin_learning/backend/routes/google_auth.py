import google
from flask import Flask, jsonify, request, session, redirect, abort, Blueprint, current_app
from flask_cors import CORS # Enable Cross-Origin Resource Sharing
from google.oauth2 import id_token
from google.auth.transport.requests import Request

from google_auth_oauthlib.flow import Flow

import os

from akin_learning.backend.routes.config.model import get_db_connection

google_auth_blueprint = Blueprint('google_auth', __name__, url_prefix='/api/google')

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

CLIENT_SECRETS_FILE = "akin_learning/backend/routes/config/client_secret.json"
print("Resolved file path:", os.path.abspath(CLIENT_SECRETS_FILE)) #DEBUG

flow = Flow.from_client_secrets_file(
    CLIENT_SECRETS_FILE,
    scopes=["https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid"],
    redirect_uri='http://localhost:5000/api/google/callback'
)

@google_auth_blueprint.route('/send')
def google_login():

    authorization_url, state = flow.authorization_url()
    session['state'] = state
    return redirect(authorization_url)

@google_auth_blueprint.route('/callback')
def google_callback():

    state = session.get('state')

    print("State:", state)

    if state is None or state != request.args.get('state'):
        abort(401)  # Unauthorized
    try:
        token = flow.fetch_token(authorization_response=request.url)
        session['credentials'] = token

        jwt_token = token['id_token']
        id_info = id_token.verify_oauth2_token(
            jwt_token,
            Request(),
            flow.client_config['client_id']
        )

        if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        google_user_id = id_info['sub']
        google_user_email = id_info.get('email')
        google_user_name = id_info.get('name')

        # print("Google User ID:", google_user_id)
        # print("Google User Email:", google_user_email)
        # print("Google User Name:", google_user_name)
        # Sessions
        session['google_id'] = google_user_id
        session['email'] = google_user_email
        session['name'] = google_user_name
        credentials = flow.credentials
        session['access_token'] = credentials.token  # Access token
        # refresh not necessary right now
        # session['refresh_token'] = credentials.refresh_token  # Refresh token
        session['expires_in'] = credentials.expiry  # Expiration time


        conn = get_db_connection()
        cur = conn.cursor()

        try:
            cur.execute("SELECT * FROM user_profile WHERE google_id = %s",
                        (google_user_id,))
            user = cur.fetchone()
            if user is None:
                cur.execute("INSERT INTO user_profile(google_id, email, username, password) VALUES (%s, %s, %s, NULL)",
                            (google_user_id, google_user_email, google_user_name))
                user_id = cur.fetchone()[0]
                conn.commit()
            else:
                user_id = user[0]

            session['user_id'] = user_id


        except Exception as e:
            print("Database Error:", e)

        # Redirect to a logged-in area
        return redirect('http://localhost:5000/dashboard/home')
    except Exception as e:
        print("Error processing Google callback:", e)
        return "Failed to log in with Google."

@google_auth_blueprint.route('/debug-session')
def debug_session():
    print(session)  # Outputs session data to the terminal
    return jsonify(dict(session))  # Returns the session data as a JSON response
