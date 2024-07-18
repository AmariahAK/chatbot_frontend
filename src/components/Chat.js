import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import '../css/Chat.css';

const Chat = () => {
  const { user, chats, saveChat } = useAuth();
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Load chat history when user or chats update
  useEffect(() => {
    if (user && chats && chats[user.id]) {
      setChatHistory(chats[user.id]);
    }
  }, [user, chats]);

  // Handle input change in the text field
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle sending a message
  const handleSend = async () => {
    if (input.trim() && user) {
      const newMessage = { id: chatHistory.length + 1, text: input, from: 'user' };

      // Update local state with new user message
      const updatedHistory = [...chatHistory, newMessage];
      setChatHistory(updatedHistory);
      saveChat(user.id, updatedHistory); // Persist to storage
      setInput(''); // Clear input field

      try {
        // Send user message to backend for processing
        const response = await axios.post('http://localhost:5000/api/chat', {
          userId: user.id,
          message: input
        });

        // Handle AI response from backend
        const aiResponse = response.data.message;
        const aiMessage = { id: chatHistory.length + 2, text: aiResponse, from: 'ai' };

        // Update local state with AI response
        const updatedHistoryWithAI = [...updatedHistory, aiMessage];
        setChatHistory(updatedHistoryWithAI);
        saveChat(user.id, updatedHistoryWithAI); // Persist AI response to storage

      } catch (error) {
        console.error('Failed to send or receive message:', error);
        // Display error message or handle error state
        // Optionally, revert local state changes on error
        setChatHistory(updatedHistory); // Rollback to previous state on error
      }
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to SupportAI</h1>
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.from}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
