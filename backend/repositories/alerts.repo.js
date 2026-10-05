import { Collection, ObjectId } from 'mongodb';
import { connectToDb } from '../db/db.js';

async function getCollection() {
  const db = await connectToDb();
  /** @type {Collection} */
  const collection = db.collection('alerts');
  return collection;
}

async function getAlerts(filter) {
  const collection = await getCollection();
  const alerts = await collection.find(filter).toArray();
  return alerts;
}

async function getAlertById(alertId) {
  const collection = await getCollection();
  const alert = await collection.findOne({ _id: new ObjectId(alertId) });
  return alert;
}

async function createAlert(alertData) {
  const collection = await getCollection();
  const alert = await collection.insertOne(alertData);
  return { id: alert.insertedId.toString(), ...alertData };
}

async function updateAlert(alertId, newAlertData) {
  const collection = await getCollection();
  const updated = await collection.findOneAndUpdate(
    { _id: new ObjectId(alertId) },
    { $set: newAlertData },
    { returnDocument: 'after' }
  );
  return updated;
}

async function deleteAlert(alertId) {
  const collection = await getCollection();
  const deleted = await collection.findOneAndDelete({
    _id: new ObjectId(alertId),
  });

  return deleted;
}

export const alertsRepo = {
  getAlerts,
  getAlertById,
  createAlert,
  updateAlert,
  deleteAlert,
};
