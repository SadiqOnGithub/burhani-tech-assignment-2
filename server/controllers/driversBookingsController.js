const mongoose = require('mongoose');
const Booking = require("../models/Booking");


// @desc Get Bookings nearby Driver 
// @route POST /bookings/drivers
// @access Private - Driver Only!
const getBookingsInRange = async (req, res) => {
  // Check if the user has the 'Driver' role
  if (!req.roles.includes('Driver')) return res.status(403).json({ message: 'Action not allowed' });

  const { driverLocation, range } = req.body;

  if (!driverLocation || !range) return res.status(400).json({ message: 'All fields are required' });

  // Ensure that driverLocation is a valid point (e.g., [longitude, latitude])
  if (!Array.isArray(driverLocation) || driverLocation.length !== 2) {
    return res.status(400).json({ message: 'Invalid driver location' });
  }

  // Use MongoDB's geospatial query to find bookings within the specified range
  const bookings = await Booking.find({
    origin: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: driverLocation, // [longitude, latitude]
        },
        $maxDistance: range * 1000, // Maximum distance in meters
      },
    },
  }).lean().exec();

  res.json(bookings);
};


// @desc Get a Bookings by id
// @route GET /bookings/drivers/:bookingId
// @access Private - Driver Only!
const getBookingById = async (req, res) => {
  // Check if the user has the 'Driver' role
  if (!req.roles.includes('Driver')) return res.status(403).json({ message: 'Action not allowed' });

  const { bookingId } = req.params; // Get the bookingId from the URL parameter

  // Check if bookingId is missing or not a valid ObjectId
  if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: 'Invalid or missing booking ID' });
  }

  const booking = await Booking.findById(bookingId).lean().exec();

  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  res.json(booking);
};

// @desc Update booking status
// @route PATCH /bookings/drivers/:bookingId
// @access Private - Driver Only!
const updateBookingById = async (req, res) => {
  // Check if the user has the 'Driver' role
  if (!req.roles.includes('Driver')) return res.status(403).json({ message: 'Action not allowed' });

  // Get the bookingId from the URL parameter and price from body
  const { params: { bookingId }, body: { price, driverId } } = req;

  if (!price || !driverId) return res.status(400).json({ message: 'Price and driverId are required' });

  // Check if bookingId is valid ObjectId or not
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: 'Invalid booking ID' });
  }
  // Check if driverId is valid ObjectId or not
  if (!mongoose.Types.ObjectId.isValid(driverId)) {
    return res.status(400).json({ message: 'Invalid driver ID' });
  }

  // check the user is not tampered
  if (driverId !== req.userId) return res.status(401).json({ message: 'Illegal request' });

  // find booking by id
  const booking = await Booking.findById(bookingId);

  // if booking not exist, return 404
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }


  booking.driver = driverId;
  booking.price = price;
  booking.status = 'Pending';

  // Save the updated booking
  await booking.save();

  // Return the updated booking
  res.json(booking);

};

module.exports = {
  getBookingsInRange,
  getBookingById,
  updateBookingById,
};