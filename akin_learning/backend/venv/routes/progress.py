from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from utils.db import db
from models import Progress, Topic

#If you have issues with connecting to the database, you can print the database URI to verify
# $env:DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase"

app = Flask(__name__)
app.config.from_object(Config)

# Print the database URI to verify
print("SQLALCHEMY_DATABASE_URI:", app.config['SQLALCHEMY_DATABASE_URI'])

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)
CORS(app)  # Enable CORS

# Define the route handler
@app.route('/api/progress', methods=['GET'])
def get_progress():
    user_id = request.args.get("user_id")  # Get user_id from query params
    print("Received user_id:", user_id)
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    # Fetch progress data for the user
    progress_data = db.session.query(
        Topic.name,
        Progress.percentage
    ).join(Progress, Progress.topic_id == Topic.id).filter(
        Progress.user_id == user_id
    ).all()

    # Format the response
    response = [{"topic": topic_name, "percentage": float(percentage)} for topic_name, percentage in progress_data]
    return jsonify(response), 200

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    print("Please rename this file from 'progress.py' to 'topicAPI.py' to follow the naming convention.")
    app.run(debug=True)
    