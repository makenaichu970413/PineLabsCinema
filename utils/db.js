// npm install mongodb

import { MongoClient } from "mongodb";

export async function connectToDB() {
  const { username, password, clustername, database } = process.env.mongoDB;
  const authURL = `mongodb+srv://${username}:${password}@${clustername}.kzg50.mongodb.net/${database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(authURL);

  return client;
}
