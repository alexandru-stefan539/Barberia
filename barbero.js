console.log("barbero.js cargado correctamente");

const USER = "admin";
const PASS = "1234";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnLogin");
  if (btn) {
    btn.addEventListener("click", login);
  }
});

function login() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (user === USER && pass === PASS) {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
  } else {
    error.innerText = "Usuario o contraseña incorrectos";
  }
}


