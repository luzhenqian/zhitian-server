import { Context } from "koa";
import { router } from "./index";
import accountService from "../services/account";
import valid, { In, ValidType } from "../helpers/params-valid";

const registerRules = {
  access_name: [ValidType.Required],
  password: [ValidType.Required],
};

router.post("/register", async (ctx: Context) => {
  if (!valid(ctx, { rules: registerRules, in: In.Body })) return;

  const { access_name, password } = ctx.request.body as Record<string, any>;
  const result = await accountService.register(
    access_name,
    password,
    ctx.jwt.options
  );

  if (!(result instanceof Error)) {
    ctx.status = 201;
    ctx.cookies.set("authorization", result.token);
    return;
  }

  ctx.status = 500;
});

router.post("/login", async (ctx: Context) => {
  if (!valid(ctx, { rules: registerRules, in: In.Body })) return;

  const { access_name, password } = ctx.request.body as Record<string, any>;
  const result = await accountService.login(
    access_name,
    password,
    ctx.jwt.options
  );

  if (!(result.error instanceof Error)) {
    ctx.cookies.set("authorization", result.token);
    ctx.body = null;
    return;
  }

  ctx.status = result.code;
  ctx.body = result.error.message;
});
