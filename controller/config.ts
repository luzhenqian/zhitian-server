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
