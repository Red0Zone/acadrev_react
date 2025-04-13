// controllers/authController.js

const db = require('../config/db'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel'); // Import userModel

// Login function (NO HASHING - INSECURE)
async function login(req, res) {
  const { username, password } = req.body;

  // Log username and password from the request
  console.log('Username from request:', username);
  console.log('Password from request:', password);

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Query the database to find the user
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];

      // Direct password comparison (NO HASHING - INSECURE)
      const passwordMatch = (password === user.password);

      // Log the password match result
      console.log('Password match:', passwordMatch);

      if (passwordMatch) {
        // Generate a JWT token
        const token = jwt.sign(
          { userId: user.id, username: user.username, level: user.level },
          process.env.JWT_SECRET,
          { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Send the token and user information in the response
        res.json({ token, user: { id: user.id, username: user.username, level: user.level, email: user.email, university: user.university, college: user.college, department: user.department, program: user.program, perm: user.perm } });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
}

module.exports = {
  login,
};