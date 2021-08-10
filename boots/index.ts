import mongoose from "mongoose";
import * as Minio from "minio";

function initMongoConnection() {
  mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  return new Promise((resolve, reject) => {
    db.on("error", (err) => reject(err));
    db.once("open", () => {
      resolve(null);
    });
  });
}

export let minioClient: Minio.Client;

function initMinio() {
  if (process.env.MINIO_ENDPOINT === undefined) {
    throw Error("lack minio client param [MINIO_ENDPOINT]");
  }
  if (process.env.MINIO_PORT === undefined) {
    throw Error("lack minio client param [MINIO_PORT]");
  }
  if (process.env.MINIO_USESSL === undefined) {
    throw Error("lack minio client param [MINIO_USESSL]");
  }
  if (process.env.MINIO_ACCESSKEY === undefined) {
    throw Error("lack minio client param [MINIO_ACCESSKEY]");
  }
  if (process.env.MINIO_SECRETKEY === undefined) {
    throw Error("lack minio client param [MINIO_SECRETKEY]");
  }

  minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: Number(process.env.MINIO_PORT),
    useSSL: process.env.MINIO_USESSL === "true",
    accessKey: process.env.MINIO_ACCESSKEY,
    secretKey: process.env.MINIO_SECRETKEY,
  });
}

export function init() {
  return Promise.all([initMongoConnection(), initMinio()]);
}
