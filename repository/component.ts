import { isValidObjectId, Types } from "mongoose";
import {
  Component,
  ComponentModel,
  ComponentUpdate,
  componentSchema,
} from "./model/component";

export function insert(component: Component): Promise<Component> {
  const _component = new ComponentModel(component);
  return new Promise((resolve, reject) => {
    _component.save((err: any, doc: any) => {
      if (err) return reject(err);
      resolve(doc);
    });
  });
}

export function find(component: ComponentUpdate = {}) {
  return new Promise((resolve, reject) => {
    ComponentModel.find(component, null, null, (err, docs) => {
      if (err !== null) return reject(err);
      resolve(docs);
    });
  });
}

export function findOne(component: ComponentUpdate = {}) {
  return new Promise((resolve, reject) => {
    ComponentModel.findOne(component, null, null, (err, docs) => {
      if (err !== null) return reject(err);
      resolve(docs);
    });
  });
}

export function remove(id: string) {
  return new Promise((resolve, reject) => {
    if (isValidObjectId(id)) {
      const _id = new Types.ObjectId(id);
      ComponentModel.deleteOne({ _id }, (err) => {
        if (err !== null) return reject(err);
        return resolve(null);
      });
      return;
    }
    reject(Error("id is invalid"));
  });
}

export function update(id: string, component: ComponentUpdate) {
  return new Promise((resolve, reject) => {
    if (isValidObjectId(id)) {
      const _id = new Types.ObjectId(id);
      ComponentModel.updateOne({ _id }, component, null, (err) => {
        if (err !== null) return reject(err);
        resolve(null);
      });
      return;
    }
    reject(Error("id is invalid"));
  });
}
