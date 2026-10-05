import { MongoClient } from 'mongodb';

let client, db;

export async function connectToDb() {
  try {
    if (!db) {
      client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      console.log('Client connected to mongo');
      db = client.db(process.env.MONGODB_NAME);
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return db;
}
