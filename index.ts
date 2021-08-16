import Koa from "koa";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";

import authoriaztion from "./middlewares/authoriaztion";
import router from "./controller/router";
import { init } from "./boots";

import "./controller/index";

dotenv.config();

init().then(() => {
  const app = new Koa();

  app
    .use(
      authoriaztion({
        skipper: [
          "/register",
          "/login",
          { url: /\/config/, method: ["get"] },
          { url: /\/views\//, method: ["get"] },
        ],
      })
    )
    .use(bodyParser())
    .use(router.routes())
    .listen(process.env.SERVER_PORT);
});
