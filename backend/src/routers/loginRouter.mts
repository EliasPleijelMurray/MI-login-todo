import express from "express";
import { Request, Response } from "express";
import { login } from "../controllers/loginController.mjs";

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
        res.status(500).json(error.message)
    }
})