const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function that generates the JSON Web Token
function jwtGenerator(userID) {
  // Payload is the 'body' of the token - the part that we want to
  // send to the client
  const payload = { user: userID };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 });
}

module.exports = jwtGenerator;
