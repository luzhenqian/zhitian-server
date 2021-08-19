import mongoose from "mongoose";

const { Schema } = mongoose;

interface ComponentLib {
  name: string;
  component: Component;
  author: string;
}

interface Component {
  classify: string;
  name: string;
  id: string;
  version: string;
  config: any;
  defaultConfig: any;
  snapshot: string;
}

interface ComponentUpdate {
  _id?: string;
  classify?: string;
  name?: string;
  id?: string;
  version?: string;
  config?: any;
  defaultConfig?: any;
  snapshot?: string;
}

const componentSchema = new Schema({
  classify: String,
  name: String,
  id: String,
  version: String,
  config: Object,
  defaultConfig: Object,
  snapshot: String,
});

const ComponentModel = mongoose.model("Component", componentSchema);

export {
  componentSchema,
  ComponentModel,
  Component,
  ComponentLib,
  ComponentUpdate,
};
