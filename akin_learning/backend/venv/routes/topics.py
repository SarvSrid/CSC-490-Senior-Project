from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from utils.db import db
from models import Topic, Subject, SubTopic  # Corrected import

# If you have issues with connecting to the database, you can print the database URI to verify
# $env:DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase"

app = Flask(__name__)
app.config.from_object(Config)

# Print the database URI to verify
print("SQLALCHEMY_DATABASE_URI:", app.config['SQLALCHEMY_DATABASE_URI'], flush=True)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)
CORS(app)  # Enable CORS

@app.route('/api/subtopics', methods=['GET'])
def get_subtopics():
    topic_id = request.args.get("topic_id")  # Get topic_id from query params
    if not topic_id:
        return jsonify({"error": "topic_id is required"}), 400

    # Fetch subtopics for the topic
    subtopics = SubTopic.query.filter_by(topic_id=topic_id).all()

    # Format the response
    response = [
        {
            "id": subtopic.id,
            "name": subtopic.name,
            "difficulty_level": subtopic.difficulty_level
        }
        for subtopic in subtopics
    ]
    return jsonify(response), 200

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5002)