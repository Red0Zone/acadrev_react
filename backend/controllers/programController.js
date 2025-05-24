const programModel = require('../models/programModel');

// إضافة برنامج
const addProgram = async (req, res) => {
  const { name, language, evaluator_name } = req.body;
  const dep = req.user.department_id;

  try {
    const programId = await programModel.createProgram({
      name,
      language,
      dep,
      evaluator_name: evaluator_name || null
    });

    res.status(201).json({ message: 'Program created', programId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating program', error: err });
  }
};

// عرض جميع البرامج
const getAllPrograms = async (req, res) => {
  try {
    const programs = await programModel.getAllPrograms();
    res.status(200).json(programs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching programs', error: err });
  }
};

// عرض برامج القسم الحالي
const getMyPrograms = async (req, res) => {
  const dep = req.user.department_id;

  try {
    const all = await programModel.getAllPrograms();
    const filtered = all.filter(p => p.dep === dep);
    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ message: 'Error filtering programs', error: err });
  }
};

// تعديل البرنامج
const updateProgram = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await programModel.updateProgram(id, req.body);
    res.status(200).json({ message: 'Program updated', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating program', error: err });
  }
};

module.exports = {
  addProgram,
  getAllPrograms,
  getMyPrograms,
  updateProgram
};
