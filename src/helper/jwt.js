const jwt = require('jsonwebtoken');

function createToken(data) {
  const secret = 'secretWord';
  return jwt.sign(data[0], secret);
}

module.exports = { createToken };
