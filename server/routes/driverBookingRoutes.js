const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const driversBookingsController = require('../controllers/driversBookingsController');

router.use(verifyJWT);

router.route('/')
  .get(driversBookingsController.getBookingsInRange);

// Add a dynamic route to get a booking by ID;
router.route('/:bookingId')
  .get(driversBookingsController.getBookingById)
  .patch(driversBookingsController.updateBookingById);

module.exports = router;