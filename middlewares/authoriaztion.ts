import { Context, Next } from "koa";
import { verify, Options as JWTOptions } from "../helpers/jwt";

interface Options {
  skipperIP?: RegExp[];
  skipper?: (Skipper | string)[];
  privateKey?: string;
  expiresIn?: number;
}

export interface Skipper {
  url: string | RegExp;
  method: ("get" | "post" | "put" | "delete" | "patch")[];
}

export default function (options?: Options) {
  const defaultOptions: JWTOptions = {
    skipperIP: [],
    skipper: [],
    privateKey: "lzq",
    expiresIn: 12 * 60 * 60,
  };
  const finalOptions = Object.assign(defaultOptions, options);
  return async function (ctx: Context, next: Next) {
    ctx.jwt = { options: finalOptions };

    let skip = false;

    skip =
      finalOptions.skipper.find((s) => {
        if (typeof s === "string") {
          return s === ctx.url;
        }
        return s.method.find((m) => m === ctx.method.toLowerCase()) !== null &&
          typeof s.url === "string"
          ? s.url === ctx.url
          : (s.url as RegExp).test(ctx.url);
      }) !== undefined;

    if (!skip) {
      for (let i = 0; i < finalOptions.skipperIP.length; i++) {
        const reg = finalOptions.skipperIP[i];
        if (reg.test(ctx.origin) || reg.test(ctx.ip)) {
          skip = true;
          break;
        }
      }
    }

    if (skip) {
      return await next();
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
