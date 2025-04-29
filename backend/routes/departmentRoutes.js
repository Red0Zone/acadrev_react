const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');


// Add Department (Admins only)
router.post('/add/:collageId', authenticateToken, authorizeRole(['admin']), departmentController.addDepartment);

// Delete Department (Admins only)
router.delete('/delete/:id', authenticateToken, authorizeRole(['admin']), departmentController.deleteDepartment);

// View Department (Public)
router.get('/view/:id', departmentController.getDepartmentById);

// Search Departments (any logged-in user)
router.get('/search', authenticateToken, departmentController.searchDepartmentsByName);

// Update Department (Admins only)
router.put('/update/:id', authenticateToken, authorizeRole(['admin']), departmentController.updateDepartment);

module.exports = router;
