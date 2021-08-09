import Koa from "koa";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";

import authoriaztion from "./middlewares/authoriaztion";
import router from "./controller";
import { init } from "./boots";

import "./controller/account";
import "./controller/view";

dotenv.config();

init().then(() => {
  const app = new Koa();

  app
    .use(authoriaztion({ skipper: ["/register", "/login"] }))
    .use(bodyParser())
    .use(router.routes())
    .listen(3000);
});
