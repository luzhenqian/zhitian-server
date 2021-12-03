import { View, ViewUpdate } from "../repository/model/view";
import { find, findOne, insert, remove, update } from "../repository/view";
import { ICommonError, NewError } from "./common";

export async function viewInsert(view: View): Promise<ICommonError | any> {
  try {
    const result = await insert(view);
    return result;
  } catch (err: any) {
    return NewError(err.message, 500);
  }
}

export async function viewFind(view?: ViewUpdate): Promise<ICommonError | any> {
  try {
    const result = await find(view);
    return { list: result };
  } catch (err: any) {
    return NewError(err.message, 500);
  }
}

export async function viewFindOne(
  view?: ViewUpdate
): Promise<ICommonError | any> {
  try {
    const result = await findOne(view);
    return result;
  } catch (err: any) {
    return NewError(err.message, 500);
  }
}

export async function viewUpdate(
  id: string,
  view: ViewUpdate
): Promise<ICommonError | any> {
  try {
    const result = await update(id, view);
    return result;
  } catch (err: any) {
    return NewError(err.message, 500);
  }
}

export async function viewRemove(id: string): Promise<ICommonError | any> {
  try {
    const result = await remove(id);
    return result;
  } catch (err: any) {
    return NewError(err.message, 500);
  }
}

export default {
  viewInsert,
  viewFind,
  viewFindOne,
  viewUpdate,
  viewRemove,
};
