import jwt from 'jsonwebtoken';

export function generateToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });

  return token;
}
