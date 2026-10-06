import express from 'express';
import { alertsService } from '../services/alerts.service.js';
import { authMiddleware } from '../utils/authMiddleware.js';
import { authService } from '../services/auth.services.js';

export const router = express.Router();

router.use(authMiddleware);

router.get('/users', async (req, res) => {
  const query = req.query;
  const users = await authService.getUsers(query);
  res.json(users);
});

router.get('/register', async (req, res) => {
  const userData = req.params;
  const created = await authService.register(userData);

  res.json(created);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const newAlert = await alertsService.createAlert(data);

  res.status(201).json(newAlert);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedAlert = await alertsService.updateAlert(id, data);

  res.json(updatedAlert);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedAlert = await alertsService.deleteAlert(id);

  res.json(deletedAlert);
});
