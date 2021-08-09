export interface CommonError {
  error: Error;
  code: number;
}

export function NewError(msg: string, code: number) {
  return { error: Error(msg), code };
}
