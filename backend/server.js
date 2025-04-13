// server.js

const express = require('express');
const app = require('./app');  // Import app.js (our express app)
const dotenv = require('dotenv'); // To load environment variables from .env
dotenv.config(); // Load .env file

// Get the port from the environment or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});