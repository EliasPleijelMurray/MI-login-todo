import { Request, Response } from "express";
import User from "../models/userSchema.mjs";
import Jwt from "jsonwebtoken";

interface JwtPayloadWithEmail extends Jwt.JwtPayload {
  email: string;
}

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Missing text in task" });
    }

    const token = req.cookies["login"];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = Jwt.verify(token, "my-secret") as JwtPayloadWithEmail; // Typa decoded
    const userEmail = decoded.email;

    const foundUser = await User.findOne({ email: userEmail });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTodo = {
      done: false,
      text,
      id: Date.now(),
    };

    foundUser.todos.push(newTodo);
    await foundUser.save();

    return res.status(200).json(newTodo);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
