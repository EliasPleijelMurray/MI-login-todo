import { model, Schema } from "mongoose";
import { TodoSchema } from "./todoschema.mjs";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  todos: { type: [TodoSchema], required: true },
});

const User = model("user", UserSchema);
export default User;
