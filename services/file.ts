import multer from "@koa/multer";
import { ItemBucketMetadata } from "minio";
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
          "Content-Type": options["Content-Type"],
          expires: 1000,
        };
        minioClient.putObject(
          bucketName,
          file.originalname, // TODO: replace to UUID
          file.buffer,
          file.size,
          metaData,
          (err, objInfo) => {
            if (err) return reject(err);
            resolve(objInfo);
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
        minioClient.getObject(bucketName, objectName, (err, stream) => {
          if (err) return reject(err);
          resolve(stream);
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
