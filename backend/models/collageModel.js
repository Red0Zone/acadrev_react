const db = require('../config/db');

// إنشاء كلية جديدة
const createCollage = async (data) => {
  const { name, email, website, address, logo, university_id, head_name } = data;
  const [result] = await db.promise().query(
    'INSERT INTO collages (name, email, website, address, logo, university_id, head_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, email, website, address, logo, university_id, head_name]
  );
  return result.insertId;
};

// جلب كل الكليات
const getAllCollages = async () => {
  const [rows] = await db.promise().query(
    `SELECT c.*, u.name AS university_name
     FROM collages c
     LEFT JOIN universities u ON c.university_id = u.id`
  );
  return rows;
};

// جلب كلية حسب ID
const getCollageById = async (id) => {
  const [rows] = await db.promise().query('SELECT * FROM collages WHERE id = ?', [id]);
  return rows[0];
};

// تعديل بيانات كلية (بدون تعديل الاسم أو الحقول المحمية)
const updateCollage = async (id, data) => {
  const { email, website, address, logo, head_name } = data;
  const [result] = await db.promise().query(
    'UPDATE collages SET email = ?, website = ?, address = ?, logo = ?, head_name = ? WHERE id = ?',
    [email, website, address, logo, head_name, id]
  );
  return result;
};

module.exports = {
  createCollage,
  getAllCollages,
  getCollageById,
  updateCollage
};
