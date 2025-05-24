const db = require('../config/db');

// عرض الملف الشخصي
const getProfile = async (req, res) => {
  const { id, username, role, authority_id, university_id, college_id, department_id } = req.user;

  try {
    let profile = null;

    switch (role) {
      case 'admin':
        profile = { id, username, role };
        break;

      case 'authority': {
        const [rows] = await db.promise().query('SELECT * FROM authorities WHERE id = ?', [authority_id]);
        profile = rows[0];
        break;
      }

      case 'university': {
        const [rows] = await db.promise().query('SELECT * FROM universities WHERE id = ?', [university_id]);
        profile = rows[0];
        break;
      }

      case 'college': {
        const [rows] = await db.promise().query('SELECT * FROM collages WHERE id = ?', [college_id]);
        profile = rows[0];
        break;
      }

      case 'department': {
        const [rows] = await db.promise().query('SELECT * FROM departments WHERE id = ?', [department_id]);
        profile = rows[0];
        break;
      }

      default:
        return res.status(400).json({ message: 'Unknown role' });
    }

    res.status(200).json({ id, username, role, profile });

  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err });
  }
};

// تحديث بيانات البريد أو اسم المستخدم
const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { email, username } = req.body;

  try {
    const [result] = await db.promise().query(
      `UPDATE users SET email = ?, username = ? WHERE id = ?`,
      [email, username, userId]
    );

    res.status(200).json({ message: 'Profile updated successfully', result });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err });
  }
};

const updatePassword = async (req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
  
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new password are required.' });
    }
  
    try {
      const [users] = await db.promise().query('SELECT password FROM users WHERE id = ?', [userId]);
      const user = users[0];
  
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect.' });
      }
  
      const hashed = await bcrypt.hash(newPassword, 10);
      await db.promise().query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId]);
  
      res.status(200).json({ message: 'Password updated successfully' });
  
    } catch (err) {
      res.status(500).json({ message: 'Error updating password', error: err });
    }
  };
module.exports = {
  getProfile,
  updateProfile,
  updatePassword
};
