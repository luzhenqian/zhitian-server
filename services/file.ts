import multer from "@koa/multer";
import { ItemBucketMetadata } from "minio";
import { v4 as uuidv4 } from "uuid";
import { minioClient } from "../boots/index";
import { ICommonError, NewError } from "./common";

export type Options = {
  "Content-Type": string;
};

const bucketName = "zhitian";

export async function upload(
  file: multer.File,
  options: Options
): Promise<ICommonError | any> {
  try {
    return new Promise(async (resolve, reject) => {
      if (minioClient.bucketExists(bucketName)) {
        const metaData: ItemBucketMetadata = {
          "Content-Type": file.mimetype,
        };

        const objectName = uuidv4();

        minioClient.putObject(
          bucketName,
          objectName,
          file.buffer,
          file.size,
          metaData,
          (err, objInfo) => {
            if (err) return reject(err);
            resolve(objectName);
          }
        );
        return;
      }

      minioClient.makeBucket(bucketName, "zh-CN-JiNan-1", (err) => {
        if (err) return reject(err);
      });
    });
  } catch (err) {
    return NewError(err.message, 500);
  }
}

export async function getFile(objectName: string): Promise<ICommonError | any> {
  try {
    return new Promise(async (resolve, reject) => {
      if (minioClient.bucketExists(bucketName)) {
        minioClient.getObject(bucketName, objectName, async (err, stream) => {
          if (err) return reject(err);
          const stat = await minioClient.statObject(bucketName, objectName);
          resolve({ stream, contentType: stat.metaData["content-type"] });
        });
        return;
      }

      reject(Error("bucket is not exists"));
    });
  } catch (err) {
    return NewError(err.message, 500);
  }
}

export default { upload, getFile };
