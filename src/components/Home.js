import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css'; // Ensure your CSS supports the new design

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Support AI</h1>
      <section className="info-card">
        <h2>Revolutionizing Customer Service</h2>
        <p>Experience instant support with our AI, designed to answer your queries instantly, reduce wait times, and guide you through your journey with us.</p>
      </section>
      <section className="benefits">
        <div className="card">
          <h3>Immediate Assistance</h3>
          <p>Get quick answers to your questions, 24/7.</p>
        </div>
        <div className="card">
          <h3>Personalized Experience</h3>
          <p>Our AI learns from every interaction, offering a more personalized service over time.</p>
        </div>
        <div className="card">
          <h3>Efficient Routing</h3>
          <p>We direct you to the most suitable agent or department, saving time and ensuring your query reaches the right person.</p>
        </div>
      </section>
      <div className="get-started">
        <Link to="/login" className="btn btn-primary">Get Started</Link>
      </div>
    </div>
  );
};

export default Home;
