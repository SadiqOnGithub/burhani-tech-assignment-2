const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const driversBookingsController = require('../controllers/driversBookingsController');

router.use(verifyJWT);

router.route('/')
  .get(driversBookingsController.getBookingsInRange);

module.exports = router;