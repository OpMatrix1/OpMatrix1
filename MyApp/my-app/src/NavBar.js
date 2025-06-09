import React from 'react';
import './NavBar.css';

function NavBar({ currentPage, onNavigate }) {
  return (
    <nav className="navbar">
      <button className={currentPage === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>Home</button>
      <button className={currentPage === 'about' ? 'active' : ''} onClick={() => onNavigate('about')}>About</button>
      <button className={currentPage === 'contact' ? 'active' : ''} onClick={() => onNavigate('contact')}>Contact</button>
    </nav>
  );
}

export default NavBar;
