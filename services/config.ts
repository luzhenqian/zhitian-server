import { Config } from "../repository/model/config";
import { find, insert, update, updateWithViewID } from "../repository/config";
import { ICommonError, NewError } from "./common";

export async function changeConfig(
  config: Config
): Promise<ICommonError | any> {
  return new Promise(async (resolve, reject) => {
    async function insertConfig() {
      const insertResult = await insert(config);
      const result = await update((insertResult as any)._id, config);
      return resolve(result);
    }

    try {
      try {
        let _config: Error | Config[];
        try {
          _config = await find({ view_id: config.view_id });
          console.log(1);
        } catch (err) {
          console.log(2);
          return insertConfig();
        }
        if ((_config as Array<any>).length === 0) {
          return insertConfig();
        }
        console.log(3, _config);
        const result = await updateWithViewID(
          (_config as Config[])[0].view_id,
          config
        );
        return resolve(result);
      } catch (err) {
        return reject(NewError(err.message, 500));
      }
    } catch (err) {
      return reject(NewError(err.message, 500));
    }
  });
}

export default { changeConfig };
