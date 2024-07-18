# routes/auth.py

from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from config import db
from flask_cors import cross_origin


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/auth/register', methods=['POST'])
@cross_origin(origins='http://localhost:3000')
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    
    # Check if username or email already exists
    existing_user = User.query.filter_by(username=username).first()
    existing_email = User.query.filter_by(email=email).first()
    
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 400
    
    if existing_email:
        return jsonify({'message': 'Email already exists'}), 400
    
    # Create hashed password
    hashed_password = generate_password_hash(password, method='sha256')
    
    # Create new user object
    new_user = User(username=username, email=email, password=hashed_password)
    
    # Add user to database session and commit
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully'}), 201

@auth_bp.route('/api/auth/login', methods=['POST'])
@cross_origin(origins='http://localhost:3000')
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    
    # Find user by email
    user = User.query.filter_by(email=email).first()
    
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    # Simulate login process by setting session
    session['user_id'] = user.id
    
    return jsonify({'message': 'Login successful', 'user': {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'profilePic': user.profile_pic,  # Assuming profile_pic field in User model
        'chats': []  # Placeholder for user chats
    }}), 200

@auth_bp.route('/api/auth/logout', methods=['POST'])
@cross_origin(origins='http://localhost:3000')
def logout():
    # Clear the session
    session.clear()
    
    return jsonify({'message': 'Logout successful'}), 200

@auth_bp.route('/api/auth/profile', methods=['POST'])
@cross_origin(origins='http://localhost:3000')
def update_profile():
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'}), 401

    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    profile_pic = request.files['profilePic'] if 'profilePic' in request.files else None

    if username:
        user.username = username
    if email:
        user.email = email
    if password:
        user.password = generate_password_hash(password, method='sha256')
    if profile_pic:
        # Save profile picture to server and update user.profile_pic path
        # Example:
        profile_pic_path = f'path/to/save/{profile_pic.filename}'
        profile_pic.save(profile_pic_path)
        user.profile_pic = profile_pic_path

    db.session.commit()

    return jsonify({'message': 'Profile updated successfully'}), 200
