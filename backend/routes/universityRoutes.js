const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Only authenticated users with the 'admin' role can add universities
router.post('/add', authenticateToken, authorizeRole(['admin']), universityController.addUniversity);
router.delete('/delete/:id', authenticateToken, authorizeRole(['admin']), universityController.deleteUniversity);
router.get('/view/:id', authenticateToken, authorizeRole(['admin']), universityController.getUniversityById);
router.get('/search', authenticateToken, authorizeRole(['admin']), universityController.searchUniversitiesByName);
router.get('/all', authenticateToken, authorizeRole(['admin']),universityController.getAllUniversities);
router.put('/update/:id', authenticateToken, authorizeRole(['admin']), universityController.updateUniversity);

module.exports = router;
