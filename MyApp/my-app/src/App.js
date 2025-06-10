import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import NavBar from './NavBar';
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import PapersPage from './PapersPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const [page, setPage] = useState('home');
  const [registered, setRegistered] = useState(false);
  const { auth, login, logout } = useAuth();
  const [user, setUser] = useState(auth?.user || null);

  useEffect(() => {
    if (!auth?.user && page === 'dashboard') {
      setPage('home');
    }
    setUser(auth?.user || null);
  }, [auth, page]);

  const handleRegister = async (username, password, email) => {
    setRegistered(true);
    try {
      // Use AuthService for registration
      const response = await import('./services/api').then(m => m.AuthService.register(username, password, email));
      if (response.success) {
        setPage('login');
      } else {
        alert(response.message || 'Registration failed');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  const handleLogin = async (username, password) => {
    try {
      // Always use backend API for login, including admin
      const response = await import('./services/api').then(m => m.AuthService.login(username, password));
      if (response.success) {
        login(response); // sets auth context
        setUser(response.user);
        setPage('dashboard');
      } else {
        alert(response.message || 'Login failed');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  const handleLogout = () => {
    logout();
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
    if (page === 'dashboard') content = <DashboardPage username={user.username} onLogout={handleLogout} />;
    else if (page === 'about') content = <AboutPage />;
    else if (page === 'contact') content = <ContactPage />;
    else if (page === 'papers') content = <PapersPage user={user} />;
    else content = <DashboardPage username={user.username} onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      <NavBar 
        onNavigate={setPage} 
        currentPage={page}
        user={user}
        onLogout={handleLogout}
      />
      {content}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
