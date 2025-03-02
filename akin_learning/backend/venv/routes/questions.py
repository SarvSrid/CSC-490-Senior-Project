from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import MainQuestion, db

def init_questions_routes(app):
    @app.route('/questions', methods=['GET'])
    @jwt_required()
    def get_questions():
        user_id = get_jwt_identity()
        questions = MainQuestion.query.filter_by(user_id=user_id).all()
        return jsonify([{'id': q.id, 'header': q.header} for q in questions]), 200

    @app.route('/questions', methods=['POST'])
    @jwt_required()
    def create_question():
        data = request.get_json()
        new_question = MainQuestion(
            header=data['header'],
            subtext=data['subtext'],
            user_id=get_jwt_identity(),
            topic_id=data['topic_id'],
            difficulty_level=data['difficulty_level'],
            progress=0
        )
        db.session.add(new_question)
        db.session.commit()
        return jsonify(message='Question created successfully'), 201