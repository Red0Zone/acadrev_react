const userModel = require('../models/userModel');

// Add User
const addUser = async (req, res) => {
  const { username, password, email, level, university, college, department, program, perm } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, Password, and Email are required' });
  }

  try {
    const result = await userModel.addUser({ username, password, email, level, university, college, department, program, perm });
    res.status(201).json({ message: 'User added successfully', userId: result.insertId });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await userModel.deleteUser(userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// Update User
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, password, email, level, university, college, department, program, perm } = req.body;

  try {
    const result = await userModel.updateUser(userId, { username, password, email, level, university, college, department, program, perm });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

module.exports = {
  addUser,
  deleteUser,
  updateUser,
};
