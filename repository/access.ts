import { Access, accessModel } from "./model/access";

export function insert(...accesses: any[]) {
  return accessModel.insertMany(accesses);
}

export function findOne(access: Access) {
  return accessModel.findOne(access);
}
