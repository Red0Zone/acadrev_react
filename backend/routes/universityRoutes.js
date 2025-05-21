const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// هيئة الاعتماد تضيف جامعة
router.post('/add', authenticateToken, authorizeRole(['authority']), universityController.addUniversity);

// عرض كل الجامعات (admin أو authority)
router.get('/all', authenticateToken, authorizeRole(['admin', 'authority']), universityController.getAllUniversities);

// الجامعة تعرض بياناتها الشخصية
router.get('/me', authenticateToken, authorizeRole(['university','college','department']), universityController.getMyUniversity);

// الجامعة تعدل بياناتها
router.put('/update', authenticateToken, authorizeRole(['university']), universityController.updateUniversity);

module.exports = router;
