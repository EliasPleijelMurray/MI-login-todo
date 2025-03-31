import axios from "axios";
import "./style.css";
import { Todos } from "./models/todos";

const registerButton = document.getElementById("goToRegister");
registerButton?.addEventListener("click", () => {
  location.href = "/register.html";
});

const loginButton = document.getElementById("goToLogin");
loginButton?.addEventListener("click", () => {
  location.href = "/login.html";
});

document.getElementById("todo-button")?.addEventListener("click", async () => {
  const response: Todos = await axios.get("htttp/localhost:3000/getTodos");
  const todos = response;
});
