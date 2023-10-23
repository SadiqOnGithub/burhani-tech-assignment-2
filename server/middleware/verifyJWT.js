
const verifyJWT = (req, res, next) => {
  // get authHeader from the req.headers (look for both a and A)

  // if header doesn't start with Bearer then return 401 Unauthorised

  // split and get the token

  // verify the token
  // -- error return 403 Forbidden
  // -- setting necessary context in req form decoded token
  next()
};

module.exports = verifyJWT; 