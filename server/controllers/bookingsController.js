const Booking = require('../models/Booking');


const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().lean().exec();

  res.json(bookings);
};

const getABooking = async (req, res) => {
  const { userId } = req.body;

  // check if we recieved id 
  if (!userId) return res.status(400).json({ message: 'userId is required' });

  // Check user permissions (e.g., user should only be able to access their own bookings)
  console.log(userId, req.userId);
  console.log(typeof userId, typeof req.userId);
  console.log(userId != req.userId);
  if (userId !== req.userId) return res.status(403).json({ message: 'You do not have permission to access this booking' });

  // get the booking using id
  const booking = await Booking.findOne({ user: userId }).lean().exec();

  // if no booking send 204 for no content
  if (!booking) return res.sendStatus(204);

  // send booking
  res.json(booking);

};


const createNewBooking = async (req, res) => {
  const { userId, origin, destination, pickupTime } = req.body;

  // Confirm data
  if (!userId || !origin || !destination || !pickupTime) return res.status(400).json({ message: 'All fields are required' });

  // check the user is correct
  if (userId !== req.userId) return res.status(401).json({ message: 'Unauthorized' });

  // check if booking already exist
  const booking = await Booking.findOne({ user: userId }).lean().exec();

  // if booking already exist, return 409 conflict
  if (booking) return res.status(409).json({ message: 'One booking already exist' });

  // Create a new booking document
  const newBooking = await Booking.create({
    user: userId,
    origin: {
      type: 'Point',
      coordinates: [origin.longitude, origin.latitude],
    },
    destination: {
      type: 'Point',
      coordinates: [destination.longitude, destination.latitude],
    },
    pickupTime,
  });

  if (newBooking) {
    res.status(201).json(newBooking);
  } else {
    return res.status(500).json({ message: 'Booking creation failed' });
  }

};

const updateBooking = async (req, res) => {
  //
  res.send('updateBooking');
};

const deleteBooking = async (req, res) => {
  //
  res.send('deleteBooking');
};

module.exports = {
  getAllBookings,
  getABooking,
  createNewBooking,
  updateBooking,
  deleteBooking
};