const User = require('../models/User');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password -__v').lean().exec();

  res.json(users);
  // res.send('getAllUsers');
};

const createNewUser = async (req, res) => {
  const { username, password, roles } = req.body;

  // Confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate username
  // tackling the lowercase issue with collation
  const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec();

  if (duplicate) return res.status(409).json({ message: 'Username already exist' });

  // Hash password 
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { username, password: hashedPwd, roles };

  // Create and store new user 
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New ${roles.at(0)} ${username} created` });
  } else {
    return res.status(500).json({ message: `${roles.at(0)} creation failed` });
  }
};

const updateUser = async (req, res) => {
  //
  res.send('updateUser');
};

const deleteUser = async (req, res) => {
  //
  res.send('deleteUser');
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser
};