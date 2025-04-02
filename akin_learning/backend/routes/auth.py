from datetime import datetime, timezone

import bcrypt
from flask import Flask, jsonify, request, session, redirect, abort, Blueprint
import os
import psycopg2

from akin_learning.backend.routes.config.model import get_db_connection

auth_blueprint = Blueprint('auth', __name__, url_prefix='/auth')

@auth_blueprint.route('/')
def page():
    return redirect('http://localhost:3000/auth/signin')

@auth_blueprint.route('/validate', methods=['GET'])
def validate():
    # print("Session:\n",session)
    # print("Cookies:\n", request.cookies)

    if 'user_id' not in session:
        abort(401)  # No valid user session

    if 'access_token' not in session:
        abort(401)  # No authentication token

    print(session['expires_in'])
    print(datetime.now(timezone.utc))
    if 'expires_in' not in session or datetime.now(timezone.utc) > session['expires_in']:
        abort(401)  # Token expired

    return {"message": "Token is valid"}, 200


@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data['username']
    password = data['password']

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Query for the user
        cur.execute("SELECT id, password FROM user_profile WHERE username = %s", (username,))
        user = cur.fetchone()

        if user:
            user_id, hashed_password = user

            # Verify the password
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
                return jsonify({"message": "Login successful!", "user_id": user_id}), 200
            else:
                return jsonify({"message": "Invalid username or password"}), 401
        else:
            return jsonify({"message": "User not found"}), 404
    finally:
        cur.close()
        conn.close()


def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


@auth_blueprint.route('/signup', methods=['POST'])
def signup():
    data = request.json  # Assuming form data is sent as JSON
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    hashed_password = hash_password(password)  # Hash password before storing

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Insert user data into PostgreSQL database
        cur.execute("INSERT INTO user_profile (username, email, password) VALUES (%s, %s, %s)",
                    (username, email, hashed_password))
        conn.commit()
        return jsonify({"message": "Signup successful!"}), 201
    except psycopg2.errors.UniqueViolation as e:

        conn.rollback()  # Roll back the transaction in case of error
        if "user_profile_username_key" in str(e):
            return jsonify({"error": "Username is already in use."}), 400
        elif "user_profile_email_key" in str(e):
            return jsonify({"error": "Email address is already in use."}), 400
        else:
            return jsonify({"error": "An unknown error occurred."}), 500
    finally:
        cur.close()
        conn.close()


@auth_blueprint.route('/logout')
def logout():
    session.clear()  # Clear server-side session data
    response = (jsonify({"message": "Logged out successfully"}))
    response.set_cookie('session', '', expires=0)
    return response