from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Topic, db

def init_topics_routes(app):
    @app.route('/topics', methods=['GET'])
    @jwt_required()
    def get_topics():
        user_id = get_jwt_identity()
        topics = Topic.query.filter_by(subject_id=1).all()  # Example: Fetch topics for subject_id=1
        return jsonify([{'id': topic.id, 'name': topic.name} for topic in topics]), 200