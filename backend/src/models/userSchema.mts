import mongoose, { model, Schema } from "mongoose";
import { TodoSchema } from "./todoschema.mjs";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [
    {
      text: { type: String, required: true },
      done: { type: Boolean, default: false },
      id: { type: Number, required: true },
    },
  ],
});

export default mongoose.model("User", userSchema);
