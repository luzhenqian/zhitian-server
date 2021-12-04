import { findOne, insert } from "../repository/account";

export default async function () {
  const defaultAccount = {
    account_name: "zhitianadmin",
    password: "zhitianadmin",
  };
  if (await findOne(defaultAccount)) {
    return;
  }
  await insert(defaultAccount);
}
