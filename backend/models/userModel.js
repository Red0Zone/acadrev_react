const db = require('../config/db');

// إنشاء مستخدم
const createUser = async (data) => {
  const { username, email, password, role, authority_id, university_id, college_id, department_id } = data;

  const [result] = await db.promise().query(
    `INSERT INTO users (username, email, password, role, authority_id, university_id, college_id, department_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [username, email, password, role, authority_id, university_id, college_id, department_id]
  );

  return result;
};

const getAllUsers = async () => {
  const [rows] = await db.promise().query(`
    SELECT 
      id, username, email, role, authority_id, university_id, college_id, department_id FROM users`);
  return rows;
};


// تعديل مستخدم
const updateUser = async (id, data) => {
  const { username, email, password, role, authority_id, university_id, college_id, department_id } = data;

  const [result] = await db.promise().query(
    `UPDATE users SET 
      username = ?, email = ?, password = ?, role = ?, 
      authority_id = ?, university_id = ?, college_id = ?, department_id = ?
     WHERE id = ?`,
    [username, email, password, role, authority_id, university_id, college_id, department_id, id]
  );

  return result;
};

// حذف مستخدم
const deleteUser = async (id) => {
  const [result] = await db.promise().query(
    'DELETE FROM users WHERE id = ?', [id]
  );
  return result;
};

// جلب معلومات مستخدم حسب ID
const getUserProfileById = async (id) => {
  const [rows] = await db.promise().query(
    `SELECT id, username, email, role, authority_id, university_id, college_id, department_id, created_at 
     FROM users 
     WHERE id = ?`,
    [id]
  );
  return rows[0];
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  getUserProfileById,
  deleteUser
};
