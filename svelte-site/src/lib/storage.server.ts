// S3-compat Wasabi
import {
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import type { Readable } from 'stream';
import type { StorageConfig } from './config.d';

export const getS3Client = (accessKey: string, secretKey: string, storageConfig: StorageConfig) => {
  const httpHandler = new NodeHttpHandler({ requestTimeout: 10000 });
  return new S3Client({
    region: storageConfig.region,
    endpoint: storageConfig.serviceUrl,
    requestHandler: httpHandler,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey
    }
  });
};

export const writeFile = (client: S3Client, bucket: string, filePath: string, data: Buffer): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: filePath,
    Body: data
  });
  return client
    .send(command)
    .then((result: any) => {
      return filePath;
    })
    .catch((err: any) => {
      console.error('Error writing file to S3', err);
      throw err;
    });
};

export const readFileAsString = async (
  client: S3Client,
  bucket: string,
  filePath: string
): Promise<string | undefined> => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: filePath
  });

  const response = await client.send(command);
  if (!response.Body) {
    return undefined;
  }

  return response.Body.transformToString();
};

export const readFileStream = async (
  client: S3Client,
  bucket: string,
  filePath: string
): Promise<Readable | undefined> => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: filePath
  });

  const response = await client.send(command);
  if (!response.Body) {
    return undefined;
  }

  return response.Body as Readable;
};

export const listFiles = async (client: S3Client, bucket: string, prefix: string) => {
  const command = new ListObjectsCommand({
    Bucket: bucket,
    Delimiter: '/',
    Prefix: prefix,
    MaxKeys: 10000
  });
  const response = await client.send(command);
  return response.Contents;
};

export const shallowListFiles = async (client: S3Client, bucket: string, prefix: string) => {
  const command = new ListObjectsCommand({
    Bucket: bucket,
    Delimiter: '/',
    Prefix: prefix,
    MaxKeys: 10000
  });
  const response = await client.send(command);
  return response.CommonPrefixes;
};
