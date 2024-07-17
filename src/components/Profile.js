
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import '../css/Profile.css'; // Ensure your CSS file matches this name

const Profile = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const { token } = useAuth(); // Assuming you have a token from AuthContext

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profilePic', profilePic);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Pass your JWT token for authentication
        },
      };

      const res = await axios.post('http://localhost:5000/api/user/profile', formData, config);
      console.log('Profile updated:', res.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update failed:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-pic">
        <img src={profilePic || 'default-profile.png'} alt="Profile" />
        <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
      </div>
      <div className="profile-info">
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Profile;
