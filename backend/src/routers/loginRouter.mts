import express from "express";
import { Request, Response } from "express";
import { login } from "../controllers/loginController.mjs";
import Jwt from "jsonwebtoken";

export const loginRouter = express.Router();

loginRouter.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "missing email or password in body" });
    } else {
      const loggedInUser = await login(email, password);

      if (!loggedInUser) {
        res.status(400).json({ message: "incorrect email or password" });
      } else {
        const token = Jwt.sign(loggedInUser, "my-secret");

        const currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + 1);

        res.cookie("login", token, { expires: currentDate });
        res.status(200).json(loggedInUser);
      }
    }
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});
