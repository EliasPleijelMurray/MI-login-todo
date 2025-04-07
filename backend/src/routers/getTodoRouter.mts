import express from "express";

export const getTodoRouter = express.Router();

getTodoRouter.get("/", async () => {
  try {
    const foundTodo = await findTodo();
  } catch (error) {}
});
