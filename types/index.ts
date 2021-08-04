import { Context } from "koa";

declare module "koa" {
  interface Context {
    jwt: { options: any };
  }
}
