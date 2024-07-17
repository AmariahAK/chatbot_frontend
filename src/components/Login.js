import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login process
    const userData = { id: Date.now(), email, password, profilePic: '', chats: [] };
    login(userData);
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login to SupportAI</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
