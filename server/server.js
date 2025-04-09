require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
console.log('Configuration JWT:', {
  secret: process.env.JWT_SECRET ? 'OK' : 'MANQUANT',
  expire: process.env.JWT_EXPIRE || 'NON DÉFINI'
});
// Initialisation
const app = express();

// Middleware CORS amélioré
app.use(cors({
    origin: 'http://localhost:3000', // Autorise uniquement le frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

// Middleware pour vérifier l'état de la DB
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.error('⚠️ Tentative de reconnexion à MongoDB...');
    require('./config/db')(); // Recharge la connexion
  }
  next();
});

// Ensure proper body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Removed global authentication middleware. Authentication is handled by 'protect' middleware on specific routes.

// Database connection log (log only once)
mongoose.connection.once('open', () => {
  console.log('✅ MongoDB connecté');
});

// Remove redundant database state logs
mongoose.connection.on('connected', () => {
  console.log('📌 Événement: MongoDB connecté');
});

// Routes
const { protect } = require('./middleware/auth');

app.use('/api/auth', authRoutes);
app.use('/api/admin', protect, require('./routes/admin'));

// Removed redundant /api/auth/verify route. Use /api/auth/me instead.
// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur globale:', err);
  res.status(500).json({ error: 'Erreur serveur' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  require('./config/db')(); // Initialise la connexion DB
});