const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAdminUsers
} = require('../controllers/userController');

const router = express.Router();

// Routes temporairement sans auth pour test
router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/admin/users').get(getAdminUsers);

module.exports = router;
