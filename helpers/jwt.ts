import jwt from "jsonwebtoken";
import { privateKey, Skipper } from "../middlewares/authoriaztion";

export interface Options {
  skipperIP: RegExp[];
  skipper: (Skipper | string)[];
  privateKey: string;
  expiresIn: number;
}

type Object = {
  [key in string]: any;
};

export function sign(data: Object, options?: Options): string {
  if (options)
    return jwt.sign(data, options.privateKey, { expiresIn: options.expiresIn });
  return jwt.sign(data, privateKey);
}

export async function verify(token: string, options?: Options):Promise<any> {
  if (options)
    return new Promise((resolve, reject) =>
      jwt.verify(token, options.privateKey, (err, decoded) => {
        if (err) return reject(err);
        return resolve(decoded);
      })
    );
  return new Promise((resolve, reject) =>
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    })
  );
}
