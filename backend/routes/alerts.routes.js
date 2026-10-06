import express from 'express';
import { alertsService } from '../services/alerts.service.js';
import { authMiddleware } from '../utils/authMiddleware.js';
import { arenaMiddleware } from '../utils/arenaMiddleware.js';
import { statusMiddleware } from '../utils/statusMiddleware.js';

export const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const query = req.query;
  const alerts = await alertsService.getAlerts(query);

  res.json(alerts);
});

router.get('/:id', arenaMiddleware, async (req, res) => {
  const { id } = req.params;
  const alert = await alertsService.getAlertById(id);

  res.json(alert);
});

router.post('/', arenaMiddleware, async (req, res) => {
  const data = req.body;
  const newAlert = await alertsService.createAlert(data);

  res.status(201).json(newAlert);
});

router.put('/:id', arenaMiddleware, statusMiddleware, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedAlert = await alertsService.updateAlert(id, data);

  res.json(updatedAlert);
});

router.delete('/:id', arenaMiddleware, async (req, res) => {
  const { id } = req.params;
  const deletedAlert = await alertsService.deleteAlert(id);

  res.json(deletedAlert);
});
