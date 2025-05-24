const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// ➕ القسم يضيف برنامج
router.post(
  '/add',
  authenticateToken,
  authorizeRole(['department']),
  programController.addProgram
);

// 📋 عرض جميع البرامج (لـ admin, authority, university, college, department)
router.get(
  '/all',
  authenticateToken,
  authorizeRole(['admin', 'authority', 'university', 'college', 'department']),
  programController.getAllPrograms
);

// 👁️ القسم يعرض برامجه فقط
router.get(
  '/my',
  authenticateToken,
  authorizeRole(['department']),
  programController.getMyPrograms
);

// ✏️ تعديل برنامج (من قبل القسم)
router.put(
  '/update/:id',
  authenticateToken,
  authorizeRole(['department']),
  programController.updateProgram
);

module.exports = router;
