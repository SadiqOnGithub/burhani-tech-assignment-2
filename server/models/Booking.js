const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
  origin: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // Array to store [longitude, latitude]
    },
  },
  destination: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // Array to store [longitude, latitude]
    },
  },
  pickupTime: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Rejected'],
    // enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'On Route', 'In Progress', 'Delayed', 'Rejected'],
    default: 'Pending',
  }
});

module.exports = mongoose.model('Booking', bookingSchema);