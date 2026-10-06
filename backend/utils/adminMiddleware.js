import jwt from 'jsonwebtoken';

export function adminMiddleware(req, res, next) {
  const role = req.user.role;
  if (role !== 'admin') {
    const error = new Error('Access denied!');
    error.status = 403;
    throw error;
  }

  next();
}
