const { MongoClient } = require('mongodb');

let db;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    db = client.db('RQ_Analytics');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getDb() {
  return db;
}

module.exports = { connectToDatabase, getDb };