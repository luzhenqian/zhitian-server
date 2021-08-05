import { initMongoConnection } from "../repository";

export function init() {
  return Promise.all([initMongoConnection()]);
}
