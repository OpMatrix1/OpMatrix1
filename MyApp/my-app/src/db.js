// This is a simple in-memory database for demo purposes only.
// In a real app, use a backend server and persistent storage.

const db = {
  users: [], // { username, password }
};

export function registerUser(username, password) {
  if (db.users.find(u => u.username === username)) {
    return { success: false, message: 'Username already exists' };
  }
  db.users.push({ username, password });
  return { success: true };
}

export function loginUser(username, password) {
  const user = db.users.find(u => u.username === username && u.password === password);
  if (user) {
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials' };
}
