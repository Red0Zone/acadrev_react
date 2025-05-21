// app.js

const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes'); // Adjust the path as needed
const universityRoutes = require('./routes/universityRoutes'); // University routes
const collegeRoutes = require('./routes/collegeRoutes'); // colleges routes
const departmentRoutes = require('./routes/departmentRoutes'); // department routes
const userRoutes = require('./routes/userRoutes'); // user routes
const programRoutes = require('./routes/programRoutes');
const authorityRoutes = require('./routes/authorityRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cors = require('cors'); // Import CORS middleware

app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS for all routes
// Mount the auth routes
app.use('/auth', authRoutes); // All auth routes will be prefixed with /auth
app.use('/authority', authorityRoutes);
app.use('/universities', universityRoutes); // University routes for adding universities
app.use('/colleges', collegeRoutes); // colleges routes for adding universities
app.use('/departments', departmentRoutes); // department routes
app.use('/users', userRoutes); // user routes
app.use('/programs', programRoutes);
app.use('/profile', profileRoutes);


// ... other routes and middleware ...

module.exports = app; // Export the configured app