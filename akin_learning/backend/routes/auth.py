from datetime import datetime, timezone

import bcrypt
from flask import Flask, jsonify, request, session, redirect, abort, Blueprint
import os
import psycopg2

from akin_learning.backend.routes.config.model import get_db_connection

auth_blueprint = Blueprint('auth', __name__, url_prefix='/auth')

# @auth_blueprint.route('/')
# def page():
#     return redirect('http://localhost:3000/auth/signin')

@auth_blueprint.route('/validate', methods=['GET'])
def validate():
    print("Session:\n",session)
    print("Cookies:\n", request.cookies)

    if 'user_id' not in session:
        return jsonify({"error": "No valid user session"}), 401
    if 'email' not in session:
        if 'access_token' not in session:
            return jsonify({"error": "No authentication token"}), 401

        print(session['expires_in'])
        print(datetime.now(timezone.utc))
        if 'expires_in' not in session or datetime.now(timezone.utc) > session['expires_in']:
            return jsonify({"error": "Token expired"}), 401

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT id, username, email FROM user_profile WHERE id = %s", (session['user_id'],))
        user = cur.fetchone()
        return jsonify(
            {"userData": {
                "id": user[0],
                "username": user[1],
                "email": user[2],
            }}), 200
    except Exception as e:
        print("Database error:", e)
        return jsonify({"error": "Database error"}), 500
    finally:
        cur.close()
        conn.close()




    print("token valid")
    return {"message": "Token is valid"}, 200


@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    state = session.get('state')

    email = data.get('email')
    password = data.get('password')

    print(email, password)
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Query for the user
        cur.execute("SELECT id, username ,email, password FROM user_profile WHERE email = %s", (email,))
        user = cur.fetchone()

        if user:
            user_id, username, email, hashed_password = user
            print(f"{user_id}, {email}, {hashed_password}")
            # Verify the password
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
                session['user_id'] = user_id
                session['email'] = email
                session['username'] = username

                # print("session get:",session.get('user_id'))
                # print("session get:",session.get('email'))
                # print(session)
                return jsonify({"success": True, "message": "Login successful"}), 200
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


@auth_blueprint.route('/logout', methods=['GET'])
def logout():
    session.clear()  # Clear server-side session data
    response = (jsonify({"message": "Logged out successfully"}))
    response.set_cookie('session', '', expires=0)
    return response