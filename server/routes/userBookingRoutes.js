const express = require('express');
const router = express.Router();
const usersBookingsController = require('../controllers/usersBookingsController');
const verifyJWT = require('../middleware/verifyJWT');

if (process.env.NODE_ENV === "development") {
  // warning!!! delete after testing
  router.route('/all')
    .get(usersBookingsController.getAllBookings);
}

router.use(verifyJWT);

router.route('/:userId')
  .get(usersBookingsController.getABooking);
router.route('/')
  .post(usersBookingsController.createNewBooking)
  .patch(usersBookingsController.acceptBooking)
  .delete(usersBookingsController.deleteBooking);


module.exports = router;
