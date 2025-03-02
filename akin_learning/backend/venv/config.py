import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://myuser:mypassword@localhost:5432/mydatabase')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key')


# Example:
# If your PostgreSQL connection details are as follows:

# Username: myuser postgres
# Password: mypassword sharksnow
# Host: localhost 
# Port: 5432
# Database: mydatabase akin_learning
# export DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase"

