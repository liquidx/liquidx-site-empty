import { EJSON } from "bson";
import { type Db, MongoClient } from "mongodb";
import type { DatabaseConfig } from "./config.d";

export const getDbUrl = (user: string, password: string, config: DatabaseConfig): string => {
  const params = new URLSearchParams(config.params);
  return `mongodb+srv://${user}:${password}@${config.serverName}/${config.databaseName}?${params.toString()}`;
};

export const getDbClient = async (user: string, password: string, config: DatabaseConfig) => {
  console.log("  >> Connecting");
  const url = getDbUrl(user, password, config);
  const client = new MongoClient(url);
  await client.connect();
  console.log("  << Database Connected");
  return client;
};

export type DbCommand = (db: Db) => Promise<any>;

export const executeQuery = async (
  client: MongoClient,
  command: DbCommand,
  dbName: string
): Promise<any> => {
  const db = client.db(dbName);
  try {
    return await command(db);
  } finally {
    console.log("	 >> Closing");
    await client.close();
  }
};

export const toJSON = (doc: { [key: string]: any }) => {
  return EJSON.deserialize(EJSON.serialize(doc));
};
