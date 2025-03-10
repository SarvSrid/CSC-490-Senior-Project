from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from utils.db import db
from models import Progress, Topic, Subject

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
def get_average_progress():
    user_id = request.args.get("user_id")  # Get user_id from query params
    print("Received user_id:", user_id)
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    # Query to calculate the average progress for each subject
    average_progress_data = db.session.query(
        Subject.name,
        db.func.round(db.func.avg(Progress.percentage), 2).label("average_progress")
    ).join(Topic, Subject.id == Topic.subject_id
    ).join(Progress, Topic.id == Progress.topic_id
    ).filter(Progress.user_id == user_id
    ).group_by(Subject.name).all()

    # Format the response
    response = [{"subject": subject_name, "average_progress": float(avg_progress)} 
                for subject_name, avg_progress in average_progress_data]

    return jsonify(response), 200
# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    print("Please rename this file from 'progress.py' to 'topicAPI.py' to follow the naming convention.")
    app.run(debug=True)
    