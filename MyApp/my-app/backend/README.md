# Node.js Express + SQLite User Auth Backend

This backend provides REST API endpoints for user registration and login using Express and SQLite.

## Endpoints
- `POST /register` — Register a new user (body: `{ username, password }`)
- `POST /login` — Login with existing user credentials (body: `{ username, password }`)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. The server runs on port 4000 by default.

## Security Note
- Passwords are stored in plaintext for demo purposes. In production, always hash passwords (e.g., with bcrypt).

---

This project is intended for learning and prototyping. For production, add password hashing, validation, and HTTPS.
