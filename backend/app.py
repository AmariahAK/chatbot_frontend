from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config, db
from routes.auth import auth_bp
from routes.routes import chat_bp
from routes.home import home_bp
from flask_migrate import Migrate

# Create the Flask app
app = Flask(__name__, static_folder='../frontend', static_url_path='/')

# Enable CORS for specific origins, methods, headers, and credentials
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}},
            supports_credentials=True, 
            allow_headers=['Content-Type', 'Authorization'],
            methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

# Load configuration from Config class
app.config.from_object(Config)

# Initialize SQLAlchemy with the Flask app
db.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Serve the React app
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(home_bp, url_prefix='/api')
app.register_blueprint(chat_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
