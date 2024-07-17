import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import '../css/Chat.css';

const Chat = () => {
  const { user, chats, saveChat } = useAuth();
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

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
  const handleSend = () => {
    if (input.trim() && user) {
      const newMessage = { id: chatHistory.length + 1, text: input, from: 'user' };
      const placeholderMessage = { id: chatHistory.length + 2, text: 'This is a placeholder response from SupportAI.', from: 'ai' };
      
      const newHistory = [...chatHistory, newMessage, placeholderMessage];
      setChatHistory(newHistory); // Update local state
      saveChat(user.id, newHistory); // Persist to storage
      setInput(''); // Clear input field
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to SupportAI</h1>
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.from === 'user' ? 'user' : 'ai'}`}>
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
