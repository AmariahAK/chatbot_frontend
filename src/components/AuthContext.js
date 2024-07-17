import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State for storing the authenticated user
  const [chats, setChats] = useState({}); // State for storing user chats

  // Function to set the logged-in user
  const login = (userData) => {
    setUser(userData);
    // Example: Store user data securely in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    // Example: Store token if using JWT
    localStorage.setItem('token', userData.token); // Adjust as per your token structure
  };

  // Function to clear the logged-in user and associated data
  const logout = () => {
    setUser(null);
    setChats({});
    // Example: Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Example: Clear any other cached data or reset application state
    // resetState(); // Implement as needed
  };

  // Function to save user chats in the chats state
  const saveChat = (chatId, chatData) => {
    setChats((prevChats) => ({
      ...prevChats,
      [chatId]: chatData,
    }));
  };

  // Function to set the signed-up user
  const signUp = (newUser) => {
    setUser(newUser);
    // Example: Store user data securely in localStorage after sign-up
    localStorage.setItem('user', JSON.stringify(newUser));
    // Example: Store token if using JWT
    localStorage.setItem('token', newUser.token); // Adjust as per your token structure
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
        // Perform logout actions, e.g., API call to invalidate token on the server
        // axios.post('/logout', { token }).then(() => logout());
      } else {
        logout();
      }
    };

    // Example: Add event listener to handle logout on tab close or refresh
    window.addEventListener('beforeunload', handleLogout);

    return () => {
      window.removeEventListener('beforeunload', handleLogout);
    };
  }, []); // Ensure cleanup on unmount

  // Provide the user, chats, login, logout, saveChat, and signUp functions to child components
  return (
    <AuthContext.Provider value={{ user, chats, login, logout, saveChat, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
