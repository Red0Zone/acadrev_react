const bcrypt = require('bcrypt');
const collageModel = require('../models/collageModel');
const userModel = require('../models/userModel');
const db = require('../config/db');

// 1. الجامعة تنشئ الكلية + المستخدم المرتبط
const addCollage = async (req, res) => {
  const { name, username, email, password } = req.body;
  const university_id = req.user.university_id;

  try {
    const collageId = await collageModel.createCollage({
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
      college_id: collageId,
      department_id: null
    });

    res.status(201).json({ message: 'Collage and user created successfully', collageId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating collage', error: err });
  }
};

// 2. عرض كل الكليات (لمن لديه صلاحية)
const getAllCollages = async (req, res) => {
  try {
    const collages = await collageModel.getAllCollages();
    res.status(200).json(collages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching collages', error: err });
  }
};

// 3. الكلية تعرض نفسها
const getMyCollage = async (req, res) => {
  const id = req.user.college_id;

  try {
    const collage = await collageModel.getCollageById(id);
    res.status(200).json(collage);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching collage', error: err });
  }
};

// 4. تعديل بيانات الكلية
const updateCollage = async (req, res) => {
  const id = req.user.college_id;

  if ('name' in req.body) {
    return res.status(403).json({ message: 'Name is not editable' });
  }

  try {
    const result = await collageModel.updateCollage(id, req.body);
    res.status(200).json({ message: 'Collage updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating collage', error: err });
  }
};

module.exports = {
  addCollage,
  getAllCollages,
  getMyCollage,
  updateCollage
};
