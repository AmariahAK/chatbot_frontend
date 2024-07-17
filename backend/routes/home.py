# routes/home.py

from flask import Blueprint, jsonify

home_bp = Blueprint('home', __name__)

@home_bp.route('/api/home', methods=['GET'])
def get_home():
    return jsonify({
        'message': 'Welcome to Support AI!',
        'routes': {
            'login': '/login',
            'logout': '/logout',
            'signup': '/signup',
            'chat': '/chat',
            'profile': '/profile',
        }
    })

@home_bp.route('/api/home/about', methods=['GET'])
def get_about():
    return jsonify({
        'message': 'About Support AI'
    })

# Add more routes as needed for your home page
