import { Request, Response } from "express";
import User from "../models/userSchema.mjs";
import { UserDto } from "../models/userDto.mjs";
import { todoDto } from "../models/todoDto.mjs";

export const createTodo = async (text: string, req: Request, res: Response) => {
  try {
    const loggedInUser: UserDto | undefined = req.cookies.login;
    if (!loggedInUser) {
      return res.status(401).json({ error: "no logged in user" });
    }

    const loggedInEmail = loggedInUser.email;

    if (!loggedInEmail) {
      return res.status(400).json({ error: "No email exist for the user" });
    }

    const newTodo: todoDto = {
      done: false,
      text: text,
      id: Date.now(),
    };

    const foundUser = await User.findOne({ email: loggedInEmail });
    if (!foundUser) {
      return res.status(404).json({ error: "could not find user" });
    }

    foundUser.todos.push(newTodo);
    await foundUser.save();

    return res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ error: "error" });
  }
};
