# models/chat.py

from datetime import datetime
from config import db

class ChatMessage(db.Model):
    __tablename__ = 'chat_messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_user = db.Column(db.Boolean, default=True)  # True for user messages, False for AI responses
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<ChatMessage id={self.id} user_id={self.user_id} message="{self.message[:20]}...">'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'message': self.message,
            'is_user': self.is_user,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
