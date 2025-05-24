const db = require('../config/db');

// إنشاء برنامج جديد (بدون description و level و duration)
const createProgram = async (data) => {
  const { name, language, dep, evaluator_name, evaluator_id } = data;

  const [result] = await db.promise().query(
    `INSERT INTO programs 
      (name, language, dep, evaluator_name)
     VALUES (?, ?, ?, ?)`,
    [name, language, dep, evaluator_name]
  );

  return result.insertId;
};

// عرض كل البرامج
const getAllPrograms = async () => {
  const [rows] = await db.promise().query(
    `SELECT p.*, d.name AS department_name
     FROM programs p
     LEFT JOIN departments d ON p.dep = d.id`
  );
  return rows;
};

// عرض برنامج حسب ID
const getProgramById = async (id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM programs WHERE id = ?', [id]
  );
  return rows[0];
};

// تعديل برنامج
const updateProgram = async (id, data) => {
  const { language, evaluator_name, evaluator_id } = data;

  const [result] = await db.promise().query(
    `UPDATE programs 
     SET language = ?, evaluator_name = ?
     WHERE id = ?`,
    [language, evaluator_name, id]
  );

  return result;
};

module.exports = {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram
};
