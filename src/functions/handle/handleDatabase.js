const { MongoClient } = require('mongodb');
const config = require('../../../config.json');
const Logger = require("../../Logger")

const uri = config.database.uri;
const dbName = 'discordLinkedDB';

let client;
let db;

async function connect() {
 if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    Logger.databaseMessage(
        "Database Ready And Loaded!"
      )
 }
}

function getDb() {
 if (!db) {
    throw new Error('Database connection not established.');
 }
 return db;
}

async function disconnect() {
 if (client) {
    await client.close();
    client = null;
    db = null;
 }
}
/* 
async function logEverything() {
 await connect();

 const collections = await db.collections();

 for (const collection of collections) {
    const cursor = collection.find({});

    await cursor.forEach(doc => {
      console.log(doc);
    });
 }

 await disconnect();
}

logEverything().catch(console.error);
*/
module.exports = {
  connect,
  getDb,
  disconnect
};