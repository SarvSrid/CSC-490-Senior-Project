from flask import Flask, request, redirect, session
from flask_cors import CORS
import os
from akin_learning.backend.routes import api_blueprints, app_blueprints, google_auth_blueprint

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
app.secret_key = os.getenv("FLASK_SECRET_KEY")
# print(app.secret_key) #debug

# Register blueprints
for blueprint in api_blueprints:
    app.register_blueprint(blueprint)

for blueprint in app_blueprints:
    app.register_blueprint(blueprint)

# Currently Dormant Code
# @app.before_request
# def enforce_auth():
#     protected_routes = ['dashboard', 'profile', 'settings']  # List of protected endpoints
#     print("endpoint split:", request.endpoint.split('.')[0])
#     print("endpoint:", request.endpoint)
#     if request.endpoint.split('.')[0] in protected_routes:
#         print("working")
#         return redirect('http://localhost:5000/auth/')

    # if request.endpoint.startswith(protected_routes) and ('google_id' or 'user_id' ) not in session:
    #     return redirect('http')  # Redirect if not authenticated

print("Registered Routes:")
for rule in app.url_map.iter_rules():
    print(rule)

if __name__ == '__main__':
    app.run(port=5000)
