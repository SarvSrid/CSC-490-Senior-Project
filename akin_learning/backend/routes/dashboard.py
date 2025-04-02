from flask import Flask, jsonify, request, session, redirect, abort, Blueprint

dashboard_blueprint = Blueprint('dashboard', __name__, url_prefix='/dashboard')

@dashboard_blueprint.route('/')
def index():
    return redirect('http://localhost:5000/dashboard')

