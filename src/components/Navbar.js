
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/Navbar.css'; // Ensure your CSS file matches this name

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Logout function from AuthContext
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
            <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
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
