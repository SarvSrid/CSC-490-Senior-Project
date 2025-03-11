from utils.db import db

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(255), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False)
    
class UserProfile(db.Model):
    __tablename__ = 'user_profile'
    id = db.Column(db.BigInteger, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False)

class Subject(db.Model):
    __tablename__ = 'subject'
    id = db.Column(db.SmallInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

class Topic(db.Model):
    __tablename__ = "topic"
    id = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(db.SmallInteger, db.ForeignKey("subject.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    difficulty_level = db.Column(db.SmallInteger, nullable=False, default=1)

class MainQuestion(db.Model):
    __tablename__ = 'main_question'
    id = db.Column(db.BigInteger, primary_key=True)
    header = db.Column(db.String(255), nullable=False)
    subtext = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user_profile.id'), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'), nullable=False)
    difficulty_level = db.Column(db.SmallInteger, nullable=False)
    progress = db.Column(db.BigInteger, nullable=False)
    # Relationship to options
    options = db.relationship("QuestionOption", backref="question", lazy=True)

    #Debugging purposes
    def __repr__(self):
        return f"<MainQuestion {self.header}>"
    
# New table added for branch questions choices (a - d)
class QuestionOption(db.Model):
    __tablename__ = "question_option"

    id = db.Column(db.BigInteger, primary_key=True)
    question_id = db.Column(db.BigInteger, db.ForeignKey("main_question.id"), nullable=False)
    option_text = db.Column(db.String(255), nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False, default=False)

    #Debugging purposes
    def __repr__(self):
        return f"<QuestionOption {self.option_text}>"

class BranchQuestion(db.Model):
    __tablename__ = 'branch_question'
    id = db.Column(db.BigInteger, primary_key=True)
    header = db.Column(db.String(255), nullable=False)
    subtext = db.Column(db.String(255), nullable=False)
    question_id = db.Column(db.BigInteger, db.ForeignKey('main_question.id'), nullable=False)
    difficulty_level = db.Column(db.SmallInteger, nullable=False)

class Chatbot(db.Model):
    __tablename__ = 'chatbot'
    id = db.Column(db.BigInteger, primary_key=True)
    question_id = db.Column(db.BigInteger, db.ForeignKey('main_question.id'), nullable=False)
    date_opened = db.Column(db.Date, nullable=False)
    date_closed = db.Column(db.Date)
    status = db.Column(db.Boolean, nullable=False)

class Message(db.Model):
    __tablename__ = 'message'
    id = db.Column(db.BigInteger, primary_key=True)
    chatbot_id = db.Column(db.BigInteger, db.ForeignKey('chatbot.id'), nullable=False)
    sender = db.Column(db.Boolean, nullable=False)  # 0 for AI, 1 for user
    text = db.Column(db.Text, nullable=False)
    sent_at = db.Column(db.DateTime, nullable=False)

class Progress(db.Model):
    __tablename__ = 'progress'
    id = db.Column(db.BigInteger, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'), nullable=False)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user_profile.id'), nullable=False)
    active_questions = db.Column(db.SmallInteger, nullable=False)
    completed_questions = db.Column(db.SmallInteger, nullable=False)
    percentage = db.Column(db.Numeric(5, 2), nullable=False)

    #Debugging purposes
    def __repr__(self):
        return f"<Progress {self.id}>"