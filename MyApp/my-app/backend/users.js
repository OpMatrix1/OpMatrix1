const express = require('express');
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, authenticateUser, isAdmin } = require('./middleware/auth');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
        return res.status(400).json({ 
            success: false, 
            message: 'Username, password and email are required' 
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
            [username, hashedPassword, email],
            function(err) {
                if (err) {
                    if (err.code === 'SQLITE_CONSTRAINT') {
                        return res.status(409).json({ 
                            success: false, 
                            message: 'Username already exists' 
                        });
                    }
                    return res.status(500).json({ 
                        success: false, 
                        message: 'Database error' 
                    });
                }
                res.json({ success: true });
            }
        );
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error creating user' 
        });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Username and password are required' 
        });
    }

    db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (err, user) => {
            if (err) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Database error' 
                });
            }
            
            if (!user) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Invalid credentials' 
                });
            }

            try {
                const validPassword = await bcrypt.compare(password, user.password);
                if (!validPassword) {
                    return res.status(401).json({ 
                        success: false, 
                        message: 'Invalid credentials' 
                    });
                }

                const token = jwt.sign(
                    { 
                        id: user.id, 
                        username: user.username,
                        isAdmin: user.is_admin === 1
                    },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );

                res.json({ 
                    success: true, 
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        isAdmin: user.is_admin === 1
                    }
                });
            } catch (error) {
                res.status(500).json({ 
                    success: false, 
                    message: 'Error during login' 
                });
            }
        }
    );
});

// Get all users (admin only)
router.get('/', authenticateUser, isAdmin, (req, res) => {
    db.all('SELECT id, username, email, is_admin FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Database error' 
            });
        }
        res.json({ success: true, users: rows });
    });
});

// Delete a user (admin only)
router.delete('/:id', authenticateUser, isAdmin, (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Database error' 
            });
        }
        if (this.changes === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        res.json({ success: true });
    });
});

// Get current user profile
router.get('/me', authenticateUser, (req, res) => {
    db.get(
        'SELECT id, username, email, is_admin FROM users WHERE id = ?',
        [req.user.id],
        (err, user) => {
            if (err) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Database error' 
                });
            }
            if (!user) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'User not found' 
                });
            }
            res.json({ 
                success: true, 
                user: {
                    ...user,
                    isAdmin: user.is_admin === 1
                }
            });
        }
    );
});

module.exports = router;
