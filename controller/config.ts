import { Context } from "koa";
import { router } from "./router";
import configService from "../services/config";
import valid, { In, ValidType } from "../helpers/params-valid";
import { Config } from "../repository/model/config";
import { CommonError } from "../services/common";
import { find } from "../repository/config";

console.log("config");

const configRules = {
  view_id: [ValidType.Required],
  config: [ValidType.Required],
};

const getConfigRules = {
  view_id: [ValidType.Required],
  config: [ValidType.Required],
};

router.get("/config/:view_id", async (ctx: Context) => {
  // if (!valid(ctx, { rules: getConfigRules, in: In.Path })) return;

  console.log(ctx.params.view_id);

  const result = await configService.getConfig(ctx.params.view_id);

  if (!(result instanceof CommonError)) {
    ctx.status = 200;
    ctx.body = result;
    return;
  }

  ctx.status = result.code;
  ctx.body = result.error.message;
});

router.put("/config", async (ctx: Context) => {
  if (!valid(ctx, { rules: configRules, in: In.Body })) return;

  const config = ctx.request.body as unknown as Config;

  const result = await configService.changeConfig(config);

  if (!(result instanceof CommonError)) {
    ctx.status = 201;
    return;
  }

  ctx.status = result.code;
  ctx.body = result.error.message;
});
