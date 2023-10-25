const Booking = require('../models/Booking');


// @desc Get Booking list for
// @route GET /bookings/users/all
// @access Public - only available in development env
const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().lean().exec();

  res.json(bookings);
};

// @desc Get a booking for user
// @route GET /bookings/users
// @access Private - User Only!
const getABooking = async (req, res) => {
  if (!req?.roles?.includes('User')) return res.status(403).json({ message: 'Action not allowed' });
  
  const { userId } = req.body;

  // check if we recieved id 
  if (!userId) return res.status(400).json({ message: 'userId is required' });

  // Check user permissions (e.g., user should only be able to access their own bookings)
  if (userId !== req.userId) return res.status(403).json({ message: 'You do not have permission to access this booking' });

  // get the booking using id
  const booking = await Booking.findOne({ user: userId }).lean().exec();

  // if no booking send 204 for no content
  if (!booking) return res.sendStatus(204);

  // send booking
  res.json(booking);

};

// @desc Create a booking for User
// @route POST /bookings/users
// @access Private - User Only!
const createNewBooking = async (req, res) => {
  if (!req?.roles?.includes('User')) return res.status(403).json({message: 'Action not allowed'});
  
  const { userId, origin, destination, pickupTime } = req.body;

  // Confirm data
  if (!userId || !origin || !destination || !pickupTime) return res.status(400).json({ message: 'All fields are required' });

  // Ensure that location is a valid point (e.g., [longitude, latitude])
  if (!Array.isArray(origin) || !Array.isArray(destination) || origin.length !== 2 || destination.length !== 2) {
    return res.status(400).json({ message: 'Invalid location' });
  }

  // check the userId is not tampered
  if (userId !== req.userId) return res.status(401).json({ message: 'Illegal request' });

  // check if booking already exist
  const booking = await Booking.findOne({ user: userId }).lean().exec();

  // if booking already exist, return 409 conflict
  if (booking) return res.status(409).json({ message: 'One booking already exist' });

  // Create a new booking document
  const newBooking = await Booking.create({
    user: userId,
    origin: {
      type: 'Point',
      coordinates: origin,  // [longitude, latitude]
    },
    destination: {
      type: 'Point',
      coordinates: destination,  // [longitude, latitude]
    },
    pickupTime,
  });

  if (newBooking) {
    res.status(201).json(newBooking);
  } else {
    return res.status(500).json({ message: 'Booking creation failed' });
  }

};

// NOT IN USE
const updateBooking = async (req, res) => {
  res.send('updateUsersBooking');
};

// NOT IN USE
const deleteBooking = async (req, res) => {
  res.send('deleteUsersBooking');
};

module.exports = {
  getAllBookings,
  getABooking,
  createNewBooking,
  updateBooking,
  deleteBooking
};