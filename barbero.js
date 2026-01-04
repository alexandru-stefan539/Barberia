console.log("barbero.js funcionando");

const USER = "admin";
const PASS = "1234";

let bloqueos = JSON.parse(localStorage.getItem("bloqueos")) || {};

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

    mostrarBloqueos(); // SOLO después del login
  } else {
    error.innerText = "Usuario o contraseña incorrectos";
  }
}

function logout() {
  location.reload();
}

/* =========================
   BLOQUEO DE DÍAS Y HORAS
   ========================= */

function bloquear() {
  const fecha = document.getElementById("fechaBloqueo").value;
  const hora = document.getElementById("horaBloqueo").value;

  if (!fecha) {
    alert("Selecciona una fecha");
    return;
  }

  if (!bloqueos[fecha]) {
    bloqueos[fecha] = [];
  }

  if (!hora) {
    // Bloquear día completo
    bloqueos[fecha] = ["todo"];
  } else {
    if (!bloqueos[fecha].includes("todo")) {
      if (!bloqueos[fecha].includes(hora)) {
        bloqueos[fecha].push(hora);
      }
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

    if (bloqueos[fecha][0] === "todo") {
      item.innerText = `${fecha} — Día completo bloqueado`;
    } else {
      item.innerText = `${fecha} — Horas bloqueadas: ${bloqueos[fecha].join(", ")}`;
    }

    div.appendChild(item);
  }
}
function mostrarCitas() {
  const cont = document.getElementById("listaCitas");
  cont.innerHTML = "";

  const citas = JSON.parse(localStorage.getItem("citas") || "[]");

  if (citas.length === 0) {
    cont.innerHTML = "<p>No hay citas todavía</p>";
    return;
  }

  citas.forEach(c => {
    const div = document.createElement("div");
    div.innerText = `${c.fecha} — ${c.hora} — ${c.servicio}`;
    cont.appendChild(div);
  });
}
