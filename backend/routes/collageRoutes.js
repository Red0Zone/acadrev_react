const express = require('express');
const router = express.Router();
const collageController = require('../controllers/collageController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// جامعة تضيف كلية
router.post('/add', authenticateToken, authorizeRole(['university']), collageController.addCollage);

// عرض كل الكليات
router.get('/all', authenticateToken, authorizeRole(['admin', 'authority', 'university']), collageController.getAllCollages);

// الكلية تعرض نفسها
router.get('/me', authenticateToken, authorizeRole(['college']), collageController.getMyCollage);

// تعديل بيانات الكلية
router.put('/update', authenticateToken, authorizeRole(['college']), collageController.updateCollage);

module.exports = router;
