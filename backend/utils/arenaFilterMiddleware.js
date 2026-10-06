import { alertsService } from '../services/alerts.service.js';

export async function arenaFilterMiddleware(req, res, next) {
  const assignedArena = req.user.assignedArena;
  const role = req.user.role;

  if (!['admin', 'generalUser'].includes(role)) {
    req.query.arena = assignedArena;
  }

  next();
}
