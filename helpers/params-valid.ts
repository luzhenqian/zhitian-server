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
  let data = ctx.request.body;
  if (in_ === In.Body) {
    data = ctx.request.body;
  }
  let errorMsg;
  for (let field in rules) {
    for (let rule of rules[field]) {
      if (rule === ValidType.Required) {
        const result = required(data, field);
        if (result !== null) {
          passed = false;
          errorMsg = result.message;
          break;
        }
      }
    }
  }
  if (!passed) {
    ctx.status = 400;
    ctx.body = errorMsg;
  }
  return passed;
}

function required(
  data: string | Record<string, unknown>,
  key: string
): Error | null {
  if (key in (data as any)) {
    return null;
  }
  return Error(`params ${key} is required`);
}
