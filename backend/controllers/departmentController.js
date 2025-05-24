const bcrypt = require('bcrypt');
const departmentModel = require('../models/departmentModel');
const userModel = require('../models/userModel');

// 1. الكلية تنشئ القسم + مستخدم مرتبط
const addDepartment = async (req, res) => {
  const { name, username,email, password } = req.body;
  const college_id = req.user.college_id;

  try {
    const departmentId = await departmentModel.createDepartment({
      name,
      email: null,
      website: null,
      address: null,
      logo: null,
      college_id,
      head_name: null // ✅ يبدأ كـ null
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      role: 'department',
      authority_id: null,
      university_id: null,
      college_id,
      department_id: departmentId
    });

    res.status(201).json({ message: 'Department and user created successfully', departmentId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating department', error: err });
  }
};

// 2. عرض كل الأقسام
const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentModel.getAllDepartments();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching departments', error: err });
  }
};

// 3. عرض قسم حالي (من قبل المسؤول)
const getMyDepartment = async (req, res) => {
  const id = req.user.department_id;

  try {
    const dept = await departmentModel.getDepartmentById(id);
    res.status(200).json(dept);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching department', error: err });
  }
};

// 4. تعديل بيانات القسم
const updateDepartment = async (req, res) => {
  const id = req.user.department_id;

  if ('name' in req.body) {
    return res.status(403).json({ message: 'Name is not editable' });
  }

  try {
    const result = await departmentModel.updateDepartment(id, req.body);
    res.status(200).json({ message: 'Department updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating department', error: err });
  }
};

module.exports = {
  addDepartment,
  getAllDepartments,
  getMyDepartment,
  updateDepartment
};
