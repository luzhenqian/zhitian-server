import { isValidObjectId } from "mongoose";
import { View, ViewModel, ViewUpdate } from "./model/view";

export function insert(view: View): Promise<View> {
  const _view = new ViewModel(view);
  return new Promise((resolve, reject) => {
    _view.save((err: any, doc: any) => {
      if (err) return reject(err);
      resolve(doc);
    });
  });
}

export function find(view: ViewUpdate) {
  return new Promise((resolve, reject) => {
    ViewModel.find(view, null, null, (err, docs) => {
      if (err !== null) return reject(err);
      resolve(docs);
    });
  });
}

export function remove(id: string) {
  return new Promise((resolve, reject) => {
    ViewModel.remove({ _id: id }, (err) => {
      if (err !== null) return reject(err);
      resolve(null);
    });
  });
}

export function update(id: string, view: ViewUpdate) {
  return new Promise((resolve, reject) => {
    if (isValidObjectId(id)) {
      ViewModel.updateOne({ _id: id }, view, null, (err) => {
        if (err !== null) return reject(err);
        resolve(null);
      });
    }
    reject(Error(""));
  });
}
