import { Access, accessModel } from "./model/access";

export function insert(...accesses: any[]) {
  return accessModel.insertMany(accesses);
}

export function findOne(access: Access) {
  return new Promise((resolve, reject) => {
    accessModel.findOne(access, null, null, (err, doc) => {
      if (err !== null) {
        return reject(err);
      }
      resolve(doc);
    });
  });
}
