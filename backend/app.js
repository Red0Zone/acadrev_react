// app.js

const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes'); // Adjust the path as needed
const cors = require('cors');

app.use(express.json()); // For parsing JSON request bodies
app.use(cors());


// Mount the auth routes
app.use('/auth', authRoutes); // All auth routes will be prefixed with /auth

// ... other routes and middleware ...

module.exports = app; // Export the configured app