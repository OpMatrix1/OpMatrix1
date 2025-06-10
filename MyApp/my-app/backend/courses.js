const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all courses
router.get('/courses', (req, res) => {
    db.all('SELECT * FROM courses ORDER BY code', [], (err, courses) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, courses });
    });
});

// Get course by code
router.get('/courses/:code', (req, res) => {
    const { code } = req.params;
    db.get('SELECT * FROM courses WHERE code = ?', [code], (err, course) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        res.json({ success: true, course });
    });
});

// Add new course (admin only)
router.post('/courses', (req, res) => {
    const { code, name } = req.body;
    // TODO: Add admin authentication check
    if (!code || !name) {
        return res.status(400).json({ success: false, message: 'Course code and name are required' });
    }
    
    db.run(
        'INSERT INTO courses (code, name) VALUES (?, ?)',
        [code, name],
        function(err) {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.status(409).json({ success: false, message: 'Course code already exists' });
                }
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            res.json({ success: true, id: this.lastID });
        }
    );
});

module.exports = router;
