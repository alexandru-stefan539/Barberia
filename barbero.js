console.log("barbero.js funcionando");

const USER = "admin";
const PASS = "1234";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnLogin").addEventListener("click", login);
});

function login() {
  const u = document.getElementById("usuario").value;
  const p = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (u === USER && p === PASS) {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
  } else {
    error.innerText = "Usuario o contraseña incorrectos";
  }
}

function logout() {
  location.reload();
}



