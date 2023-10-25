const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    enum: ['Created', 'Pending', 'Confirmed', 'Completed', 'Rejected'],
    // enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'On Route', 'In Progress', 'Delayed', 'Rejected'],
    default: 'Created',
  }
});

bookingSchema.index({ origin: '2dsphere' });  // adding index to search booking using location

module.exports = mongoose.model('Booking', bookingSchema);