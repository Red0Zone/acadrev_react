const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// عرض البيانات الشخصية
router.get('/', authenticateToken, profileController.getProfile);

// تعديل البريد أو اسم المستخدم
router.put('/update', authenticateToken, profileController.updateProfile);
// For pass
router.put('/password', authenticateToken, profileController.updatePassword);

module.exports = router;
