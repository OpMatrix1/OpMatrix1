import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="hero">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&w=400&q=80" alt="AI generated hero" />
        <div className="hero-title">Welcome to MyApp!</div>
        <div className="hero-desc">A modern platform for user management and more. Powered by AI and beautiful design.</div>
      </div>
      <p style={{ color: '#636e72', fontSize: '1.2rem' }}>Get started by registering or logging in.</p>
    </div>
  );
}

export default HomePage;
