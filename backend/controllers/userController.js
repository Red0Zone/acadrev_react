const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const db = require('../config/db');

const allowedCreation = {
  admin: ['authority'],
  authority: ['university'],
  university: ['college'],
  college: ['department']
};

// إنشاء مستخدم
const createUser = async (req, res) => {
  const creator = req.user;
  const { username, email, password, role, authority_id, university_id, college_id, department_id } = req.body;

  if (!allowedCreation[creator.role]?.includes(role)) {
    return res.status(403).json({ message: 'You are not allowed to create this role.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      role,
      authority_id,
      university_id,
      college_id,
      department_id
    });

    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// تعديل مستخدم
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, email, password, role, authority_id, university_id, college_id, department_id } = req.body;
  const creator = req.user;

  if (!allowedCreation[creator.role]?.includes(role)) {
    return res.status(403).json({ message: 'You are not allowed to update this role.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.updateUser(userId, {
      username,
      email,
      password: hashedPassword,
      role,
      authority_id,
      university_id,
      college_id,
      department_id
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
};

// حذف مستخدم
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await userModel.deleteUser(userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};

// عرض كل المستخدمين
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userModel.getUserProfileById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Error fetching user profile', error: err });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  getUserProfile,
  deleteUser
};
