const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'user_management'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Register
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    // ตรวจสอบชื่อผู้ใช้งานซ้ำ
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) return res.status(400).send('Username already taken');

        // ตรวจสอบอีเมลซ้ำ
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length > 0) return res.status(400).send('Email already registered');

            // ถ้าทุกอย่างเรียบร้อยให้ทำการเพิ่มผู้ใช้ใหม่
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, results) => {
                if (err) return res.status(500).send(err);
                res.status(201).send('User registered successfully');
            });
        });
    });
});


// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).send('User not found');
        
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send('Invalid credentials');

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        // ส่ง username กลับไปที่ Frontend พร้อมกับ token
        res.json({ token, username: user.username });
    });
});

// CRUD operations (for users)

// Read users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Update user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    db.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User updated');
    });
});

// Delete user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        
        // ตั้งค่า AUTO_INCREMENT ใหม่
        db.query('ALTER TABLE users AUTO_INCREMENT = 1', (err) => {
            if (err) return res.status(500).send(err);
            res.send('User deleted');
        });
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
