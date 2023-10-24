const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
// const verifyJWT = require('../middleware/verifyJWT');

if (process.env.NODE_ENV === "development") { 
  router.route('/all')
  .get(usersController.getAllUsers); // warning!!! delete after testing
}
router.route('/')
  .post(usersController.createNewUser);

// router.use(verifyJWT);

// router.route('/')
//   .patch(usersController.updateUser)
//   .delete(usersController.deleteUser);

module.exports = router;