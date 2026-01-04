console.log("clientes.js cargado");

let servicio = "", fecha = "", hora = "";
let mesActual = new Date().getMonth();
let añoActual = new Date().getFullYear();

const meses = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

function limpiarSeleccion() {
  document.querySelectorAll(".seleccionado").forEach(e => {
    e.classList.remove("seleccionado");
  });
}

function seleccionarServicio(btn, s) {
  limpiarSeleccion();
  btn.classList.add("seleccionado");
  servicio = s;
  document.getElementById("dias").classList.remove("oculto");
  generarCalendario();
}

function cambiarMes(d) {
  mesActual += d;
  if (mesActual < 0) { mesActual = 11; añoActual--; }
  if (mesActual > 11) { mesActual = 0; añoActual++; }
  generarCalendario();
}

function generarCalendario() {
  document.getElementById("nombreMes").innerText =
    meses[mesActual] + " " + añoActual;

  const cont = document.getElementById("diasMes");
  cont.innerHTML = "";

  const hoy = new Date();
  hoy.setHours(0,0,0,0);

  const diasMes = new Date(añoActual, mesActual + 1, 0).getDate();

  for (let d = 1; d <= diasMes; d++) {
    const fechaTemp = new Date(añoActual, mesActual, d);
    const b = document.createElement("button");
    b.textContent = d;

    if (fechaTemp < hoy) {
      b.classList.add("bloqueado");
    } else {
      b.onclick = () => {
        limpiarSeleccion();
        b.classList.add("seleccionado");
        fecha = fechaTemp.toLocaleDateString();
        document.getElementById("horas").classList.remove("oculto");
        generarHoras();
      };
    }

    cont.appendChild(b);
  }
}

function generarHoras() {
  const manana = document.getElementById("manana");
  const tarde = document.getElementById("tarde");
  manana.innerHTML = "";
  tarde.innerHTML = "";

  const horasManana = [
    "09:00","09:30","10:00","10:30","11:00","11:30",
    "12:00","12:30","13:00","13:30"
  ];

  const horasTarde = [
    "16:30","17:00","17:30","18:00","18:30",
    "19:00","19:30","20:00"
  ];

  const citas = JSON.parse(localStorage.getItem("citas") || "[]");

  function crearHora(h, contenedor) {
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
        document.getElementById("formulario").classList.remove("oculto");
      };
    }

    contenedor.appendChild(b);
  }

  horasManana.forEach(h => crearHora(h, manana));
  horasTarde.forEach(h => crearHora(h, tarde));
}

function reservar(e) {
  e.preventDefault();

  const citas = JSON.parse(localStorage.getItem("citas") || "[]");

  citas.push({
    nombre: nombre.value,
    servicio,
    fecha,
    hora
  });

  localStorage.setItem("citas", JSON.stringify(citas));
  alert("Cita reservada correctamente");
  location.reload();
}
