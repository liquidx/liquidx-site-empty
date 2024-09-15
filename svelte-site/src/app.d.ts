// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { MongoClient } from "mongodb";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      dbClient: MongoClient;

    }
    // interface PageData {}
    // interface Platform {}
  }
}

export { };
