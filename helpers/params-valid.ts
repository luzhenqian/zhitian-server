import { Context, Next } from "koa";

export enum ValidType {
  Required = "Required",
  Email = "Email",
  Url = "Url",
  Max = "Max",
  Min = "Min",
  Excludesall = "Excludesall",
  Len = "Len",
  Eq = "Eq",
  Ne = "Ne",
  Gt = "Gt",
  Gte = "Gte",
  Lt = "Lt",
  Lte = "Lte",
}

export enum In {
  Header = "Header",
  Path = "Path",
  Query = "Query",
  Body = "Body",
}

type Rules = { [key in string]: ValidType[] };

interface Options {
  rules: Rules;
  in: In;
}

export default function (ctx: Context, options: Options): boolean {
  const { rules } = options;
  const in_ = options.in;
  let passed = true;
  const data = ctx.request.body;
  for (let field in rules) {
    for (let rule in rules[field]) {
      if (rule === ValidType.Required) {
        required(data, field);
      }
    }
  }
  if (!passed) {
    ctx.status = 400;
    ctx.body = "bad request";
  }
  return passed;
}

function required(data: string | Record<string, unknown>, key: string) {
  console.log("data:", data);
}
