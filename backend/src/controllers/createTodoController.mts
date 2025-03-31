import { Request, Response } from "express";
import User from "../models/userSchema.mjs";

export const createTodo = async (text: string) => {
  if (!text) {
    throw Error("Missing text in task");
  } else {
    const newTodo = {
      done: false,
      text,
      id: Date.now(),
    };

    const foundUser = await User.findOne({ email: "" });

    // 2. användare.todods push new todo
    // 3. spara användare
    return newTodo;
  }
};
