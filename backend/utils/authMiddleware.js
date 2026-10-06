import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    const error = new Error('Invalid or missing token!');
    error.status = 403;
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const { id, userName, email, role } = decoded;
  const user = { id, userName, email, role };

  req.user = user;

  next();
}
