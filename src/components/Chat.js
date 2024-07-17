import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import '../css/Chat.css';

const Chat = () => {
  const { user, chats, saveChat } = useAuth();
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (user && chats[user.id]) {
      setChatHistory(chats[user.id]);
    }
  }, [user, chats]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { id: chatHistory.length + 1, text: input, from: 'user' };
      const newHistory = [...chatHistory, newMessage, { id: chatHistory.length + 2, text: 'This is a placeholder response from Rafiki AI.', from: 'ai' }];
      setChatHistory(newHistory);
      saveChat(user.id, newHistory);
      setInput('');
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Rafiki</h1>
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.from}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" value={input} onChange={handleInputChange} placeholder="Ask a question..." />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;