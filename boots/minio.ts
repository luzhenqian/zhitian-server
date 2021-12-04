import * as Minio from "minio";

interface IMinioOptional {
  MINIO_ENDPOINT: string;
  MINIO_PORT: number;
  MINIO_USESSL: boolean;
  MINIO_ACCESSKEY: string;
  MINIO_SECRETKEY: string;
}

export class MinioOptional implements IMinioOptional {
  MINIO_ENDPOINT: string;
  MINIO_PORT: number;
  MINIO_USESSL: boolean;
  MINIO_ACCESSKEY: string;
  MINIO_SECRETKEY: string;
  constructor(
    MINIO_ENDPOINT: string | undefined,
    MINIO_PORT: string | undefined,
    MINIO_USESSL: string | undefined,
    MINIO_ACCESSKEY: string | undefined,
    MINIO_SECRETKEY: string | undefined
  ) {
    if (MINIO_ENDPOINT === undefined) {
      throw Error("lack minio client param [MINIO_ENDPOINT]");
    }
    if (MINIO_PORT === undefined) {
      throw Error("lack minio client param [MINIO_PORT]");
    }
    if (MINIO_USESSL === undefined) {
      throw Error("lack minio client param [MINIO_USESSL]");
    }
    if (MINIO_ACCESSKEY === undefined) {
      throw Error("lack minio client param [MINIO_ACCESSKEY]");
    }
    if (MINIO_SECRETKEY === undefined) {
      throw Error("lack minio client param [MINIO_SECRETKEY]");
    }
    this.MINIO_ENDPOINT = MINIO_ENDPOINT;
    this.MINIO_PORT = Number(MINIO_PORT);
    this.MINIO_USESSL = MINIO_USESSL === "true";
    this.MINIO_ACCESSKEY = MINIO_ACCESSKEY;
    this.MINIO_SECRETKEY = MINIO_SECRETKEY;
  }
}

export function createMinioInstance(optional: IMinioOptional) {
  const {
    MINIO_ENDPOINT,
    MINIO_PORT,
    MINIO_USESSL,
    MINIO_ACCESSKEY,
    MINIO_SECRETKEY,
  } = optional;
  return new Minio.Client({
    endPoint: MINIO_ENDPOINT,
    port: MINIO_PORT,
    useSSL: MINIO_USESSL,
    accessKey: MINIO_ACCESSKEY,
    secretKey: MINIO_SECRETKEY,
  });
}
