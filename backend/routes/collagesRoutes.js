const express = require('express');
const router = express.Router();
const collageController = require('../controllers/collageController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');


// Add Collage to a University (Admins only)
router.post('/add/:universityId', authenticateToken, authorizeRole(['admin']), collageController.addCollage);

// Delete Collage (Admins only)
router.delete('/delete/:id', authenticateToken, authorizeRole(['admin']), collageController.deleteCollage);

// View Collage (Public)
router.get('/view/:id', collageController.getCollageById);

// Search Collages (any logged-in user)
router.get('/search', authenticateToken, collageController.searchCollagesByName);

// Update Collage (Admins only)
router.put('/update/:id', authenticateToken, authorizeRole(['admin']), collageController.updateCollage);


module.exports = router;
