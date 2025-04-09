const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-powerbi')
  .then(() => {
    console.log('Connected to MongoDB');
    return User.find({}).select('-password');
  })
  .then(users => {
    console.log('Users:', users);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
