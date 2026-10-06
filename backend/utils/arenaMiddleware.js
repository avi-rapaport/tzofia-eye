import { alertsService } from '../services/alerts.service';

export async function arenaMiddleware(req, res, next) {
  const assignedArena = req.user.assignedArena;
  const role = req.user.role;
  let arena;

  if (['GET', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const { id } = req.params;
    const alert = await alertsService.getAlertById(id);
    arena = alert.arena;
  } else {
    arena = req.body.arena;
  }

  if (!['admin', 'generalUser'].includes(role) && arena !== assignedArena) {
    const error = new Error('Access denied!');
    error.status = 403;
    throw error;
  }

  next();
}
