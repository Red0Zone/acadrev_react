const db = require('../config/db');

// Add User
const addUser = async (data) => {
  const { username, password, email, level, university, college, department, program, perm } = data;
  const [result] = await db.promise().query(
    `INSERT INTO users (username, password, email, level, university, college, department, program, perm)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [username, password, email, level, university, college, department, program, perm]
  );
  return result;
};

// Delete User
const deleteUser = async (id) => {
  const [result] = await db.promise().query(
    `DELETE FROM users WHERE id = ?`,
    [id]
  );
  return result;
};

// Update User
const updateUser = async (id, data) => {
  const { username, password, email, level, university, college, department, program, perm } = data;
  const [result] = await db.promise().query(
    `UPDATE users 
     SET username = ?, password = ?, email = ?, level = ?, university = ?, college = ?, department = ?, program = ?, perm = ?
     WHERE id = ?`,
    [username, password, email, level, university, college, department, program, perm, id]
  );
  return result;
};

module.exports = {
  addUser,
  deleteUser,
  updateUser,
};
