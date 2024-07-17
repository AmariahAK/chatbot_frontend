// app.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from './azureConfig';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './components/AuthContext';
import './css/styles.css';

const PrivateRoute = ({ element, ...props }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </MsalProvider>
  );
};

export default App;
