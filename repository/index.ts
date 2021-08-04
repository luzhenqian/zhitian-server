import mongoose from "mongoose";

export function initMongoConnection() {
  mongoose.connect(process.env.MONGODBURI as string, {
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
