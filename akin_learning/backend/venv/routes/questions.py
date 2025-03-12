from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from utils.db import db
from models import MainQuestion, QuestionOption, Progress

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)  # Keep JWTManager for future use
CORS(app)  # Enable CORS

# Hardcoded user_id for testing
TEST_USER_ID = 1

# Routes for questions
@app.route('/api/questions', methods=['GET'])
def get_questions():
    """
    Fetch all main questions and their options for the hardcoded user.
    """
    main_questions = MainQuestion.query.filter_by(user_id=TEST_USER_ID).order_by(MainQuestion.id).all()

    response = []
    for main_question in main_questions:
        # Fetch options for the main question
        main_options = QuestionOption.query.filter_by(question_id=main_question.id).all()

        response.append({
            'id': main_question.id,
            'header': main_question.header,
            'subtext': main_question.subtext,
            'topic_id': main_question.topic_id,
            'difficulty_level': main_question.difficulty_level,
            'progress': main_question.progress,
            'answered_correctly': main_question.progress == 100,  # Add this line
            'options': [{
                'id': opt.id,
                'option_text': opt.option_text,
                'is_correct': opt.is_correct
            } for opt in main_options]
        })

    return jsonify(response), 200


@app.route('/api/questions', methods=['POST'])
def create_question():
    """
    Create a new main question with options for the hardcoded user.
    """
    data = request.get_json()

    # Create the main question
    new_main_question = MainQuestion(
        header=data['header'],
        subtext=data['subtext'],
        user_id=TEST_USER_ID,  # Use hardcoded user_id
        topic_id=data['topic_id'],
        difficulty_level=data['difficulty_level'],
        progress=0
    )
    db.session.add(new_main_question)
    db.session.commit()

    # Add options for the main question
    for option in data['options']:
        new_option = QuestionOption(
            question_id=new_main_question.id,
            option_text=option['option_text'],
            is_correct=option['is_correct']
        )
        db.session.add(new_option)

    db.session.commit()
    return jsonify(message='Question created successfully', question_id=new_main_question.id), 201


@app.route('/api/questions/<int:question_id>/answer', methods=['POST'])
def answer_question(question_id):
    """
    Handle user's answer to a question and update progress for the hardcoded user.
    """
    data = request.get_json()

    # Fetch the question and correct answer
    question = MainQuestion.query.get_or_404(question_id)
    correct_option = QuestionOption.query.filter_by(question_id=question_id, is_correct=True).first()

    # Check if the user's answer is correct
    is_correct = (data['selected_option_id'] == correct_option.id)

    # Update progress
    progress = Progress.query.filter_by(user_id=TEST_USER_ID, topic_id=question.topic_id).first()
    if not progress:
        progress = Progress(
            user_id=TEST_USER_ID,
            topic_id=question.topic_id,
            active_questions=0,
            completed_questions=0
        )
        db.session.add(progress)

    if is_correct:
        progress.completed_questions += 1
        question.progress = 100  # Mark question as fully completed
    else:
        question.progress = max(question.progress - 25, 0)  # Deduct progress for incorrect answer

    db.session.commit()

    return jsonify({
        'is_correct': is_correct,
        'correct_option_id': correct_option.id,
        'progress': progress.percentage
    }), 200


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5003)