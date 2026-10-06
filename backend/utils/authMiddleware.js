import jwt from 'jsonwebtoken';
import { authService } from '../services/auth.services.js';

export async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log('aaaa');
    const error = new Error('Invalid or missing token!');
    error.status = 403;
    throw error;
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const { userName } = decoded;
  const user = await authService.getUserByName(userName);

  req.user = user;

  next();
}
