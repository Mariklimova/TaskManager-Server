import jwt from 'jsonwebtoken';

function createToken(data) {
  const secret = 'secretWord';
  return jwt.sign(data[0], secret);
}

export { createToken };
