# from flask import request, jsonify
# from flask_jwt_extended import create_access_token
# from ..models import UserProfile, db
# from datetime import datetime

# def init_auth_routes(app):
#     @app.route('/register', methods=['POST'])
#     def register():
#         data = request.get_json()
#         new_user = UserProfile(
#             email=data['email'],
#             username=data['username'],
#             password=data['password'],  # In a real app, hash the password!
#             date_created=datetime.utcnow()
#         )
#         db.session.add(new_user)
#         db.session.commit()
#         return jsonify(message='User registered successfully'), 201

#     @app.route('/login', methods=['POST'])
#     def login():
#         data = request.get_json()
#         user = UserProfile.query.filter_by(email=data['email']).first()
#         if user and user.password == data['password']:  # In a real app, verify hashed password!
#             access_token = create_access_token(identity=user.id)
#             return jsonify(access_token=access_token), 200
#         return jsonify(message='Invalid credentials'), 401

from flask import Flask, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_dance.contrib.google import make_google_blueprint, google
from ..config import Config
from ..models import db, User  # Assuming you have a User model
from .auth_test import init_auth_routes  # Updated import
from .topics import init_topics_routes  # Updated import
from .questions import init_questions_routes  # Updated import

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)

# Initialize Google OAuth
google_bp = make_google_blueprint(
    client_id=app.config['GOOGLE_OAUTH_CLIENT_ID'],
    client_secret=app.config['GOOGLE_OAUTH_CLIENT_SECRET'],
    redirect_to='google_login'
)
app.register_blueprint(google_bp, url_prefix='/login')

# Initialize routes
init_auth_routes(app)
init_topics_routes(app)
init_questions_routes(app)

# Create database tables
with app.app_context():
    db.create_all()

@app.route('/google_login')
def google_login():
    if not google.authorized:
        return redirect(url_for('google.login'))
    resp = google.get('/plus/v1/people/me')
    assert resp.ok, resp.text
    email = resp.json()['emails'][0]['value']
    user = User.query.filter_by(email=email).first()
    if user:
        # User exists, log them in (you can use JWT or session)
        session['user_id'] = user.id
        return redirect(url_for('dashboard'))
    else:
        # User does not exist, handle accordingly
        return 'User not found', 404

if __name__ == '__main__':
    app.run(debug=True)