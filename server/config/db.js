const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-powerbi', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      family: 4 // Force IPv4
    });
    
    console.log('✅ MongoDB connecté');
    console.log('Host:', mongoose.connection.host);
    console.log('DB:', mongoose.connection.name);
  } catch (err) {
    console.error('❌ Erreur de connexion MongoDB:', err.message);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('📌 Événement: MongoDB connecté');
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Événement: MongoDB déconnecté');
  setTimeout(connectDB, 5000);
});

module.exports = connectDB;