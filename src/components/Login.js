import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Perform basic client-side validation
      if (!email || !password) {
        alert('Email and password are required.');
        return;
      }

      // Call the login API endpoint
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Include credentials in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to login. Please try again.');
        return;
      }

      const userData = await response.json();
      login(userData.user); // Assuming the API returns user data
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login to SupportAI</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
