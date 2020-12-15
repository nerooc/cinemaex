const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authorization middleware, taking the request and sending it further
module.exports = async (req, res, next) => {
  try {
    // Taking the token from header
    const jwtToken = req.header('token');

    // If there is no token, return an error
    if (!jwtToken) {
      return res.status(403).json('Not authorized');
    }

    // If there is a token, verify it with JWT method .verify
    const verify = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = verify.user;
  } catch (err) {
    // Report errors in case they occur
    console.error(err.message);
    return res.status(403).json('Not authorized');
  }

  next();
};
