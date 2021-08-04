import { Context } from "koa";
import { sign } from "../helpers/jwt";

export function register(
  ctx: Context,
  access_name: string,
  password: string
): Error | any {
  return { token: sign({ access_name, password }, ctx.jwt.options) };
}

export default {
  register,
};
