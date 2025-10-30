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
// Use different database paths for production vs development
const dbPath = process.env.NODE_ENV === 'production' ? '/tmp/attendance.db' : './attendance.db';
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
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

// Import routes
const attendanceRoutes = require('./routes/attendance');

// Use routes
app.use('/api/attendance', attendanceRoutes);

// Basic route - EMPLOYEE ATTENDANCE VERSION
app.get('/', (req, res) => {
    res.json({ message: 'Employee Attendance API is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Employee Attendance Server running on http://localhost:${PORT}`);
});

module.exports = app;