import express, { Request, Response } from "express";
import { createTodo } from "../controllers/createTodoController.mjs";

export const createTodoRouter = express.Router();

export type todoRequest = {
  done: boolean;
  text: string;
  id: number;
};

createTodoRouter.post("/", async (req: Request, res: Response) => {
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
