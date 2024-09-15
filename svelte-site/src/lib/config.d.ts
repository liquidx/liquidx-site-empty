export interface DatabaseConfig {
  databaseName: string;
  serverName: string;
  params: Record<string, string>;
}

export interface StorageConfig {
  bucket: string;
  region: string;
  serviceUrl: string;
}
