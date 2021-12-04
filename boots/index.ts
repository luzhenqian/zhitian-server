import * as Minio from "minio";
import { MongoDBOptional, createMongoDBConnect } from "./mongo";
import { MinioOptional, createMinioInstance } from "./minio";

async function initMongoConnection() {
  const optional = new MongoDBOptional(process.env.MONGODB_URI);
  await createMongoDBConnect(optional);
}

export let minioClient: Minio.Client;

async function initMinio() {
  const optional = new MinioOptional(
    process.env.MINIO_ENDPOINT,
    process.env.MINIO_PORT,
    process.env.MINIO_USESSL,
    process.env.MINIO_ACCESSKEY,
    process.env.MINIO_SECRETKEY
  );
  minioClient = await createMinioInstance(optional);
}

export function init() {
  return Promise.all([initMongoConnection(), initMinio()]);
}
