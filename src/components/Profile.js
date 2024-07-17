import React, { useState } from 'react';
import '../css/Profile.css';

const Profile = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const handleSave = () => {
    // Update user profile logic
    alert('Profile updated!');
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-pic">
        <img src={profilePic || 'default-profile.png'} alt="Profile" />
        <input type="file" onChange={(e) => setProfilePic(URL.createObjectURL(e.target.files[0]))} />
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