const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ["Driver"]
  },
});

module.exports = mongoose.model('Driver', driverSchema);