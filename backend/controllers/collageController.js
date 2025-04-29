const collegeModel = require('../models/collageModel');

// Add Collage
const addCollage = async (req, res) => {
  const { name, dean, website } = req.body;
  const universityId = req.params.universityId;

  if (!name || !universityId) {
    return res.status(400).json({ message: 'Name and University ID are required' });
  }

  try {
    const result = await collegeModel.addCollage({ name, dean, website, universityId });
    res.status(201).json({ message: 'Collage added successfully', collageId: result.insertId });
  } catch (error) {
    console.error('Error adding collage:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// Delete Collage
const deleteCollage = async (req, res) => {
  const collageId = req.params.id;

  try {
    const result = await collegeModel.deleteCollage(collageId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Collage not found' });
    }

    res.status(200).json({ message: 'Collage deleted successfully' });
  } catch (error) {
    console.error('Error deleting collage:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// View Collage
const getCollageById = async (req, res) => {
  const collageId = req.params.id;

  try {
    const rows = await collegeModel.getCollageById(collageId);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Collage not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching collage:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};

// Search Collages
const searchCollagesByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Name query parameter is required' });
  }

  try {
    const rows = await collegeModel.searchCollagesByName(name);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error searching collages:', error);
    res.status(500).json({ message: 'Database error', error });
  }
};
const updateCollage = async (req, res) => {
    const collageId = req.params.id;
    const { name, dean, website, universityId } = req.body;
  
    if (!name || !universityId) {
      return res.status(400).json({ message: 'Name and University ID are required' });
    }
  
    try {
      const result = await collegeModel.updateCollage(collageId, { name, dean, website, universityId });
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Collage not found' });
      }
  
      res.status(200).json({ message: 'Collage updated successfully' });
    } catch (error) {
      console.error('Error updating collage:', error);
      res.status(500).json({ message: 'Database error', error });
    }
  };

module.exports = {
  addCollage,
  deleteCollage,
  getCollageById,
  searchCollagesByName,
  updateCollage,
};
