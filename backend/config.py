from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()

# Configuration settings
class Config:
    # Configure SQLAlchemy database URI
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'
    # Disable SQLAlchemy modification tracking
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Set a secret key for sessions and other security-related uses
    SECRET_KEY = 'your_secret_key_here'
