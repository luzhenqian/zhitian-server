import { Options, sign } from "../helpers/jwt";
import { findOne, insert } from "../repository/access";
import { CommonError, NewError } from "./common";

export async function register(
  account_name: string,
  password: string,
  jwtOpts: Options
): Promise<CommonError | any> {
  const result = await insert({ account_name: account_name, password });
  if (result instanceof Error) return NewError(result.message, 500);
  return { token: sign({ result, password }, jwtOpts) };
}

export async function login(
  account_name: string,
  password: string,
  jwtOpts: Options
): Promise<CommonError | any> {
  const user = await findOne({ account_name: account_name, password });

  if (user) {
    return { token: sign({ access_name: account_name, password }, jwtOpts) };
  }
  return NewError("resource does not exist", 404);
}

export default {
  register,
  login,
};
