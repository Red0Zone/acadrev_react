const db = require('../config/db');

// إنشاء قسم جديد
const createDepartment = async (data) => {
  const { name, email, website, address, logo, college_id, head_name } = data;
  const [result] = await db.promise().query(
    `INSERT INTO departments (name, email, website, address, logo, college_id, head_name)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, website, address, logo, college_id, head_name]
  );
  return result.insertId;
};

// جلب كل الأقسام
const getAllDepartments = async () => {
  const [rows] = await db.promise().query(
    `SELECT d.*, c.name AS college_name
     FROM departments d
     LEFT JOIN collages c ON d.college_id = c.id`
  );
  return rows;
};

// جلب قسم حسب ID
const getDepartmentById = async (id) => {
  const [rows] = await db.promise().query('SELECT * FROM departments WHERE id = ?', [id]);
  return rows[0];
};

// تعديل بيانات القسم
const updateDepartment = async (id, data) => {
  const { email, website, address, logo, head_name } = data;
  const [result] = await db.promise().query(
    `UPDATE departments SET email = ?, website = ?, address = ?, logo = ?, head_name = ? WHERE id = ?`,
    [email, website, address, logo, head_name, id]
  );
  return result;
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment
};
