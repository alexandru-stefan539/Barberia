document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("btnLogin");

  btn.addEventListener("click", () => {
    const usuario = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    if (usuario === "admin" && password === "1234") {
      document.getElementById("login").style.display = "none";
      document.getElementById("panel").style.display = "block";
      cargarCitas();
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });

});

function cargarCitas() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  const citas = JSON.parse(localStorage.getItem("citas")) || [];

  if (citas.length === 0) {
    lista.innerHTML = "<li>No hay citas todavía</li>";
    return;
  }

  citas.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.servicio} | ${c.fecha} | ${c.hora}`;
    lista.appendChild(li);
  });
}
