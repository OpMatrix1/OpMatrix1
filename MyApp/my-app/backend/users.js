const express = require('express');
const db = require('./db');
const router = express.Router();

// Get all users (for admin)
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    res.json({ users: rows });
  });
});

// Delete a user by id (for admin)
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true });
  });
});

module.exports = router;
