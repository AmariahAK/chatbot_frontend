from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config, db
from routes.auth import auth_bp
from routes.routes import chat_bp
from routes.home import home_bp
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create the Flask app
app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

# Apply CORS globally to the Flask app
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Adjust the origins as needed

# Load configuration from Config class
app.config.from_object(Config)

# Override or add new configurations using environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')

# Initialize SQLAlchemy with the Flask app
db.init_app(app)

# Serve the React app
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# Serve static files from the build folder
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(home_bp, url_prefix='/api')
app.register_blueprint(chat_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
