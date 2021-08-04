import jwt from "jsonwebtoken";

export interface Options {
  privateKey: string;
  expiresIn: number;
}

type Object = {
  [key in string]: any;
};

export function sign(data: Object, options: Options): string {
  return jwt.sign(data, options.privateKey, { expiresIn: options.expiresIn });
}

export async function verify(token: string, options: Options) {
  return new Promise((resolve, reject) =>
    jwt.verify(token, options.privateKey, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    })
  );
}
