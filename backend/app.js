// app.js

const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes'); // Adjust the path as needed
const universityRoutes = require('./routes/universityRoutes'); // University routes
const collagesRoutes = require('./routes/collagesRoutes'); // collages routes
const departmentRoutes = require('./routes/departmentRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json()); // For parsing JSON request bodies

// Mount the auth routes
app.use('/auth', authRoutes); // All auth routes will be prefixed with /auth
app.use('/universities', universityRoutes); // University routes for adding universities
app.use('/collages', collagesRoutes); // collages routes for adding universities
app.use('/departments', departmentRoutes);
app.use('/users', userRoutes);
    

// ... other routes and middleware ...

module.exports = app; // Export the configured app