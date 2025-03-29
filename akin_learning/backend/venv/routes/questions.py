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

# Hardcoded user_id for testing
TEST_USER_ID = 1

# Database connection function
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

# Routes for questions
@app.route('/api/questions', methods=['GET'])
def get_questions():
    """
    Fetch all main questions and their options for the hardcoded user and a specific topic.
    """
    topic_id = request.args.get("topic_id")  # Get topic_id from query params
    if not topic_id:
        return jsonify({"error": "topic_id is required"}), 400

    try:
        topic_id = int(topic_id)  # Ensure topic_id is an integer
    except ValueError:
        return jsonify({"error": "topic_id must be a valid integer"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Fetch main questions for the user and the specific topic
        cursor.execute("""
            SELECT * FROM main_question
            WHERE user_id = %s AND topic_id = %s
            ORDER BY id
        """, (TEST_USER_ID, topic_id))
        main_questions = cursor.fetchall()

        response = []
        for main_question in main_questions:
            # Fetch options for the main question
            # Normalize all line endings and ensure proper escaping
            # header = main_question['header']
            # header = header.replace('\r\n', '\n')  # Convert Windows line endings
            # header = header.replace('\r', '\n')    # Convert old Mac line endings

            header = main_question['header'].replace('\n', '\\n')

            cursor.execute("""
                SELECT * FROM question_option
                WHERE question_id = %s
            """, (main_question['id'],))
            main_options = cursor.fetchall()

            #                'header': main_question['header'].replace('\r\n', '\n'),
            response.append({
                'id': main_question['id'],
                'header': header,
                'subtext': main_question['subtext'],
                'topic_id': main_question['topic_id'],
                'difficulty_level': main_question['difficulty_level'],
                'progress': main_question['progress'],
                'answered_correctly': main_question['progress'] == 100,
                'options': [{
                    'id': opt['id'],
                    'option_text': opt['option_text'],
                    'is_correct': opt['is_correct']
                } for opt in main_options]
            })

        cursor.close()
        conn.close()
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/questions', methods=['POST'])
def create_question():
    """
    Create a new main question with options for the hardcoded user.
    """
    data = request.get_json()

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Create the main question
        cursor.execute("""
            INSERT INTO main_question (header, subtext, user_id, topic_id, difficulty_level, progress)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (data['header'], data['subtext'], TEST_USER_ID, data['topic_id'], data['difficulty_level'], 0))
        new_question_id = cursor.fetchone()[0]

        # Add options for the main question
        for option in data['options']:
            cursor.execute("""
                INSERT INTO question_option (question_id, option_text, is_correct)
                VALUES (%s, %s, %s)
            """, (new_question_id, option['option_text'], option['is_correct']))

        conn.commit()
        cursor.close()
        conn.close()
        return jsonify(message='Question created successfully', question_id=new_question_id), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/questions/<int:question_id>/answer', methods=['POST'])
def answer_question(question_id):
    """
    Handle user's answer to a question and update progress for the hardcoded user.
    """
    data = request.get_json()

    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Fetch the question and correct answer
        cursor.execute("""
            SELECT * FROM main_question
            WHERE id = %s
        """, (question_id,))
        question = cursor.fetchone()

        cursor.execute("""
            SELECT * FROM question_option
            WHERE question_id = %s AND is_correct = TRUE
        """, (question_id,))
        correct_option = cursor.fetchone()

        # Check if the user's answer is correct
        is_correct = (data['selected_option_id'] == correct_option['id'])

        # Update progress
        cursor.execute("""
            SELECT * FROM progress
            WHERE user_id = %s AND topic_id = %s
        """, (TEST_USER_ID, question['topic_id']))
        progress = cursor.fetchone()

        if not progress:
            cursor.execute("""
                INSERT INTO progress (user_id, topic_id, active_questions, completed_questions)
                VALUES (%s, %s, %s, %s)
            """, (TEST_USER_ID, question['topic_id'], 0, 0))
            conn.commit()

        if is_correct:
            cursor.execute("""
                UPDATE progress
                SET completed_questions = completed_questions + 1
                WHERE user_id = %s AND topic_id = %s
            """, (TEST_USER_ID, question['topic_id']))
            cursor.execute("""
                UPDATE main_question
                SET progress = 100
                WHERE id = %s
            """, (question_id,))
        else:
            cursor.execute("""
                UPDATE main_question
                SET progress = GREATEST(progress - 25, 0)
                WHERE id = %s
            """, (question_id,))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({
            'is_correct': is_correct,
            'correct_option_id': correct_option['id']
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5003)