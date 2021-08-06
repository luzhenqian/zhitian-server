import { Options, sign } from "../helpers/jwt";
import { findOne, insert } from "../repository/access";
import { CommonError } from "./common";

export function register(
  access_name: string,
  password: string,
  jwtOpts: Options
): CommonError | any {
  insert({ access_name, password });
  return { token: sign({ access_name, password }, jwtOpts) };
}

export async function login(
  access_name: string,
  password: string,
  jwtOpts: Options
): Promise<CommonError | any> {
  const user = await findOne({ access_name, password });

  if (user) {
    return { token: sign({ access_name, password }, jwtOpts) };
  }
  return { error: Error("资源不存在"), code: 404 };
}

export default {
  register,
  login,
};
