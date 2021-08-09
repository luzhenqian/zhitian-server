import { Context } from "koa";
import { router } from "./router";
import viewService from "../services/view";
import valid, { In, ValidType } from "../helpers/params-valid";
import { View, ViewUpdate } from "../repository/model/view";
import { CommonError } from "../services/common";

console.log("view");

const viewRules = {
  name: [ValidType.Required],
  width: [ValidType.Required],
  height: [ValidType.Required],
  template_id: [ValidType.Required],
  desc: [ValidType.Required],
  color: [ValidType.Required],
  img: [ValidType.Required],
};

router.post("/views", async (ctx: Context) => {
  if (!valid(ctx, { rules: viewRules, in: In.Body })) return;

  const view = ctx.request.body as unknown as View;
  const result = await viewService.viewInsert(view);

  if (!(result instanceof CommonError)) {
    ctx.status = 201;
    return;
  }

  ctx.status = result.code;
  ctx.body = result.error.message;
});

router.get("/views", async (ctx: Context) => {
  let { keywords } = ctx.request.query;
  if (Array.isArray(keywords)) keywords = keywords[0];
  const queryView: ViewUpdate = {
    name: keywords,
    // TODO: fill other field
  };
  const result = await viewService.viewFind(queryView);

  if (!(result.error instanceof CommonError)) {
    ctx.body = result;
    return;
  }

  ctx.status = result.code;
  ctx.body = result.error.message;
});

router.delete("/views/:id", async (ctx: Context) => {
  let { id } = ctx.params;
  const result = await viewService.viewRemove(id);
  if (!(result instanceof CommonError)) {
    ctx.body = result;
    return;
  }

  ctx.status = result.code;
  ctx.body = result.error.message;
});

router.patch("/views/:id", async (ctx: Context) => {
  let { id } = ctx.params;
  const view = ctx.request.body as unknown as ViewUpdate;
  const result = await viewService.viewUpdate(id, view);

  if (!(result instanceof CommonError)) {
    ctx.body = result;
    return;
  }

  ctx.status = result.code;
  ctx.body = result.error.message;
});
