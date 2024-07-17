from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()

# Configuration settings
class Config:
    # Configure SQLAlchemy database URI
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'
    # Disable SQLAlchemy modification tracking
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Note: SECRET_KEY is now loaded from environment variables
