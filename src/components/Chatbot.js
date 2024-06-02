import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios.get('/api/messages/')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the messages!', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/messages/', { user: 'User', text: newMessage })
            .then(response => {
                setMessages([response.data, ...messages]);
                setNewMessage('');
            })
            .catch(error => {
                console.error('There was an error posting the message!', error);
            });
    };

    return (
        <div>
            <h1>Chatbot</h1>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>
                        <strong>{message.user}:</strong> {message.text}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
