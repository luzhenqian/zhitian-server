import { Context, Next } from "koa";
import { verify } from "../helpers/jwt";

interface Options {
  privateKey?: string;
  expiresIn?: number;
}

export default function (options?: Options) {
  const defaultOptions = {
    privateKey: "lzq",
    expiresIn: 12 * 60 * 60,
  };
  const finalOptions = Object.assign(defaultOptions, options);
  return async function (ctx: Context, next: Next) {
    ctx.jwt = { options: finalOptions };
    const auth_token = ctx.cookies.get("auth_token");
    if (!auth_token) {
      return (ctx.body = "unauthorized");
    }
    try {
      const user = await verify(auth_token, finalOptions);
      ctx.user = user;
      next();
    } catch (err) {
      console.log(err);
      ctx.status = 401;
      ctx.body = err;
    }
  };
}
