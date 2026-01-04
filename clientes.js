console.log("clientes.js cargado");

let servicio = "", fecha = "", hora = "";

function limpiarSeleccion() {
  document.querySelectorAll(".seleccionado").forEach(e => {
    e.classList.remove("seleccionado");
  });
}

function seleccionarServicio(btn, s) {
  limpiarSeleccion();
  btn.classList.add("seleccionado");
  servicio = s;
  generarDias();
}

function generarDias() {
  const cont = document.getElementById("dias");
  cont.innerHTML = "";

  const hoy = new Date();
  hoy.setHours(0,0,0,0);

  for (let i = 0; i < 14; i++) {
    const f = new Date();
    f.setDate(hoy.getDate() + i);

    const b = document.createElement("button");
    b.textContent = f.toLocaleDateString();

    b.onclick = () => {
      limpiarSeleccion();
      b.classList.add("seleccionado");
      fecha = b.textContent;
      generarHoras();
    };

    cont.appendChild(b);
  }
}

function generarHoras() {
  const cont = document.getElementById("horas");
  cont.innerHTML = "";

  const horas = [
    "09:00","09:30","10:00","10:30","11:00","11:30",
    "12:00","12:30","13:00","13:30",
    "16:30","17:00","17:30","18:00","18:30",
    "19:00","19:30","20:00"
  ];

  const citas = JSON.parse(localStorage.getItem("citas") || "[]");

  horas.forEach(h => {
    const b = document.createElement("button");
    b.textContent = h;

    const ocupada = citas.find(c => c.fecha === fecha && c.hora === h);
    if (ocupada) {
      b.classList.add("bloqueado");
    } else {
      b.onclick = () => {
        limpiarSeleccion();
        b.classList.add("seleccionado");
        hora = h;
      };
    }

    cont.appendChild(b);
  });
}

function reservar(e) {
  e.preventDefault();

  if (!servicio || !fecha || !hora) {
    alert("Falta seleccionar algo");
    return;
  }

  const citas = JSON.parse(localStorage.getItem("citas") || "[]");

  citas.push({
    nombre: nombre.value,
    servicio,
    fecha,
    hora
  });

  localStorage.setItem("citas", JSON.stringify(citas));
  alert("Cita reservada");

  location.reload();
}
