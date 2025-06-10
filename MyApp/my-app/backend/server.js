const express = require('express');
const cors = require('cors');
const db = require('./db');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { authenticateUser, isAdmin } = require('./middleware/auth');
const usersRouter = require('./users');
const papersRouter = require('./papers');
const coursesRouter = require('./courses');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Public routes
app.use('/users/login', usersRouter);
app.use('/users/register', usersRouter);

// Protected routes
app.use('/users', authenticateUser, usersRouter);
app.use('/papers', authenticateUser, papersRouter);
app.use('/courses', authenticateUser, coursesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
