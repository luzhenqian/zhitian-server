import { isValidObjectId, Types } from "mongoose";
import { Config, ConfigOption, ConfigModel } from "./model/config";

export function insert(config: Config): Promise<Config> {
  const _config = new ConfigModel(config);
  return new Promise((resolve, reject) => {
    _config.save((err: any, doc: any) => {
      if (err) return reject(err);
      resolve(doc);
    });
  });
}

export function find(config: ConfigOption): Promise<Error | Config[] | any> {
  return new Promise((resolve, reject) => {
    ConfigModel.find(config, null, null, (err, docs) => {
      if (err !== null) return reject(err);
      resolve(docs);
    });
  });
}

export function findOne(config: ConfigOption): Promise<Error | Config | any> {
  return new Promise((resolve, reject) => {
    ConfigModel.findOne(config, null, null, (err, docs) => {
      console.log(docs);
      
      if (err !== null) return reject(err);
      resolve(docs);
    });
  });
}

export function remove(id: string) {
  return new Promise((resolve, reject) => {
    if (isValidObjectId(id)) {
      const _id = new Types.ObjectId(id);
      ConfigModel.deleteOne({ _id }, (err) => {
        if (err !== null) return reject(err);
        return resolve(null);
      });
      return;
    }
    reject(Error("id is invalid"));
  });
}

export function update(id: string, config: ConfigOption) {
  return new Promise((resolve, reject) => {
    if (isValidObjectId(id)) {
      const _id = new Types.ObjectId(id);
      ConfigModel.updateOne({ _id }, config, null, (err) => {
        if (err !== null) return reject(err);
        resolve(null);
      });
      return;
    }
    reject(Error("id is invalid"));
  });
}

export function updateWithViewID(view_id: string, config: ConfigOption) {
  return new Promise((resolve, reject) => {
    ConfigModel.updateOne({ view_id }, config, null, (err) => {
      if (err !== null) return reject(err);
      resolve(null);
    });
  });
}
