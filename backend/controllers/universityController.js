const bcrypt = require('bcrypt');
const universityModel = require('../models/universityModel');
const userModel = require('../models/userModel');

// 1. إنشاء جامعة وحساب مستخدم لها (من قبل هيئة الاعتماد)
const addUniversity = async (req, res) => {
  const { name, username,email, password } = req.body;
  const authority_id = req.user.authority_id;

  try {
    const universityId = await universityModel.createUniversity({
      name,
      email: null,
      website: null,
      address: null,
      logo: null,
      authority_id,
      head_name: null,
      phone: null,
      tax: null
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      role: 'university',
      authority_id,
      university_id: universityId,
      college_id: null,
      department_id: null
    });

    res.status(201).json({
      message: 'University created. Waiting for university to complete its information.',
      universityId
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating university', error: err });
  }
};


// 2. عرض كل الجامعات (لـ هيئة الاعتماد أو الأدمن)
const getAllUniversities = async (req, res) => {
  try {
    const universities = await universityModel.getAllUniversities();
    res.status(200).json(universities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching universities', error: err });
  }
};

// 3. عرض جامعة واحدة (عرض ذاتي)
const getMyUniversity = async (req, res) => {
  const id = req.user.university_id;

  try {
    const uni = await universityModel.getUniversityById(id);
    res.status(200).json(uni);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching university', error: err });
  }
};

// 4. تحديث بيانات الجامعة (من قبل الجامعة نفسها)
const updateUniversity = async (req, res) => {
  const id = req.user.university_id;

  if ('name' in req.body) {
    return res.status(403).json({ message: 'Name is not editable' });
  }

  try {
    const result = await universityModel.updateUniversity(id, req.body);
    res.status(200).json({ message: 'University updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating university', error: err });
  }
};

module.exports = {
  addUniversity,
  getAllUniversities,
  getMyUniversity,
  updateUniversity
};
