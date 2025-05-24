const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// جامعة تضيف كلية
router.post('/add', authenticateToken, authorizeRole(['university']), collegeController.addCollege);

// عرض كل الكليات
router.get('/all', authenticateToken, authorizeRole(['admin', 'authority', 'university']), collegeController.getAllColleges);

// الكلية تعرض نفسها
router.get('/me', authenticateToken, authorizeRole(['college']), collegeController.getMyCollege);

// تعديل بيانات الكلية
router.put('/update', authenticateToken, authorizeRole(['college']), collegeController.updateCollege);

router.get('/uniAll', authenticateToken, authorizeRole(['university']), collegeController.getCollegesByUniversity);
module.exports = router;
