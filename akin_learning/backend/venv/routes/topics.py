from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Flask(__name__)

# Load database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:sharksnow@localhost:5432/akin_learning")

# Print the database URI to verify
print("DATABASE_URL:", DATABASE_URL, flush=True)

# Initialize extensions
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

    # Hardcoded user ID
    current_user_id = 1

    # Fetch topics with progress for the subject using raw SQL
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Query to get topics with progress information
        query = """
        SELECT 
            t.id, 
            t.name, 
            t.difficulty_level,
            COALESCE(p.percentage, 0) AS progress_percentage,
            COALESCE(p.active_questions, 0) AS active_questions,
            COALESCE(p.completed_questions, 0) AS completed_questions
        FROM 
            topic t
        LEFT JOIN 
            progress p ON t.id = p.topic_id AND p.user_id = %s
        WHERE 
            t.subject_id = %s
        """
        
        cursor.execute(query, (current_user_id, subject_id))
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
            "difficulty_level": topic['difficulty_level'],
            "progress": {
                "percentage": float(topic['progress_percentage']),  # Convert Decimal to float for JSON
                "active_questions": topic['active_questions'],
                "completed_questions": topic['completed_questions']
            }
        }
        for topic in topics
    ]
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True, port=5002)