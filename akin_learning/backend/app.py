from flask import Flask, request, redirect, session
from flask_cors import CORS
import os
from akin_learning.backend.routes import api_blueprints, app_blueprints, google_auth_blueprint

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

app.secret_key = os.getenv("FLASK_SECRET_KEY")
# print(app.secret_key) #debug

# Register blueprints
for blueprint in api_blueprints:
    app.register_blueprint(blueprint)

for blueprint in app_blueprints:
    app.register_blueprint(blueprint)

# @app.before_request
# def enforce_auth():
#     protected_routes = ['dashboard', 'profile', 'settings']  # List of protected endpoints
#     if request.endpoint in protected_routes and 'google_id' not in session:
#         return redirect('/login')  # Redirect if not authenticated

print("Registered Routes:")
for rule in app.url_map.iter_rules():
    print(rule)

if __name__ == '__main__':
    app.run(port=5000)
