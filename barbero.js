const USER = "admin";
const PASS = "1234";

document.getElementById("btnLogin").onclick = () => {
  if (usuario.value === USER && password.value === PASS) {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
    mostrarCitas();
  } else {
    error.innerText = "Credenciales incorrectas";
  }
};

function logout() {
  location.reload();
}

function mostrarCitas() {
  const cont = document.getElementById("listaCitas");
  cont.innerHTML = "";

  const citas = JSON.parse(localStorage.getItem("citas") || "[]");

  if (citas.length === 0) {
    cont.innerHTML = "<p>No hay citas</p>";
    return;
  }

  citas.forEach((c, i) => {
    const d = document.createElement("div");
    d.innerHTML = `
      <b>${c.fecha} ${c.hora}</b><br>
      Cliente: ${c.nombre}<br>
      Servicio: ${c.servicio}<br>
      <button onclick="cancelar(${i})">Cancelar</button>
      <hr>
    `;
    cont.appendChild(d);
  });
}

function cancelar(i) {
  const citas = JSON.parse(localStorage.getItem("citas"));
  citas.splice(i, 1);
  localStorage.setItem("citas", JSON.stringify(citas));
  mostrarCitas();
}
