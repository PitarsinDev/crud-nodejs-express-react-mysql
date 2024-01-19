const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_nodejs_db'
});

db.connect(err => {
    if (err) {
        console.error('database connection failed' + err.stack);
        return;
    } 
    console.log('Connected to Database');
});

app.use(express.json());

app.post('/api/create', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
      if (err) throw err;
      res.send('User created successfully');
    });
});
  
app.get('/api/read', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, result) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result));
    });
  });
  
app.put('/api/update/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    const query = 'UPDATE users SET name=?, email=? WHERE id=?';
    db.query(query, [name, email, userId], (err, result) => {
      if (err) throw err;
      res.send('User updated successfully');
    });
});
  
app.delete('/api/delete/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id=?';
    db.query(query, [userId], (err, result) => {
      if (err) throw err;
      res.send('User deleted successfully');
    });
});

app.listen(port, () => {
    console.log('Server is running');
});