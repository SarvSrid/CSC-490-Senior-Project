from flask import Flask, request, redirect, session
from flask_cors import CORS

from akin_learning.backend.routes import *

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Register blueprints
for blueprint in api_blueprints:
    app.register_blueprint(blueprint, url_prefix="/api")

for blueprint in app_blueprints:
    app.register_blueprint(blueprint)

@app.before_request
def enforce_auth():
    protected_routes = ['dashboard', 'profile', 'settings']  # List of protected endpoints
    if request.endpoint in protected_routes and 'google_id' not in session:
        return redirect('/login')  # Redirect if not authenticated


if __name__ == '__main__':
    app.run(port=5000)
