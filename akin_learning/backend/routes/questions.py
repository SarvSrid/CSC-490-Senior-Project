from flask import Flask, jsonify, request, Blueprint
from psycopg2.extras import RealDictCursor
import os

from akin_learning.backend.routes.config.model import get_db_connection


questions_blueprint = Blueprint('questions_blueprint', __name__, url_prefix='/questions')

@questions_blueprint.route('/fetch', methods=['GET'])
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


@questions_blueprint.route('/next', methods=['POST'])
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

        cursor.execute("""
            INSERT INTO user_topic_progress (user_id, topic_id, last_visited_question_id, updated_at)
            VALUES (%s, %s, %s, NOW())
            ON CONFLICT (user_id, topic_id) 
            DO UPDATE SET last_visited_question_id = %s, updated_at = NOW()
        """, (TEST_USER_ID, question['topic_id'], question_id, question_id))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({
            'is_correct': is_correct,
            'correct_option_id': correct_option['id']
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/api/user-progress', methods=['GET'])
def get_user_progress():
    """
    Fetch user's progress including last visited questions for topics.
    Returns the top 3 most recently updated topics per subject
    that are not yet 100% complete.
    """
    try:
        # Get user_id from query parameters, default to TEST_USER_ID if missing
        user_id = request.args.get("user_id", TEST_USER_ID)

        # Open database connection and create a cursor that returns dicts
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # SQL query:
        # 1. Inner subquery "sub" ranks each topic by most recent update per subject
        # 2. Outer query selects only the top 3 per subject (rn <= 3)
        # 3. Left join to progress table to fetch progress details
        # 4. Filter out topics already at 100% progress
        query = """
        SELECT 
            sub.topic_id,
            sub.last_visited_question_id,
            sub.name,
            sub.subject_id,
            sub.updated_at,
            sub.difficulty_level,
            COALESCE(p.percentage, 0) AS progress_percentage,
            COALESCE(p.active_questions, 0) AS active_questions,
            COALESCE(p.completed_questions, 0) AS completed_questions
        FROM (
            SELECT 
                utp.topic_id,
                utp.last_visited_question_id,
                t.name,
                t.subject_id,
                utp.updated_at,
                t.difficulty_level,
                ROW_NUMBER() OVER (
                  PARTITION BY t.subject_id 
                  ORDER BY utp.updated_at DESC
                ) AS rn
            FROM user_topic_progress utp
            JOIN topic t 
              ON utp.topic_id = t.id
            WHERE utp.user_id = %s
        ) sub
        LEFT JOIN progress p 
          ON sub.topic_id = p.topic_id 
         AND p.user_id = %s
        WHERE sub.rn <= 3
          AND COALESCE(p.percentage, 0) < 100
        ORDER BY sub.subject_id, sub.updated_at DESC;
        """

        # Execute query with user_id for both subquery and join
        cursor.execute(query, (user_id, user_id))

        # Fetch all matching rows
        progress_data = cursor.fetchall()

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Return the results as JSON
        return jsonify(progress_data), 200

    except Exception as e:
        # On error, return error message as JSON
        return jsonify({"error": str(e)}), 500
