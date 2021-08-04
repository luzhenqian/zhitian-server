import Koa from "koa";
import bodyParser from "koa-bodyparser";

import router from "./controller/access";
import authoriaztion from "./middlewares/authoriaztion";

const app = new Koa();

app.use(authoriaztion).use(bodyParser()).use(router.routes()).listen(3000);
