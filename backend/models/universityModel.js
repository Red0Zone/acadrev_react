const db = require('../config/db');

// Add University
const addUniversity = async (data) => {
  const {
    name,
    website,
    short_name,
    logo,
    year,
    country,
    address,
    phone,
    tax,
    email,
    since,
    head_name,
    head_email,
  } = data;

  const [result] = await db.promise().query(
    `INSERT INTO universities (name, website, short_name, logo, year, country, address, phone, tax, email, since, head_name, head_email)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, website, short_name, logo, year, country, address, phone, tax, email, since, head_name, head_email]
  );
  return result;
};

// Delete University by id
const deleteUniversity = async (id) => {
  const [result] = await db.promise().query(
    'DELETE FROM universities WHERE id = ?',
    [id]
  );
  return result;
};

// Get University By ID
const getUniversityById = async (id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM universities WHERE id = ?',
    [id]
  );
  return rows;
};

// Search Universities By Name
const searchUniversitiesByName = async (name) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM universities WHERE name LIKE ?',
    [`%${name}%`]
  );
  return rows;
};

// Update University
const updateUniversity = async (id, data) => {
  const {
    name,
    website,
    short_name,
    logo,
    year,
    country,
    address,
    phone,
    tax,
    email,
    since,
    head_name,
    head_email,
  } = data;

  const [result] = await db.promise().query(
    `UPDATE universities
     SET name = ?, website = ?, short_name = ?, logo = ?, year = ?, country = ?, address = ?, phone = ?, tax = ?, email = ?, since = ?, head_name = ?, head_email = ?
     WHERE id = ?`,
    [name, website, short_name, logo, year, country, address, phone, tax, email, since, head_name, head_email, id]
  );
  return result;
};
// Get all universities
const getAllUniversities = async () => {
  const [rows] = await db.promise().query('SELECT * FROM universities');
  return rows;
};

module.exports = {
  addUniversity,
  deleteUniversity,
  getUniversityById,
  searchUniversitiesByName,
  updateUniversity,
  getAllUniversities,
};
