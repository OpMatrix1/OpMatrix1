const express = require('express');
const cors = require('cors');
const db = require('./db');
const bodyParser = require('body-parser');
const usersRouter = require('./users');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }
  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ success: false, message: 'Username already exists' });
        }
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      res.json({ success: true });
    }
  );
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }
  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      if (row) {
        res.json({ success: true });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    }
  );
});

// Mount the new /users API routes in the backend server for admin user management
app.use('/users', usersRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
