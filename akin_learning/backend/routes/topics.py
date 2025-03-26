from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from utils.db import db
from models import Topic, Subject  # Import the Topic and Subject models

app = Flask(__name__)
app.config.from_object(Config)

# Print the database URI to verify
print("SQLALCHEMY_DATABASE_URI:", app.config['SQLALCHEMY_DATABASE_URI'], flush=True)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)
CORS(app)  # Enable CORS

@app.route('/api/topics', methods=['GET'])
def get_topics():
    subject_id = request.args.get("subject_id")  # Get subject_id from query params
    if not subject_id:
        return jsonify({"error": "subject_id is required"}), 400

    try:
        subject_id = int(subject_id)  # Convert subject_id to integer
    except ValueError:
        return jsonify({"error": "subject_id must be a valid integer"}), 400

    # Fetch topics for the subject
    topics = Topic.query.filter_by(subject_id=subject_id).all()

    # Format the response
    response = [
        {
            "id": topic.id,
            "name": topic.name,
            "difficulty_level": topic.difficulty_level
        }
        for topic in topics
    ]
    return jsonify(response), 200

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5002)