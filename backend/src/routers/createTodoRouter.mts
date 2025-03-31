import express, { Request, Response } from "express";
import { createTodo } from "../controllers/createTodoController.mjs";
import User from "../models/userSchema.mjs";

export const todosRouter = express.Router();

export type todoRequest = {
  done: boolean;
  text: string;
  id: number;
};

todosRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { text }: todoRequest = req.body;

    if (!text) {
      res.status(400).send("Missing text in task");
    } else {
      const newTodo = await createTodo(text);
      res.status(200).json(newTodo);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

todosRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email as string;
    if (!userEmail) {
      res.status(400).json({ message: "missing email in query" });
    }

    const foundUser = await User.findOne({ email: userEmail });
    if (!foundUser) {
      res.status(400).json({ message: "user not found" });
    } else {
      res.status(200).json(foundUser.todos);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
