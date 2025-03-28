from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os

# If you have issues with connecting to the database, you can print the database URI to verify
# $env:DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase"

# Initialize Flask app
app = Flask(__name__)

# Load database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL")

# Initialize extensions
jwt = JWTManager(app)  # Keep JWTManager for future use
CORS(app)  # Enable CORS

# Database connection function
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

@app.route('/api/progress', methods=['GET'])
def get_progress():
    """
    Fetch progress data for the user, grouped by subject.
    """
    user_id = request.args.get("user_id")  # Get user_id from query params
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        user_id = int(user_id)  # Ensure user_id is an integer
    except ValueError:
        return jsonify({"error": "user_id must be a valid integer"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Fetch progress data grouped by subject
        cursor.execute("""
            SELECT 
                s.id AS subject_id,
                s.name AS subject_name,
                COALESCE(AVG(p.percentage), 0) AS average_percentage
            FROM subject s
            JOIN topic t ON t.subject_id = s.id
            JOIN progress p ON p.topic_id = t.id
            WHERE p.user_id = %s
            GROUP BY s.id, s.name
        """, (user_id,))
        progress_data = cursor.fetchall()

        cursor.close()
        conn.close()

        if not progress_data:
            return jsonify({"error": "No progress data found for the given user_id"}), 404

        # Format the response
        response = [
            {
                "subject_id": row['subject_id'],
                "subject": row['subject_name'],
                "average_progress": float(row['average_percentage'])  # Convert to float
            }
            for row in progress_data
        ]
        return jsonify(response), 200

    except Exception as e:
        print(f"Error occurred: {e}", flush=True)
        return jsonify({"error": "An error occurred while fetching progress data"}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)