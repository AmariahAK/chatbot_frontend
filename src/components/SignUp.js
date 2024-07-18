import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import '../css/SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setLoading(true);
      setError('');

      const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, password }, {
        withCredentials: true // Include credentials in the request
      });
      signUp(res.data);
      navigate('/home');
    } catch (error) {
      console.error('Signup failed:', error);
      if (error.response && error.response.status === 431) {
        setError('Request Header Fields Too Large');
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill out all fields.');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Invalid email format.');
      return false;
    }

    return true;
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <div className="signup-form">
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        <button onClick={handleSignUp} disabled={loading}>{loading ? 'Processing...' : 'Sign Up'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
