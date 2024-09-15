// import { MONGO_DB_PASSWORD, MONGO_DB_USERNAME } from "$env/static/private";
// import { getDbClient } from "$lib/db.server";
// import type { Handle } from "@sveltejs/kit";
// import type { HandleServerError } from "@sveltejs/kit";
// import { sequence } from "@sveltejs/kit/hooks";
// import type { MongoClient } from "mongodb";

// let _cachedDbClient: MongoClient | undefined;

// const dbPrepare: Handle = async ({ event, resolve }) => {
//   if (_cachedDbClient) {
//     event.locals.dbClient = _cachedDbClient;
//   } else {
//     //console.log("hooks.server.ts: dbPrepare: create new dbClient");
//     _cachedDbClient = await getDbClient(MONGO_DB_USERNAME, MONGO_DB_PASSWORD);
//     event.locals.dbClient = _cachedDbClient;
//   }

//   const response = await resolve(event);
//   return response;
// };

// // Add more params if we need more handlers.
// export const handle = sequence(dbPrepare);

// export const handleError: HandleServerError = ({ error }) => {
//   return { message: (error as any).message };
// };
