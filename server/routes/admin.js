const express = require('express');
const router = express.Router();
const { admin } = require('../middleware/auth');
const User = require('../models/User');

// Get all users
router.get('/users', admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Server error while fetching users' });
  }
});

// Update user
router.put('/users/:id', admin, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Server error while updating user' });
  }
});

// Delete user
router.delete('/users/:id', admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Server error while deleting user' });
  }
});

module.exports = router;
