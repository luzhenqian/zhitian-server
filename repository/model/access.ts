import mongoose from "mongoose";

const { Schema } = mongoose;

interface Account {
  account_name: string;
  password: string;
}

const accountSchema = new Schema({
  account_name: String,
  password: String,
});

const AccountModel = mongoose.model("Account", accountSchema);

export { accountSchema, AccountModel, Account };
