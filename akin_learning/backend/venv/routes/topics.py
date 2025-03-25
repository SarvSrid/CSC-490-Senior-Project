from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os

# If you have issues with connecting to the database, you can print the database URI to verify
# $env:DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase"

app = Flask(__name__)

# Load database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:sharksnow@localhost:5432/akin_learning")

# Print the database URI to verify
print("DATABASE_URL:", DATABASE_URL, flush=True)

# Initialize extensions
jwt = JWTManager(app)
CORS(app)  # Enable CORS

# Database connection function
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

@app.route('/api/topics', methods=['GET'])
def get_topics():
    subject_id = request.args.get("subject_id")  # Get subject_id from query params
    if not subject_id:
        return jsonify({"error": "subject_id is required"}), 400

    try:
        subject_id = int(subject_id)  # Convert subject_id to integer
    except ValueError:
        return jsonify({"error": "subject_id must be a valid integer"}), 400

    # Fetch topics for the subject using raw SQL
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        # Updated table name to "topic"
        cursor.execute("SELECT id, name, difficulty_level FROM topic WHERE subject_id = %s", (subject_id,))
        topics = cursor.fetchall()
        cursor.close()
        conn.close()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Format the response
    response = [
        {
            "id": topic['id'],
            "name": topic['name'],
            "difficulty_level": topic['difficulty_level']
        }
        for topic in topics
    ]
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True, port=5002)