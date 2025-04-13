// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token, forbidden
    req.user = user; // Add user to request object
    next(); // Proceed to next middleware or route handler
  });
}

function authorizeRole(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.sendStatus(403); // No user, forbidden
    }

    if (!roles.includes(req.user.level)) {
      return res.sendStatus(403); // User's role is not authorized
    }

    next(); // Proceed if authorized
  };
}

module.exports = {
  authenticateToken,
  authorizeRole,
};