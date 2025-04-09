const express = require('express');
const { 
  login,
  register,
  getMe,  // Assurez-vous que cette fonction existe dans authController
  getUser // Nouvelle fonction à ajouter
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', protect, getMe);
router.get('/user', protect, getUser); // Nouvelle route

module.exports = router;