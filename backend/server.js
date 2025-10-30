const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database('./attendance.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');

        // Import and use routes
const attendanceRoutes = require('./routes/attendance');
app.use('/api/attendance', attendanceRoutes);
        // Create table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employeeName TEXT NOT NULL,
            employeeID TEXT NOT NULL,
            date DATE NOT NULL,
            status TEXT NOT NULL CHECK (status IN ('Present', 'Absent')),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Employee Attendance API is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;