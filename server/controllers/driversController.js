const Driver = require('../models/Driver');
const bcrypt = require('bcrypt');

const getAllDrivers = async (req, res) => {
  //
  res.send('getAllDrivers');
};

const createNewDriver = async (req, res) => {
  const { username, password, roles } = req.body;

  // Confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate username
  // tackling the lowercase issue with collation
  const duplicate = await Driver.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate username' });
  }

  // Hash password 
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { username, password: hashedPwd, roles };

  // Create and store new user 
  const driver = await Driver.create(userObject);

  if (driver) { 
    res.status(201).json({ message: `New driver ${username} created` });
  } else {
    res.status(400).json({ message: 'Invalid user data received' });
  }
};

const updateDriver = async (req, res) => {
  //
  res.send('updateDriver');
};

const deleteDriver = async (req, res) => {
  //
  res.send('deleteDriver');
};

module.exports = {
  getAllDrivers,
  createNewDriver,
  updateDriver,
  deleteDriver
};