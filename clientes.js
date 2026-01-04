let servicio = '';
let fecha = '';
let hora = '';

let btnServicio = null;
let btnDia = null;
let btnHora = null;

const meses = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

let hoy = new Date();
let mes = hoy.getMonth();
let año = hoy.getFullYear();

/* ================= DATOS ================= */

function getBloqueos() {
  return JSON.parse(localStorage.getItem('bloqueos') || '{}');
}

function getCitas() {
  return JSON.parse(localStorage.getItem('citas') || '[]');
}

/* ================= SERVICIOS ================= */

function seleccionarServicio(btn, s) {
  servicio = s;

  if (btnServicio) btnServicio.classList.remove('seleccionado');
  btnServicio = btn;
  btnServicio.classList.add('seleccionado');

  document.getElementById('dias').classList.remove('oculto');
  generarDias();
}

/* ================= CALENDARIO ================= */

function cambiarMes(d) {
  mes += d;
  if (mes < 0) { mes = 11; año--; }
  if (mes > 11) { mes = 0; año++; }
  generarDias();
}

function diasDelMes(m, a) {
  return new Date(a, m + 1, 0).getDate();
}

function generarDias() {
  document.getElementById('nombreMes').innerText = `${meses[mes]} ${año}`;
  const cont = document.getElementById('diasMes');
  cont.innerHTML = '';

  const bloqueos = getBloqueos();
  const total = diasDelMes(mes, año);

  for (let i = 1; i <= total; i++) {
    const b = document.createElement('button');
    const clave = `${i}-${mes + 1}-${año}`;
    b.textContent = i;

    if (bloqueos[clave]?.includes('todo')) {
      b.classList.add('bloqueado');
    } else {
      b.onclick = () => seleccionarDia(b, clave);
    }

    cont.appendChild(b);
  }
}

function seleccionarDia(btn, f) {
  fecha = f;

  if (btnDia) btnDia.classList.remove('seleccionado');
  btnDia = btn;
  btnDia.classList.add('seleccionado');

  document.getElementById('horas').classList.remove('oculto');
  generarHoras();
}

/* ================= HORAS ================= */

const horasManana = [
  '09:00','09:30','10:00','10:30','11:00',
  '11:30','12:00','12:30','13:00','13:30'
];

const horasTarde = [
  '16:30','17:00','17:30','18:00',
  '18:30','19:00','19:30','20:00'
];

function generarHoras() {
  generarBloque('manana', horasManana);
  generarBloque('tarde', horasTarde);
}

function generarBloque(id, horas) {
  const cont = document.getElementById(id);
  cont.innerHTML = '';

  const bloqueos = getBloqueos();
  const citas = getCitas();

  horas.forEach(h => {
    const b = document.createElement('button');
    b.textContent = h;

    const bloqueado =
      bloqueos[fecha]?.includes('todo') ||
      bloqueos[fecha]?.includes(h);

    const ocupado = citas.some(c => c.fecha === fecha && c.hora === h);

    if (bloqueado) {
      b.classList.add('bloqueado');
    } else if (ocupado) {
      b.classList.add('ocupado');
    } else {
      b.onclick = () => seleccionarHora(b, h);
    }

    cont.appendChild(b);
  });
}

function seleccionarHora(btn, h) {
  hora = h;

  if (btnHora) btnHora.classList.remove('seleccionado');
  btnHora = btn;
  btnHora.classList.add('seleccionado');

  document.getElementById('formulario').classList.remove('oculto');
}

/* ================= ENVÍO ================= */

function enviarReserva(e) {
  e.preventDefault();

  const citas = getCitas();
  citas.push({ servicio, fecha, hora });

  localStorage.setItem('citas', JSON.stringify(citas));
  alert('Reserva confirmada');

  location.reload();
}
