export interface ICommonError {
  error: Error;
  code: number;
}

export class CommonError {
  error: Error;
  code: number;
  constructor(msg: string, code: number) {
    this.error = Error(msg);
    this.code = code;
  }
}

export function NewError(msg: string, code: number) {
  return new CommonError(msg, code);
}
