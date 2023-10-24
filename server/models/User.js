const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [{
      type: String,
      enum: ['User', 'Driver'], // Restrict elements in the array to 'User' or 'Driver'
    }],
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);