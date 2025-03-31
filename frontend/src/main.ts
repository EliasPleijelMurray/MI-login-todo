import "./style.css";

const registerButton = document.getElementById("goToRegister");
registerButton?.addEventListener("click", () => {
  location.href = "/register.html";
});
