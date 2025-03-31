import express from "express";
import { Request, Response } from "express";
<<<<<<< HEAD:backend/src/loginRouter.mts
import { login } from "./loginController.mjs";
=======
import { login } from "../controllers/loginController.mjs";

>>>>>>> cdd69ff532a4334597d6be250f2bf8d22a94e39c:backend/src/routers/loginRouter.mts
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
        res.status(400).json(loggedInUser);
      }
    }
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});
