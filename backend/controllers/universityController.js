const universityModel = require('../models/universityModel');

// Add University
const addUniversity = async (req, res) => {
  const data = req.body;

  if (!data.name || !data.country || !data.email) {
    return res.status(400).json({ message: 'Name, country, and email are required fields.' });
  }

  try {
    const result = await universityModel.addUniversity(data);
    res.status(201).json({ message: 'University added successfully', universityId: result.insertId });
  } catch (error) {
    console.error('Error adding university:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// Delete University
const deleteUniversity = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await universityModel.deleteUniversity(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.status(200).json({ message: 'University deleted successfully' });
  } catch (error) {
    console.error('Error deleting university:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// Get University by ID
const getUniversityById = async (req, res) => {
  const id = req.params.id;

  try {
    const rows = await universityModel.getUniversityById(id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error retrieving university:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// Search Universities
const searchUniversitiesByName = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ message: 'Name query parameter is required' });
  }

  try {
    const rows = await universityModel.searchUniversitiesByName(name);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error searching universities:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// Update University
const updateUniversity = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const result = await universityModel.updateUniversity(id, data);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.status(200).json({ message: 'University updated successfully' });
  } catch (error) {
    console.error('Error updating university:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

const getAllUniversities = async (req, res) => {
  try {
    const rows = await universityModel.getAllUniversities();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching all universities:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};


module.exports = {
  addUniversity,
  deleteUniversity,
  getUniversityById,
  searchUniversitiesByName,
  updateUniversity,
  getAllUniversities,
};
