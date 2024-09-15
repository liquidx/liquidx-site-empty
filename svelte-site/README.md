Template for a Svelte Config

# Configuration

## Database and Storage

```
// TODO: Fill in the default database name
export const databaseConfig: DatabaseConfig = {
  databaseName: "",
  serverName: "db-mongodb-sfo2-liquidx-bdf6d203.mongo.ondigitalocean.com",
  params: {
    authSource: "admin",
    replicaSet: "db-mongodb-sfo2-liquidx",
    tls: "true"
  }
}

// TODO: Fill in the default storage bucket
export const storageConfig: StorageConfig = {
  bucket: "",
  region: "us-west-1",
  serviceUrl: "https://s3.us-west-1.wasabisys.com"
}
```

Add something like this in the `config.ts` that you will use to pass in to different parts of the initialization, including `hooks.server.ts`.
