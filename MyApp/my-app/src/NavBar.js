import React from 'react';
import './NavBar.css';

function NavBar({ currentPage, onNavigate, user, onLogout }) {
  return (
    <nav className="navbar">
      <button className={currentPage === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>Home</button>
      <button className={currentPage === 'about' ? 'active' : ''} onClick={() => onNavigate('about')}>About</button>
      <button className={currentPage === 'contact' ? 'active' : ''} onClick={() => onNavigate('contact')}>Contact</button>
      <button className={currentPage === 'papers' ? 'active' : ''} onClick={() => onNavigate('papers')}>Past Papers</button>
      {!user && (
        <>
          <button className={currentPage === 'login' ? 'active' : ''} onClick={() => onNavigate('login')}>Login</button>
          <button className={currentPage === 'register' ? 'active' : ''} onClick={() => onNavigate('register')}>Register</button>
        </>
      )}
      {user && (
        <>
          <button className={currentPage === 'dashboard' ? 'active' : ''} onClick={() => onNavigate('dashboard')}>Dashboard</button>
          <button onClick={onLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default NavBar;
