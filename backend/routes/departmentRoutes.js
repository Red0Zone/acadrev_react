const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// ➕ الكلية تضيف قسم
router.post(
  '/add',
  authenticateToken,
  authorizeRole(['college']),
  departmentController.addDepartment
);

// 📋 عرض كل الأقسام (لـ الجميع ما عدا القسم نفسه)
router.get(
  '/all',
  authenticateToken,
  authorizeRole(['admin', 'authority', 'university', 'college']),
  departmentController.getAllDepartments
);

// 👁️ القسم يعرض بياناته فقط
router.get(
  '/me',
  authenticateToken,
  authorizeRole(['department']),
  departmentController.getMyDepartment
);

// ✏️ القسم يعدل بياناته
router.put(
  '/update',
  authenticateToken, 
  authorizeRole(['department']),
  departmentController.updateDepartment
);

module.exports = router;
