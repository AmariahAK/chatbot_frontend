import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios'; // Import axios here
import '../css/NavBar.css'; // Ensure your CSS file matches this name

const Navbar = () => {
  const { isAuthenticated, user, logout, token } = useAuth();

  const handleLogout = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Pass your JWT token for authentication
        },
      };
      await axios.post('http://localhost:5000/api/auth/logout', {}, config); // Ensure correct API endpoint
      await logout(); // Clear user session locally
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SupportAI</Link>
      </div>
      <ul className="navbar-links">
        {isAuthenticated ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/chat">Chat</Link></li>
            <li><span>{user.username}</span></li>
            <li><img src={user.profilePic} alt="Profile" className="profile-pic" /></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
