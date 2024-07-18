import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State for storing the authenticated user
  const [chats, setChats] = useState({}); // State for storing user chats

  // Function to set the logged-in user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token); // Adjust as per your token structure
  };

  // Function to clear the logged-in user and associated data
  const logout = () => {
    setUser(null);
    setChats({});
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Perform any other cleanup actions if necessary
  };

  // Function to save user chats in the chats state
  const saveChat = (chatId, chatData) => {
    setChats((prevChats) => ({
      ...prevChats,
      [chatId]: chatData,
    }));
  };

  // Example: Initialize user from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Example: Clear user data and reset state on logout
  useEffect(() => {
    const handleLogout = () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Optionally, perform logout actions, e.g., invalidate token on server
      }
      logout();
    };

    window.addEventListener('beforeunload', handleLogout);

    return () => {
      window.removeEventListener('beforeunload', handleLogout);
    };
  }, []); // Ensure cleanup on unmount

  // Provide the user, chats, login, logout, saveChat functions to child components
  return (
    <AuthContext.Provider value={{ user, chats, login, logout, saveChat }}>
      {children}
    </AuthContext.Provider>
  );
};
