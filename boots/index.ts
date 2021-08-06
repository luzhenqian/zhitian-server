import mongoose from "mongoose";

function initMongoConnection() {
  mongoose.connect(process.env.MONGODB_URI as string, {
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

export function init() {
  return Promise.all([initMongoConnection()]);
}
