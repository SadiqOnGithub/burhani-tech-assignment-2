const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {
  // get username and p/w from body
  const { username, password } = req.body;

  // check username and p/w are there
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // get user from db
  const foundUser = await User.findOne({ username }).lean().exec();

  // return 401 Unauthorized if user not found
  if (!foundUser) {
    return res.status(401).json({ message: 'username does not match' });
  }

  // check the password match with the encrypted password in the db
  const match = await bcrypt.compare(password, foundUser.password);

  // return 401 Unauthorized if p/w doesn't match
  if (!match) return res.status(401).json({ message: 'Unauthorized' });

  // create access and refresh token
  const accessToken = jwt.sign(
    {
      "userId": foundUser._id,
      "username": foundUser.username,
      "roles": foundUser.roles,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30m' }
  );

  const refreshToken = jwt.sign(
    { "username": foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  // set refresh token to http-only cookie with other security setting
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server 
    secure: true, //https
    sameSite: 'None', //cross-site cookie 
    maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  });

  // send access token as json
  res.json({ accessToken });
};

const refresh = (req, res) => {
  // get cookies from req

  // check (!cookies?.jwt); if not sent 401 Unauthorized

  // verify refresh token
  // -- if error send 403 Forbidden
  // -- get the user from db using decoded username
  // -- return 401 Unauthorized if user not found
  // -- create access token
  // -- send access token as json

};

const logout = (req, res) => {
  // get cookies from req

  // if (!cookies?.jwt) and sent 204

  // clear cookies with same security setting
};

module.exports = {
  userLogin,
  refresh,
  logout
};