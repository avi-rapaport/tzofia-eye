import express from 'express';
import { alertsService } from '../services/alerts.service.js';
import { authMiddleware } from '../utils/authMiddleware.js';
import { authService } from '../services/auth.services.js';
import { adminMiddleware } from '../utils/adminMiddleware.js';

export const router = express.Router();

router.get('/me', authMiddleware, (req, res) => {
  const user = req.user;
  res.json(user);
});

router.get('/users', adminMiddleware, async (req, res) => {
  const query = req.query;
  const users = await authService.getUsers(query);
  res.json(users);
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = authService.getUserById(id);
  res.json(user);
});

router.post('/register', adminMiddleware, async (req, res) => {
  const userData = req.body;
  const created = await authService.register(userData);

  res.status(201).json(created);
});

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  const { user, token } = await authService.login(userName, password);
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
  });

  res.json(user);
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'User logged out successfully' });
});

router.delete('/users/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const deleted = await authService.deleteUserById(id);

  res.json(deleted);
});
