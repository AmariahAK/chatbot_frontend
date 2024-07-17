import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SupportAI</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        {/* Conditionally render Profile link */}
        {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
        {/* Conditionally render Login or Logout based on isLoggedIn */}
        {isLoggedIn ? (
          <li><Link to="/logout">Logout</Link></li>
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
