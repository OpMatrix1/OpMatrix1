import React, { useState, useEffect } from 'react';
import './DashboardPage.css';

function DashboardPage({ username, onLogout }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (username === 'Admin') {
      fetch('/users')
        .then(res => res.json())
        .then(data => setUsers(data.users || []))
        .catch(() => setError('Failed to fetch users'));
    }
  }, [username]);

  const handleDelete = (userId) => {
    fetch(`/users/${userId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(users.filter(u => u.id !== userId));
        } else {
          setError(data.message || 'Delete failed');
        }
      })
      .catch(() => setError('Delete failed'));
  };

  if (username === 'Admin') {
    return (
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
        <h2>Registered Users</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <table style={{ margin: '20px auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {username}!</h1>
      <p>This is your dashboard.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default DashboardPage;
