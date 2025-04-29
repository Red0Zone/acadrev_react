const db = require('../config/db');

// Add Department
const addDepartment = async (data) => {
  const { name, head, website, collageId } = data;
  const [result] = await db.promise().query(
    `INSERT INTO departments (name, head, website, collage_id) VALUES (?, ?, ?, ?)`,
    [name, head, website, collageId]
  );
  return result;
};

// Delete Department
const deleteDepartment = async (id) => {
  const [result] = await db.promise().query(
    `DELETE FROM departments WHERE id = ?`,
    [id]
  );
  return result;
};

// View Department by ID
const getDepartmentById = async (id) => {
  const [rows] = await db.promise().query(
    `SELECT * FROM departments WHERE id = ?`,
    [id]
  );
  return rows;
};

// Search Departments by Name
const searchDepartmentsByName = async (name) => {
  const [rows] = await db.promise().query(
    `SELECT * FROM departments WHERE name LIKE ?`,
    [`%${name}%`]
  );
  return rows;
};

// Update Department
const updateDepartment = async (id, data) => {
  const { name, head, website, collageId } = data;
  const [result] = await db.promise().query(
    `UPDATE departments 
     SET name = ?, head = ?, website = ?, collage_id = ?
     WHERE id = ?`,
    [name, head, website, collageId, id]
  );
  return result;
};

module.exports = {
  addDepartment,
  deleteDepartment,
  getDepartmentById,
  searchDepartmentsByName,
  updateDepartment,
};
