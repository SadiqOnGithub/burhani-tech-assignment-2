const Booking = require("../models/Booking");


const getBookingsInRange = async (req, res) => {
  // Check if the user has the 'Driver' role
  if (!req.roles.includes('Driver')) {
    return res.status(403).json({ message: 'Action not allowed' });
  }

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
  });

  res.json(bookings);
};



module.exports = {
  getBookingsInRange
};