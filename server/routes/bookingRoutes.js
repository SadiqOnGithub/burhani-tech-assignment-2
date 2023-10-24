const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const verifyJWT = require('../middleware/verifyJWT');

if (process.env.NODE_ENV === "development") {
  // warning!!! delete after testing
  router.route('/all')
    .get(bookingsController.getAllBookings);
}

router.use(verifyJWT);

router.route('/')
  .get(bookingsController.getABooking)
  .post(bookingsController.createNewBooking)
  .patch(bookingsController.updateBooking)
  .delete(bookingsController.deleteBooking);


module.exports = router;
