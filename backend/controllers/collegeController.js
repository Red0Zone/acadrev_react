const bcrypt = require('bcrypt');
const collegeModel = require('../models/collegeModel');
const userModel = require('../models/userModel');
const db = require('../config/db');

// 1. الجامعة تنشئ الكلية + المستخدم المرتبط
const addCollege = async (req, res) => {
  const { name, username, email, password } = req.body;
  const university_id = req.user.university_id;

  try {
    const collegeId = await collegeModel.createCollege({
      name,
      email: null,
      website: null,
      address: null,
      logo: null,
      university_id,
      head_name: null //  تضاف الآن وتكون null
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      role: 'college',
      authority_id: null,
      university_id,
      college_id: collegeId,
      department_id: null
    });

    res.status(201).json({ message: 'College and user created successfully', collegeId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating college', error: err });
  }
};

// 2. عرض كل الكليات (لمن لديه صلاحية)
const getAllColleges = async (req, res) => {
  try {
    const colleges = await collegeModel.getAllColleges();
    res.status(200).json(colleges);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching colleges', error: err });
  }
};

// 3. الكلية تعرض نفسها
const getMyCollege = async (req, res) => {
  const id = req.user.college_id;

  try {
    const college = await collegeModel.getCollegeById(id);
    res.status(200).json(college);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching college', error: err });
  }
};

// 4. تعديل بيانات الكلية
const updateCollege = async (req, res) => {
  const id = req.user.college_id;

  if ('name' in req.body) {
    return res.status(403).json({ message: 'Name is not editable' });
  }

  try {
    const result = await collegeModel.updateCollege(id, req.body);
    res.status(200).json({ message: 'College updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating college', error: err });
  }
};

// 5. Get colleges for a specific university (based on logged-in university user)
const getCollegesByUniversity = async (req, res) => {
  const university_id = req.user?.university_id; // Get university_id from the authenticated user's token

  if (!university_id) {
    return res.status(400).json({ message: 'University ID not found in user token.' });
  }

  try {
    // Corrected function call:
    const colleges = await collegeModel.getCollegesByUniversity(university_id); 
    if (!colleges || colleges.length === 0) {
      return res.status(200).json([]); // Return empty array if no colleges found, not an error
    }
    res.status(200).json(colleges);
  } catch (err) {
    console.error('Error fetching colleges by university ID:', err);
    res.status(500).json({ message: 'Error fetching colleges for the university', error: err.message });
  }
};

module.exports = {
  addCollege,
  getAllColleges,
  getMyCollege,
  updateCollege,
  getCollegesByUniversity 
};
