const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./attendance.db');

// GET all attendance records
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM attendance ORDER BY date DESC, createdAt DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// POST new attendance record
router.post('/', (req, res) => {
    const { employeeName, employeeID, date, status } = req.body;
    
    // Basic validation
    if (!employeeName || !employeeID || !date || !status) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (!['Present', 'Absent'].includes(status)) {
        return res.status(400).json({ error: 'Status must be Present or Absent' });
    }

    const sql = `INSERT INTO attendance (employeeName, employeeID, date, status) 
                 VALUES (?, ?, ?, ?)`;
    
    db.run(sql, [employeeName, employeeID, date, status], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Attendance recorded successfully',
            data: { id: this.lastID }
        });
    });
});

// DELETE attendance record (Bonus)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM attendance WHERE id = ?';
    
    db.run(sql, id, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Attendance record deleted successfully' });
    });
});

module.exports = router;