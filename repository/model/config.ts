import mongoose from "mongoose";

const { Schema } = mongoose;

interface Config {
  view_id: string;
  config: any;
}

interface ConfigOption {
  view_id?: string;
  config?: any;
}

const configSchema = new Schema({
  view_id: String,
  config: Object,
});

const ConfigModel = mongoose.model("Config", configSchema);

export { configSchema, ConfigModel, Config, ConfigOption };
