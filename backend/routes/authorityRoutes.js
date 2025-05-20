const express = require('express');
const router = express.Router();
const authorityController = require('../controllers/authorityController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// من قبل الأدمن فقط
router.post('/add', authenticateToken, authorizeRole(['admin']), authorityController.adminAddAuthority);

// من قبل هيئة الاعتماد
router.put('/update', authenticateToken, authorizeRole(['authority']), authorityController.updateAuthorityProfile);
router.get('/profileMe', authenticateToken, authorizeRole(['authority']), authorityController.getMyAuthority);
router.get('/all', authenticateToken, authorizeRole(['admin']), authorityController.getAllAuthorities);
router.get('/:id', authenticateToken, authorizeRole(['admin']), authorityController.getAuthorityById);

module.exports = router;
