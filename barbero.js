console.log("barbero.js funcionando");

const USER = "admin";
const PASS = "1234";

let bloqueos = JSON.parse(localStorage.getItem("bloqueos")) || {};

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnLogin");
  if (btn) btn.addEventListener("click", login);
});

function login() {
  const u = document.getElementById("usuario").value;
  const p = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (u === USER && p === PASS) {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";

    mostrarBloqueos();
    mostrarCitas(); // 👈 IMPORTANTE
  } else {
    error.innerText = "Usuario o contraseña incorrectos";
  }
}

function logout() {
  location.reload();
}

/* ================= BLOQUEOS ================= */

function bloquear() {
  const fecha = document.getElementById("fechaBloqueo").value;
  const hora = document.getElementById("horaBloqueo").value;

  if (!fecha) return alert("Selecciona una fecha");

  if (!bloqueos[fecha]) bloqueos[fecha] = [];

  if (!hora) {
    bloqueos[fecha] = ["todo"];
  } else {
    if (!bloqueos[fecha].includes("todo") && !bloqueos[fecha].includes(hora)) {
      bloqueos[fecha].push(hora);
    }
  }

  localStorage.setItem("bloqueos", JSON.stringify(bloqueos));
  mostrarBloqueos();
}

function mostrarBloqueos() {
  const div = document.getElementById("listaBloqueos");
  if (!div) return;

  div.innerHTML = "";

  for (const fecha in bloqueos) {
    const d = document.createElement("div");
    d.textContent =
      bloqueos[fecha][0] === "todo"
        ? `${fecha} — Día completo bloqueado`
        : `${fecha} — Horas: ${bloqueos[fecha].join(", ")}`;
    div.appendChild(d);
  }
}

/* ================= CITAS ================= */

function mostrarCitas() {
  const cont = document.getElementById("listaCitas");
  if (!cont) return;

  cont.innerHTML = "";

  const citas = JSON.parse(localStorage.getItem("citas") || "[]");

  if (citas.length === 0) {
    cont.innerHTML = "<p>No hay citas todavía</p>";
    return;
  }

  citas.forEach(c => {
    const div = document.createElement("div");
    div.textContent = `${c.fecha} — ${c.hora} — ${c.servicio}`;
    cont.appendChild(div);
  });
}
