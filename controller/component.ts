import { Context } from "koa";
import { router } from "./router";
import componentService from "../services/component";
import valid, { In, ValidType } from "../helpers/params-valid";
import { Component, ComponentUpdate } from "../repository/model/component";
import { CommonError } from "../services/common";

console.log("component");

router.post("/components", async (ctx: Context) => {
  // if (!valid(ctx, { rules: viewRules, in: In.Body })) return;

  const c = ctx.request.body as unknown as Component;
  const result = await componentService.componentInsert(c);

  if (!(result instanceof CommonError)) {
    ctx.status = 201;
    return;
  }

  ctx.status = result.code;
  ctx.body = result.error.message;
});

router.get("/components", async (ctx: Context) => {
  let { keywords } = ctx.request.query;
  if (Array.isArray(keywords)) keywords = keywords[0];
  const queryView: ComponentUpdate = {};
  if (keywords) {
    queryView.name = keywords;
    // TODO: fill other field
  }
  const result = await componentService.componentFind(queryView);

  if (!(result.error instanceof CommonError)) {
    ctx.body = result;
    return;
  }

  ctx.status = result.code;
  ctx.body = result.error.message;
});

router.get("/components/:id", async (ctx: Context) => {
  let id = ctx.params.id;
  const queryView: ComponentUpdate = { _id: id };
  const result = await componentService.componentFindOne(queryView);

  if (!(result.error instanceof CommonError)) {
    ctx.body = result;
    return;
  }

  ctx.status = result.code;
  ctx.body = result.error.message;
});
