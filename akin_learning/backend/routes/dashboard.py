from flask import Flask, jsonify, request, session, redirect, abort, Blueprint
from flask_cors import CORS # Enable Cross-Origin Resource Sharing
import os
from config.db_config import get_db_connection

dashboard_blueprint = Blueprint('dashboard', __name__, url_prefix='/dashboard')

@dashboard_blueprint.route('/')
def index():
    return redirect('http://localhost:5000/dashboard')

