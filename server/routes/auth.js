const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('../middleware/authMiddleware');

// Endpoint to verify user authentication and role
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ user: { id: user.id, role: user.role, email: user.email } }); // Include role in response
  } catch (error) {
    console.error('Erreur lors de la vérification:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;