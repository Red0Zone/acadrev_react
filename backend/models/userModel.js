// models/userModel.js

const userModel = {
  id: {
    type: 'INT',
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: 'VARCHAR(100)',
    allowNull: false,
    unique: true,
  },
  password: {
    type: 'VARCHAR(255)',
    allowNull: false,
  },
  email: {
    type: 'VARCHAR(100)',
    allowNull: false,
    unique: true,
  },
  level: {
    type: 'VARCHAR(50)',
    allowNull: false,
  },
  university: {
    type: 'VARCHAR(255)',
    allowNull: false,
  },
  college: {
    type: 'VARCHAR(255)',
    allowNull: false,
  },
  department: {
    type: 'VARCHAR(255)',
    allowNull: false,
  },
  program: {
    type: 'VARCHAR(255)',
    allowNull: false,
  },
  perm: {
    type: 'VARCHAR(255)',
    allowNull: true, // Assuming it's optional
  },
};

module.exports = userModel;