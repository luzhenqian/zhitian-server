import { Component, ComponentUpdate } from "../repository/model/component";
import { find, findOne, insert, remove, update } from "../repository/component";
import { ICommonError, NewError } from "./common";

export async function componentInsert(
  component: Component
): Promise<ICommonError | any> {
  try {
    const result = await insert(component);
    return result;
  } catch (err) {
    return NewError(err.message, 500);
  }
}

export async function componentFind(
  component?: ComponentUpdate
): Promise<ICommonError | any> {
  try {
    const result = await find(component);
    return { list: result };
  } catch (err) {
    return NewError(err.message, 500);
  }
}

export async function componentFindOne(
  c?: ComponentUpdate
): Promise<ICommonError | any> {
  try {
    const result = await findOne(c);
    return result;
  } catch (err) {
    return NewError(err.message, 500);
  }
}

export async function componentUpdate(
  id: string,
  c: ComponentUpdate
): Promise<ICommonError | any> {
  try {
    const result = await update(id, c);
    return result;
  } catch (err) {
    return NewError(err.message, 500);
  }
}

export async function componentRemove(id: string): Promise<ICommonError | any> {
  try {
    const result = await remove(id);
    return result;
  } catch (err) {
    return NewError(err.message, 500);
  }
}

export default {
  componentInsert,
  componentFind,
  componentFindOne,
  componentUpdate,
  componentRemove,
};
