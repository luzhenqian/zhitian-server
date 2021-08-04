import { router } from "./index";
import { Context } from "koa";
import accessService from "../services/access";
import valid, { In, ValidType } from "../helpers/params-valid";

const registerRules = {
  access_name: [ValidType.Required],
  password: [ValidType.Required],
};

router.post("/register", (ctx: Context) => {
  if (!valid(ctx, { rules: registerRules, in_: In.Body })) return;

  const { access_name, password } = ctx.request.body as Record<string, any>;
  const result = accessService.register(ctx, access_name, password);
  if (!(result instanceof Error)) {
    ctx.status = 201;
    ctx.body = result;
    return;
  }
  ctx.status = 500;
});

router.post("/login", async (ctx: Context) => {});

export = router;
