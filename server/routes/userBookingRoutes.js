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
  .post(usersBookingsController.createNewBooking);
// .patch(bookingsController.updateBooking)
// .delete(bookingsController.deleteBooking);


module.exports = router;
