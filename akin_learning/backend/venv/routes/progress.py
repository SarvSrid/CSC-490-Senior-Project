from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from utils.db import db
from models import Progress, Topic, Subject

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

@app.route('/api/progress', methods=['GET'])
def get_progress():
    try:
        user_id = request.args.get("user_id")  # Get user_id from query params
        print("Received user_id:", user_id, flush=True)
        if not user_id:
            return jsonify({"error": "user_id is required"}), 400

        # Fetch progress data for the user, grouped by subject
        progress_data = db.session.query(
            Subject.id.label("subject_id"),  # Include subject_id
            Subject.name.label("subject_name"),  # Include subject name
            db.func.avg(Progress.percentage).label("average_percentage")  # Calculate average percentage
        ).join(Topic, Topic.subject_id == Subject.id) \
         .join(Progress, Progress.topic_id == Topic.id) \
         .filter(Progress.user_id == user_id) \
         .group_by(Subject.id, Subject.name) \
         .all()

        if not progress_data:
            return jsonify({"error": "No progress data found for the given user_id"}), 404

        # Format the response
        response = [
            {
                "subject_id": row.subject_id,
                "subject": row.subject_name,
                "average_progress": float(row.average_percentage)  # Convert to float
            }
            for row in progress_data
        ]
        return jsonify(response), 200
    except Exception as e:
        print(f"Error occurred: {e}", flush=True)
        return jsonify({"error": "An error occurred while fetching progress data"}), 500

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    print("Please rename this file from 'progress.py' to 'topicAPI.py' to follow the naming convention.")
    app.run(debug=True, port=5000)