

const login = async (req, res) => {
  // get username and p/w from body

  // check username and p/w are there

  // get user from db

  // return 401 Unauthorized if user not found

  // check the password match with the encrypted password in the db

  // return 401 Unauthorized if p/w doesn't match

  // create access and refresh token

  // set refresh token to http-only cookie with other security setting

  // send access token as json
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
  login,
  refresh,
  logout
};