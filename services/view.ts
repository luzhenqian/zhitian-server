import { View, ViewUpdate } from "../repository/model/view";
import { find, insert, remove, update } from "../repository/view";
import { ICommonError, NewError } from "./common";

export async function viewInsert(view: View): Promise<ICommonError | any> {
  const result = await insert(view);
  if (result instanceof Error) return NewError(result.message, 500);
  return result;
}

export async function viewFind(view: ViewUpdate): Promise<ICommonError | any> {
  const result = await find(view);
  if (result instanceof Error) return NewError(result.message, 500);
  return result;
}

export async function viewUpdate(
  id: string,
  view: ViewUpdate
): Promise<ICommonError | any> {
  const result = await update(id, view);
  if (result instanceof Error) return NewError(result.message, 500);
  return result;
}

export async function viewRemove(id: string): Promise<ICommonError | any> {
  const result = await remove(id);
  if (result instanceof Error) return NewError(result.message, 500);
  return result;
}

export default {
  viewInsert,
  viewFind,
  viewUpdate,
  viewRemove,
};
