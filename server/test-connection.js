require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    // Établir la connexion
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    console.log('✅ Connexion réussie à MongoDB');
    console.log('📁 Base de données:', mongoose.connection.name);

    // Vérifier la collection users
    const collections = await mongoose.connection.db.listCollections().toArray();
    const usersExists = collections.some(coll => coll.name === 'users');

    if (usersExists) {
      console.log('✔ Collection "users" existe');
    } else {
      console.log('❌ Collection "users" manquante - Création en cours...');
      await mongoose.connection.createCollection('users');
      console.log('✔ Collection "users" créée');
    }

    // Test CRUD basique
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      password: String
    }));

    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456'
    });
    console.log('✔ Utilisateur test créé:', testUser._id);

    // Nettoyage
    await User.deleteOne({ _id: testUser._id });
    await mongoose.disconnect();
    process.exit(0);

  } catch (err) {
    console.error('❌ Erreur de test:', err);
    process.exit(1);
  }
}

testConnection();