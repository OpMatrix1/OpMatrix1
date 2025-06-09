import React, { useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import NavBar from './NavBar';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import { registerUser, loginUser } from './db';

function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [registered, setRegistered] = useState(false);

  const handleRegister = (username, password) => {
    const result = registerUser(username, password);
    if (result.success) {
      setRegistered(true);
      setPage('login');
    } else {
      alert(result.message);
    }
  };

  const handleLogin = (username, password) => {
    const result = loginUser(username, password);
    if (result.success) {
      setUser(username);
      setPage('dashboard');
    } else {
      alert(result.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  let content;
  if (!user) {
    if (page === 'register') content = <RegistrationPage onRegister={handleRegister} />;
    else if (page === 'login') content = <LoginPage onLogin={handleLogin} />;
    else if (page === 'about') content = <AboutPage />;
    else if (page === 'contact') content = <ContactPage />;
    else content = <HomePage />;
  } else {
    if (page === 'dashboard') content = <DashboardPage username={user} onLogout={handleLogout} />;
    else if (page === 'about') content = <AboutPage />;
    else if (page === 'contact') content = <ContactPage />;
    else content = <DashboardPage username={user} onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      <NavBar currentPage={page} onNavigate={setPage} />
      { !user && (page !== 'register' && page !== 'login') && (
        <div style={{ marginTop: 20 }}>
          <button onClick={() => setPage('login')}>Login</button>
          <button onClick={() => setPage('register')} style={{ marginLeft: 10 }}>Register</button>
        </div>
      )}
      {content}
    </div>
  );
}

export default App;
