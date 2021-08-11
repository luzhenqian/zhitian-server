import { Context } from "koa";
import { router } from "./router";
import fileService from "../services/file";
import valid, { In, ValidType } from "../helpers/params-valid";
import multer from "@koa/multer";

console.log("file");

const upload = multer();

const uploadRules = {
  file: [ValidType.Required],
};

router.post("/upload", upload.single("file"), async (ctx: Context) => {
  // if (!valid(ctx, { rules: uploadRules, in: In.Body })) return;
  const result = await fileService.upload(ctx.request.file, {
    "Content-Type": ctx.headers["content-type"] || "application/octet-stream",
  });

  if (!(result instanceof Error)) {
    ctx.status = 201;
    ctx.body = result;
    return;
  }

  ctx.status = 500;
});

router.get("/download/:object_name", async (ctx: Context) => {
  let { object_name } = ctx.params;
  const result = await fileService.getFile(object_name);

  if (!(result instanceof Error)) {
    ctx.status = 200;
    ctx.body = result;
    return;
  }

  ctx.status = 500;
});

router.get("/image/:object_name", async (ctx: Context) => {
  let { object_name } = ctx.params;
  const result = await fileService.getFile(object_name);

  if (!(result instanceof Error)) {
    ctx.set("Content-Type", result.contentType);
    ctx.status = 200;
    ctx.body = result.stream;
    return;
  }

  ctx.status = 500;
});
