import { Options, sign } from "../helpers/jwt";
import { findOne, insert } from "../repository/access";

export function register(
  access_name: string,
  password: string,
  jwtOpts: Options
): Error | any {
  insert({ access_name, password });
  return { token: sign({ access_name, password }, jwtOpts) };
}

export function login(
  access_name: string,
  password: string,
  jwtOpts: Options
): Error | any {
  const user = findOne({ access_name, password });
  if (user) {
    return { token: sign({ access_name, password }, jwtOpts) };
  }
  return Error("资源不存在");
}

export default {
  register,
  login,
};
