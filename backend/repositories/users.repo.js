import { Collection, ObjectId } from 'mongodb';
import { connectToDb } from '../db/db.js';

async function getCollection() {
  const db = await connectToDb();
  /** @type {Collection} */
  const collection = db.collection('users');
  return collection;
}

async function getUsers(filter) {
  const collection = await getCollection();
  const users = await collection.find(filter).toArray();
  return users;
}

async function getUserById(userId) {
  const collection = await getCollection();
  const user = await collection.findOne({ _id: new ObjectId(userId) });
  return user;
}

async function saveUser(userData) {
  const collection = await getCollection();
  const created = await collection.insertOne(userData);
  return { id: created.insertedId.toString(), ...users };
}

async function deleteUserById(userId) {
  const collection = await getCollection();
  const deleted = await collection.findOneAndDelete({
    _id: new ObjectId(alertId),
  });

  return deleted;
}

export const alertsRepo = {
  getUsers,
  saveUser,
  deleteUserById,
};
