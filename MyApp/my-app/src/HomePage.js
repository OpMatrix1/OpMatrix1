import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="hero">
        <div className="hero-title">Welcome to MyApp!</div>
        <div className="hero-desc">A cozy place to manage users, set against a snowy winter landscape with pine trees, a warm cabin, and a dreamy purple-pink sky.</div>
      </div>
      <p style={{ color: '#636e72', fontSize: '1.2rem' }}>Get started by registering or logging in.</p>
    </div>
  );
}

export default HomePage;
