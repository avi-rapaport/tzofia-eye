import { alertsService } from '../services/alerts.service.js';

export async function statusMiddleware(req, res, next) {
  const role = req.user.role;
  const { id } = req.params;
  const { status } = req.body;

  const alert = await alertsService.getAlertById(id);

  if (!['admin', 'generalUser'].includes(role) && alert.status !== status) {
    const error = new Error('Access denied!');
    error.status = 403;
    throw error;
  }

  next();
}
