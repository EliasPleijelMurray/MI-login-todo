import { Schema, model } from "mongoose";

export const TodoSchema = new Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  done: { type: Boolean, required: true },
});
