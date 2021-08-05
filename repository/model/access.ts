import mongoose from "mongoose";

const { Schema } = mongoose;

interface Access {
  access_name: string;
  password: string;
}

const accessSchema = new Schema({
  access_name: String,
  password: String,
});

const accessModel = mongoose.model("Access", accessSchema);

export { accessSchema, accessModel, Access };
