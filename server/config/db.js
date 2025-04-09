const mongoose = require('mongoose');

const connectDB = async () => {
  // Évite les doubles connexions
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10
    });
    
    console.log('✅ MongoDB connecté');
    console.log('Host:', mongoose.connection.host);
    console.log('DB:', mongoose.connection.name);
    
  } catch (err) {
    console.error('❌ Erreur de connexion MongoDB:', err);
    // Tentative de reconnexion automatique
    setTimeout(connectDB, 5000);
  }
};

// Gestion des événements
mongoose.connection.on('connected', () => {
  console.log('📌 Événement: MongoDB connecté');
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Événement: MongoDB déconnecté');
  // Tentative de reconnexion automatique
  setTimeout(connectDB, 5000);
});

module.exports = connectDB;