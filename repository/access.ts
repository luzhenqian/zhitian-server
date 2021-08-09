import { Account, AccountModel } from "./model/access";

export function insert(access: Account): Promise<Account> {
  const _access = new AccountModel(access);
  return new Promise((resolve, reject) => {
    _access.save((err: any, doc: any) => {
      if (err) return reject(err);
      resolve(doc);
    });
  });
}

export function findOne(access: Account) {
  return new Promise((resolve, reject) => {
    AccountModel.findOne(access, null, null, (err, doc) => {
      if (err !== null) {
        return reject(err);
      }
      resolve(doc);
    });
  });
}
