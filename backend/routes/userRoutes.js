const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');


// Add User (Admins only)
router.post('/add', authenticateToken, authorizeRole(['admin']), userController.addUser);

// Delete User (Admins only)
router.delete('/delete/:id', authenticateToken, authorizeRole(['admin']), userController.deleteUser);

// Update User (Admins only)
router.put('/update/:id', authenticateToken, authorizeRole(['admin']), userController.updateUser);

module.exports = router;
