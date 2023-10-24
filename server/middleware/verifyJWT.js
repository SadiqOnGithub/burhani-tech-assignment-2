const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  // Get the token from the authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // If the header doesn't start with 'Bearer', return 401 Unauthorized
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Split and get the token
  const token = authHeader.split(' ')[1];

  // Verify the token
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        // If token verification fails, return 403 Forbidden
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Set user-related information in the req object
      req.userId = decoded.userId; // Assuming userId is part of the token payload
      req.user = decoded.username;
      req.roles = decoded.roles;

      // Continue with the request
      next();
    });
};

module.exports = verifyJWT;