
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'details',
  password: 'Dhileep@1227',
  port: 5432, 
});

pool.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Database Connected');
  }
});

const jwtSecretKey = 'your_secret_key'; 


function generateToken(username) {
  const token = jwt.sign({ username }, jwtSecretKey, { expiresIn: '1h' });
  return token;
}

app.post('/signup', (request, response) => {
  const { username, password } = request.body;

  const sql = 'INSERT INTO "User" (username, password) VALUES ($1, $2)';
  pool.query(sql, [username, password], (error, result) => {
    if (error) {
      response.status(500).json({ message: 'Error signing up. Please try again later.' });
    } else {
      response.status(200).json({ message: 'Signup successful.' });
    }
  });
});

app.post("/signin", (request, response) => {
  const { username, password } = request.body;
  const sql = 'SELECT * FROM "User" WHERE username=$1';
  pool.query(sql, [username], (error, result) => {
    if (error) {
      response.status(500).json({ message: 'Error signing in. Please try again later.' });
    } else if (result.rows.length > 0) {
      const username1 = result.rows[0].username;
      const password1 = result.rows[0].password;
      if (username1 === username && password1 === password) {
        const token = generateToken(username);
        response.status(200).json({ message: 'Signin successful.', token });
      } else {
        response.status(401).json({ message: 'Invalid credentials. Please check your username and password.' });
      }
    } else {
      response.status(401).json({ message: 'Invalid credentials. Please check your username and password.' });
    }
  });
});


function authenticateToken(request, response, next) {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return response.sendStatus(401);
  }
  jwt.verify(token, jwtSecretKey, (error, user) => {
    if (error) {
      return response.sendStatus(403);
    }
    request.user = user;
    next();
  });
}


app.get('/dashboard', authenticateToken, (request, response) => {
  let sql = 'SELECT * FROM "User"';
  pool.query(sql, (error, result) => {
    if (error) {
      response.status(500).json({ message: 'Error fetching data.' });
    } else {
      response.status(200).json(result.rows);
    }
  });
});




  app.get('/subadmin', (request, response) => {
    let sql = 'SELECT * FROM "User" WHERE role=$1';
    pool.query(sql, ["User"], (error, result) => {
      if (error) {
        response.send(error);
      } else {
        response.send(result.rows);
      }
    });
  });
  
  app.get('/admin', (request, response) => {
    let sql = 'SELECT * FROM "User" WHERE role=$1';
    pool.query(sql, ["Employer"], (error, result) => {
      if (error) {
        response.send(error);
      } else {
        response.send(result.rows);
      }
    });
  });

  

app.put('/Update/:id', (request, response) => {
  const { id } = request.params;
  const { password } = request.body;

  const sql = 'UPDATE "User" SET password=$1 WHERE id=$2';
  pool.query(sql, [password, id], (error, result) => {
    if (error) {
      const s = { "status": "error" };
      response.send(s);
    } else {
      const s = { "status": "success" };
      response.send(s);
    }
  });
});

app.delete('/Delete/:id', (request, response) => {
  const { id } = request.params;

  const sql = 'DELETE FROM "User" WHERE id=$1';
  pool.query(sql, [id], (error, result) => {
    if (error) {
      const s = { "status": "error" };
      response.send(s);
    } else {
      const s = { "status": "success" };
      response.send(s);
    }
  });
});

app.listen(3002, () => {
  console.log('Server running on 3002');
});
