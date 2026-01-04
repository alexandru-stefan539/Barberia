console.log("barbero.js cargado");

btnLogin.onclick = () => {
  if (usuario.value === "admin" && password.value === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
    mostrarCitas();
  } else {
    alert("Credenciales incorrectas");
  }
};

function mostrarCitas() {
  const cont = document.getElementById("listaCitas");
  cont.innerHTML = "";

  const citas = JSON.parse(localStorage.getItem("citas") || "[]");

  citas.forEach((c, i) => {
    const d = document.createElement("div");
    d.innerHTML = `
      <strong>${c.nombre}</strong><br>
      ${c.servicio} — ${c.fecha} — ${c.hora}
      <button onclick="cancelar(${i})">Cancelar</button>
      <hr>
    `;
    cont.appendChild(d);
  });
}

function cancelar(i) {
  const citas = JSON.parse(localStorage.getItem("citas") || "[]");
  citas.splice(i, 1);
  localStorage.setItem("citas", JSON.stringify(citas));
  mostrarCitas();
}
