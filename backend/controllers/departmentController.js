const departmentModel = require('../models/departmentModel');

// Add Department
const addDepartment = async (req, res) => {
  const { name, head, website } = req.body;
  const collageId = req.params.collageId;

  if (!name || !collageId) {
    return res.status(400).json({ message: 'Name and Collage ID are required' });
  }

  try {
    const result = await departmentModel.addDepartment({ name, head, website, collageId });
    res.status(201).json({ message: 'Department added successfully', departmentId: result.insertId });
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// Delete Department
const deleteDepartment = async (req, res) => {
  const departmentId = req.params.id;

  try {
    const result = await departmentModel.deleteDepartment(departmentId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// View Department
const getDepartmentById = async (req, res) => {
  const departmentId = req.params.id;

  try {
    const rows = await departmentModel.getDepartmentById(departmentId);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// Search Departments
const searchDepartmentsByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Name query parameter is required' });
  }

  try {
    const rows = await departmentModel.searchDepartmentsByName(name);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error searching departments:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// Update Department
const updateDepartment = async (req, res) => {
  const departmentId = req.params.id;
  const { name, head, website, collageId } = req.body;

  if (!name || !collageId) {
    return res.status(400).json({ message: 'Name and Collage ID are required' });
  }

  try {
    const result = await departmentModel.updateDepartment(departmentId, { name, head, website, collageId });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department updated successfully' });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

module.exports = {
  addDepartment,
  deleteDepartment,
  getDepartmentById,
  searchDepartmentsByName,
  updateDepartment,
};
