
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout'); // Ensure correct API endpoint
      await logout(); // Clear user session locally
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed', error);
      // Optionally provide user feedback on logout failure
    }
  };

  return (
    <div className="home-container">
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
