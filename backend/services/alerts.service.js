import { alertsRepo } from '../repositories/alerts.repo.js';
import {
  createAlertSchema,
  updateAlertSchema,
  validateSchema,
} from '../utils/validation.js';

async function getAlerts(query) {
  const filter = query ? query : {};
  const result = await alertsRepo.getAlerts(filter);
  const alerts = result.map((alert) => {
    const { _id, ...rest } = alert;
    return { id: _id.toString(), ...rest };
  });
  return alerts;
}

async function getAlertById(alertId) {
  const alert = await alertsRepo.getAlertById(alertId);
  if (!alert) {
    const error = new Error('Alert not found!');
    error.status = 404;
    throw error;
  }

  const { _id, ...rest } = alert;

  return { id: _id.toString(), ...rest };
}

async function createAlert(alertData) {
  validateSchema(createAlertSchema);
  const dataToSave = { ...alertData, status: 'active', createdAt: new Date() };
  const cretaed = await alertsRepo.createAlert(dataToSave);
  const { _id, ...rest } = cretaed;

  return { ...rest };
}

async function updateAlert(alertId, newAlertData) {
  const alert = await getAlertById(alertId);

  validateSchema(updateAlertSchema);

  const updated = await alertsRepo.updateAlert(alertId, newAlertData);
  const { _id, ...rest } = updated;

  return { id: _id.toString(), ...rest };
}

async function deleteAlert(alertId) {
  const alert = await getAlertById(alertId);

  const deleted = await alertsRepo.deleteAlert(alertId);
  const { _id, ...rest } = deleted;

  return { id: _id.toString(), ...rest };
}

export const alertsService = {
  getAlerts,
  getAlertById,
  createAlert,
  updateAlert,
  deleteAlert,
};
