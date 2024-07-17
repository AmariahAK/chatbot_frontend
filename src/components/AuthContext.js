import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState({});

  const login = (userData) => setUser(userData);

  const logout = () => setUser(null);

  const saveChat = (chatId, chatData) => {
    setChats((prevChats) => ({
      ...prevChats,
      [chatId]: chatData,
    }));
  };

  const signUp = (newUser) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, chats, login, logout, saveChat, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};