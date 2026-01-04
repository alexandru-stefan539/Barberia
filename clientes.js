let servicio = "", fecha = "", hora = "";

const hoy = new Date();
const horasManana = [
  "09:00","09:30","10:00","10:30","11:00",
  "11:30","12:00","12:30","13:00","13:30"
];
const horasTarde = [
  "16:30","17:00","17:30","18:00",
  "18:30","19:00","19:30","20:00"
];

function seleccionarServicio(btn, s) {
  limpiar("button");
  btn.classList.add("seleccionado");
  servicio = s;
  document.getElementById("dias").classList.remove("oculto");
  generarCalendario();
}

function generarCalendario() {
  const cal = document.getElementById("calendario");
  cal.innerHTML = "";

  const año = hoy.getFullYear();
  const mes = hoy.getMonth();
  const ultimoDia = new Date(año, mes + 1, 0).getDate();

  for (let d = 1; d <= ultimoDia; d++) {
    const fechaBtn = new Date(año, mes, d);
    const b = document.createElement("button");
    b.textContent = d;

    if (fechaBtn < new Date(hoy.setHours(0,0,0,0))) {
      b.classList.add("bloqueado");
    } else {
      b.onclick = () => seleccionarDia(b, fechaBtn);
    }

    cal.appendChild(b);
  }
}

function seleccionarDia(btn, f) {
  limpiar("#calendario button");
  btn.classList.add("seleccionado");
  fecha = f.toISOString().split("T")[0];
  document.getElementById("horas").classList.remove("oculto");
  generarHoras();
}

function generarHoras() {
  generarBloque("manana", horasManana);
  generarBloque("tarde", horasTarde);
}

function generarBloque(id, horas) {
  const cont = document.getElementById(id);
  cont.innerHTML = "";

  const citas = JSON.parse(localStorage.getItem("citas") || "[]");

  horas.forEach(h => {
    const b = document.createElement("button");
    b.textContent = h;

    const ocupada = citas.some(c => c.fecha === fecha && c.hora === h);
    if (ocupada) {
      b.classList.add("ocupado");
    } else {
      b.onclick = () => seleccionarHora(b, h);
    }

    cont.appendChild(b);
  });
}

function seleccionarHora(btn, h) {
  limpiar("#horas button");
  btn.classList.add("seleccionado");
  hora = h;
  document.getElementById("formulario").classList.remove("oculto");
}

function reservar(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const tel = document.getElementById("telefono").value;

  const citas = JSON.parse(localStorage.getItem("citas") || "[]");
  citas.push({ nombre, telefono: tel, servicio, fecha, hora });

  localStorage.setItem("citas", JSON.stringify(citas));
  alert("Cita reservada");
  location.reload();
}

function limpiar(selector) {
  document.querySelectorAll(selector).forEach(b => b.classList.remove("seleccionado"));
}
