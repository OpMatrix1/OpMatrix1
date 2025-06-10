const express = require('express');
const router = express.Router();
const db = require('./db');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// Get all papers
router.get('/papers', (req, res) => {
    const query = `
        SELECT p.*, u.username as uploaded_by 
        FROM papers p 
        JOIN users u ON p.user_id = u.id
    `;
    db.all(query, [], (err, papers) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, papers });
    });
});

// Get papers by course code
router.get('/papers/:courseCode', (req, res) => {
    const { courseCode } = req.params;
    const query = `
        SELECT p.*, u.username as uploaded_by 
        FROM papers p 
        JOIN users u ON p.user_id = u.id 
        WHERE p.course_code = ?
    `;
    db.all(query, [courseCode], (err, papers) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, papers });
    });
});

// Upload a new paper
router.post('/papers', upload.single('paper'), (req, res) => {
    const { title, course_code, year, semester, paper_type } = req.body;
    const user_id = req.user.id; // Assuming user authentication is implemented
    const file_path = req.file.path;

    const query = `
        INSERT INTO papers (
            title, course_code, year, semester, 
            paper_type, file_path, user_id, is_approved
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.run(query, 
        [title, course_code, year, semester, paper_type, file_path, user_id, 0],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            res.json({ success: true, id: this.lastID });
        }
    );
});

// Admin approve paper
router.put('/papers/:id/approve', (req, res) => {
    const { id } = req.params;
    // TODO: Add admin authentication check
    db.run('UPDATE papers SET is_approved = 1 WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true });
    });
});

module.exports = router;
