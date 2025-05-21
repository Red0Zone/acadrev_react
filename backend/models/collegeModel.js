const db = require('../config/db');

// إنشاء كلية جديدة
const createCollege = async (data) => {
  const { name, email, website, address, logo, university_id, head_name } = data;
  const [result] = await db.promise().query(
    'INSERT INTO colleges (name, email, website, address, logo, university_id, head_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, email, website, address, logo, university_id, head_name]
  );
  return result.insertId;
};

// جلب كل الكليات
const getAllColleges = async () => {
  const [rows] = await db.promise().query(
    `SELECT c.*, u.name AS university_name
     FROM colleges c
     LEFT JOIN universities u ON c.university_id = u.id`
  );
  return rows;
};

// جلب كلية حسب ID
const getCollegeById = async (id) => {
  const [rows] = await db.promise().query('SELECT * FROM colleges WHERE id = ?', [id]);
  return rows[0];
};

// تعديل بيانات كلية (بدون تعديل الاسم أو الحقول المحمية)
const updateCollege = async (id, data) => {
  const { email, website, address, logo, head_name } = data;
  const [result] = await db.promise().query(
    'UPDATE colleges SET email = ?, website = ?, address = ?, logo = ?, head_name = ? WHERE id = ?',
    [email, website, address, logo, head_name, id]
  );
  return result;
};

// جلب الكليات المرتبطة بجامعة معينة
const getCollegesByUniversity = async (universityId) => {
  const [rows] = await db.promise().query('SELECT * FROM colleges WHERE university_id = ?', [universityId]);
  return rows;
};

module.exports = {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  getCollegesByUniversity
};
