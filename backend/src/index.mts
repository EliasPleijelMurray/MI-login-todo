import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createTodoRouter } from "./routers/createTodoRouter.mjs";
import { loginRouter } from "./routers/loginRouter.mjs";
import { registerRouter } from "./routers/registerRouter.mjs";
import { auth } from "./middlewares/auth.mjs";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.dbURL;

if (!dbUrl) {
  throw new Error(
    "Database URL (dbURL) is not defined in the environment variables."
  );
}

app.use(json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "api is working" });
});

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/createTodo", createTodoRouter);
app.use(auth);

app.listen(port, async (error) => {
  await mongoose.connect(dbUrl);
  console.log("Api is up and running, connected to the database");

  if (error) {
    console.error("ERROR", error);
  }
});
