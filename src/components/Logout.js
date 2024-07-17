import React from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom'; // Updated import

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Updated usage

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Updated method to navigate
    } catch (error) {
      console.error('Logout failed', error);
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
