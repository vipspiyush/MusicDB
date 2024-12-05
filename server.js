const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '_Piyush_9603', 
    database: 'musicdb'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    album VARCHAR(255),
    genre VARCHAR(50)
)`;
db.query(createTableQuery, err => {
    if (err) {
        console.error('Error creating table:', err.message);
        process.exit(1);
    }
    console.log('Songs table is ready');
});

app.get('/songs', (req, res) => {
    const query = 'SELECT * FROM songs';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching songs:', err.message);
            return res.status(500).send('Failed to fetch songs');
        }
        res.json(results);
    });
});

app.post('/songs', (req, res) => {
    const { title, artist, album, genre } = req.body;

    console.log('Data received from frontend:', req.body);

    if (!title || !artist || !genre) {
        return res.status(400).send('Title, artist, and genre are required');
    }

    const query = 'INSERT INTO songs (title, artist, album, genre) VALUES (?, ?, ?, ?)';
    db.query(query, [title, artist, album || null, genre], (err, results) => {
        if (err) {
            console.error('Error adding song:', err.message);
            return res.status(500).send('Failed to add song');
        }

        res.json({ id: results.insertId, title, artist, album, genre });
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
