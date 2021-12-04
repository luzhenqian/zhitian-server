import mongoose from "mongoose";

interface IMongoDBOptional {
  MONGODB_URI: string;
}

export class MongoDBOptional implements IMongoDBOptional {
  MONGODB_URI: string;
  constructor(MONGODB_URI: string | undefined) {
    if (MONGODB_URI === undefined) {
      throw Error("lack minio client param [MONGODB_URI]");
    }
    this.MONGODB_URI = String(MONGODB_URI);
  }
}

export function createMongoDBConnect(optional: IMongoDBOptional) {
  const { MONGODB_URI } = optional;

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  return new Promise((resolve, reject) => {
    db.on("error", (err) => reject(err));
    db.once("open", () => {
      resolve(null);
    });
  });
}
