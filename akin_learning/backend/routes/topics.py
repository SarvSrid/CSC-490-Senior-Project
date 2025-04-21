from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os

from akin_learning.backend.routes.config.model import get_db_connection

topics_blueprint = Blueprint('topics_blueprint', __name__, url_prefix='/topics')


@topics_blueprint.route('/fetch', methods=['GET'])
def get_topics():
    subject_id = request.args.get("subject_id")  # Get subject_id from query params
    user_id = request.args.get("user_id")  # Get user_id from query params

    if not subject_id:
        return jsonify({"error": "subject_id is required"}), 400
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        user_id = int(user_id)  # Ensure user_id is an integer
        subject_id = int(subject_id)  # Convert subject_id to integer
    except ValueError:
        return jsonify({"error": "subject_id and user_id must be a valid integer"}), 400

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
        ORDER BY 
            t.id
        """
        
        cursor.execute(query, (user_id, subject_id))
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
