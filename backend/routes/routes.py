# routes/routes.py

from flask import Blueprint, request, jsonify
from models.chat import ChatMessage
from config import db

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/api/chat', methods=['POST'])
def handle_message():
    try:
        # Extract data from JSON request
        user_id = request.json.get('userId')
        message = request.json.get('message')

        # Validate required fields
        if not user_id or not message:
            return jsonify({'error': 'userId and message are required fields'}), 400

        # Simulate AI response (Replace with actual AI integration)
        ai_response = 'This is a placeholder response from SupportAI.'

        # Create ChatMessage objects
        new_message = ChatMessage(user_id=user_id, message=message, is_user=True)
        ai_message = ChatMessage(user_id=user_id, message=ai_response, is_user=False)

        # Add messages to database session and commit
        db.session.add(new_message)
        db.session.add(ai_message)
        db.session.commit()

        return jsonify({'message': 'Message processed successfully'}), 200

    except Exception as e:
        db.session.rollback()  # Rollback in case of error to avoid inconsistent state
        return jsonify({'error': str(e)}), 500
