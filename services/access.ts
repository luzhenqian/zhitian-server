import { Options, sign } from "../helpers/jwt";

export function register(
  access_name: string,
  password: string,
  jwtOpts: Options
): Error | any {
  return { token: sign({ access_name, password }, jwtOpts) };
}

export default {
  register,
};
