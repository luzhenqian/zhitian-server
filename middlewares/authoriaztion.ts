import { Context, Next } from "koa";
import { verify, Options as JWTOptions } from "../helpers/jwt";

interface Options {
  skipper?: string[];
  privateKey?: string;
  expiresIn?: number;
}

export default function (options?: Options) {
  const defaultOptions: JWTOptions = {
    skipper: [],
    privateKey: "lzq",
    expiresIn: 12 * 60 * 60,
  };
  const finalOptions = Object.assign(defaultOptions, options);
  return async function (ctx: Context, next: Next) {
    ctx.jwt = { options: finalOptions };

    if (finalOptions.skipper.includes(ctx.url)) {
      await next();
      return;
    }

    const auth_token = ctx.cookies.get("authorization");
    if (!auth_token) {
      ctx.status = 401;
      ctx.body = "unauthorized";
      return;
    }
    try {
      const user = await verify(auth_token, finalOptions);
      ctx.user = user;
      await next();
    } catch (err) {
      console.log(err);
      ctx.status = 401;
      ctx.body = err;
    }
  };
}
