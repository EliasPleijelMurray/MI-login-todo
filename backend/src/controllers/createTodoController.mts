import { Request, Response } from "express";

export const createTodo = (text: string) => {
  if (!text) {
    throw Error("Missing text in task");
  } else {
    const newTodo = {
      done: false,
      text,
      id: Date.now(),
    };
    return newTodo;
  }
};
