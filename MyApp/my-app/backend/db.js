const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  // Create users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    is_admin INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Create papers table
  db.run(`CREATE TABLE IF NOT EXISTS papers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    course_code TEXT NOT NULL,
    year INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    paper_type TEXT NOT NULL,
    file_path TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_approved INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  // Create courses table for Computer Science department
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    department TEXT DEFAULT 'Computer Science'
  )`);

  // Insert initial Computer Science courses
  const initialCourses = [
    ['CSI131', 'Introduction to Programming'],
    ['CSI241', 'Data Structures and Algorithms'],
    ['CSI251', 'Computer Organization'],
    ['CSI342', 'Operating Systems'],
    ['CSI381', 'Database Systems'],
    ['CSI461', 'Software Engineering']
  ];

  initialCourses.forEach(([code, name]) => {
    db.run('INSERT OR IGNORE INTO courses (code, name) VALUES (?, ?)', [code, name]);
  });
});

module.exports = db;
