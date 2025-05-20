// src/pages/Profile.jsx
import React from "react";
import "../css/Profile.css";
import profilePic from "../assets/images/virat.jpg";
import { useMovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/validation";

const Profile = () => {
  const { logout } = useMovieContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    logout();
    navigate("/"); // Redirect to homepage or login
    showToast('Successfully logout!!','success');
  };

  return (
    <div className="profile-container">
      <div className="card">
        <div className="left-section">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <h2>John Doe</h2>
          <p>Web Developer</p>
        </div>
        <div className="right-section">
          <h3>Profile Details</h3>
          <p>
            <strong>Name :</strong> John Doe
          </p>
          <p>
            <strong>Age :</strong> 35
          </p>
          <p>
            <strong>Mobile :</strong> +91 XXXXXXXXXX
          </p>
          <p>
            <strong>Email :</strong> john@example.com
          </p>
          <p>
            <strong>Address :</strong> 123 Main St, Anytown, USA
          </p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <p className="footer-text">
            Made with ❤️ by <strong>Learning Robo</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
