console.log("barbero.js funcionando");

const USER = "admin";
const PASS = "1234";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnLogin");
  if (btn) {
    btn.addEventListener("click", login);
  }
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
let bloqueos = JSON.parse(localStorage.getItem("bloqueos")) || {};

function bloquear() {
  const fecha = document.getElementById("fechaBloqueo").value;
  const hora = document.getElementById("horaBloqueo").value;

  if (!fecha) return alert("Selecciona una fecha");

  if (!bloqueos[fecha]) {
    bloqueos[fecha] = [];
  }

  if (!hora) {
    // Bloquear día completo
    bloqueos[fecha] = ["todo"];
  } else {
    if (!bloqueos[fecha].includes("todo")) {
      bloqueos[fecha].push(hora);
    }
  }

  guardarBloqueos();
  mostrarBloqueos();
}

function guardarBloqueos() {
  localStorage.setItem("bloqueos", JSON.stringify(bloqueos));
}

function mostrarBloqueos() {
  const div = document.getElementById("listaBloqueos");
  div.innerHTML = "";

  for (const fecha in bloqueos) {
    const item = document.createElement("div");
    item.innerText =
      bloqueos[fecha][0] === "todo"
        ? `${fecha} — Día completo bloqueado`
        : `${fecha} — Horas: ${bloqueos[fecha].join(", ")}`;

    div.appendChild(item);
  }
}

// Mostrar al entrar al panel
document.addEventListener("DOMContentLoaded", mostrarBloqueos);
