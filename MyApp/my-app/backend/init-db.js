const bcrypt = require('bcryptjs');
const db = require('./db');

async function initializeDatabase() {
    try {
        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        db.run(
            'INSERT OR IGNORE INTO users (username, password, email, is_admin) VALUES (?, ?, ?, ?)',
            ['admin', hashedPassword, 'admin@ub.edu.bw', 1]
        );
        
        console.log('Database initialized successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

initializeDatabase();
