

const logEvents = async (message, logFileName) => {
  // logging in the local file
};

const logger = (req, res, next) => {
  // logging errors
  next();
};

module.exports = { logEvents, logger };