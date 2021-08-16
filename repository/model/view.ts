import mongoose from "mongoose";

const { Schema } = mongoose;

interface View {
  name: string;
  width: number;
  height: number;
  template_id: string;
  desc: string;
  color: string;
  img: string;
}

interface ViewUpdate {
  _id?: string;
  name?: string;
  width?: number;
  height?: number;
  template_id?: string;
  desc?: string;
  color?: string;
  img?: string;
}

const viewSchema = new Schema({
  name: String,
  width: Number,
  height: Number,
  template_id: String,
  desc: String,
  color: String,
  img: String,
});

const ViewModel = mongoose.model("View", viewSchema);

export { viewSchema, ViewModel, View, ViewUpdate };
