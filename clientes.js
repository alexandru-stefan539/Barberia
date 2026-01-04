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

let mes = new Date().getMonth();
let año = 2026;

/* ================= DATOS ================= */

function getBloqueos() {
  return JSON.parse(localStorage.getItem('bloqueos') || '{}');
}

function getCitas() {
  return JSON.parse(localStorage.getItem('citas') || '[]');
}

/* ================= SERVICIOS ================= */

function seleccionarServicio(s) {
  servicio = s;

  if (btnServicio) btnServicio.classList.remove('seleccionado');
  btnServicio = event.target;
  btnServicio.classList.add('seleccionado');

  document.getElementById('dias').classList.remove('oculto');
  generarDias();
}

/* ================= DÍAS ================= */

function cambiarMes(d) {
  mes = (mes + d + 12) % 12;
  generarDias();
}

function generarDias() {
  document.getElementById('nombreMes').innerText = meses[mes] + ' ' + año;
  const cont = document.getElementById('diasMes');
  cont.innerHTML = '';

  const bloqueos = getBloqueos();

  for (let i = 1; i <= 30; i++) {
    const b = document.createElement('button');
    const claveFecha = `${i}-${mes + 1}-${año}`;
    b.textContent = i;

    if (bloqueos[claveFecha]?.includes('todo')) {
      b.classList.add('bloqueado');
    } else {
      b.onclick = () => seleccionarDia(b, claveFecha);
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

function generarHoras() {
  const horas = ['10:00','11:00','12:00','17:00','18:00'];
  const bloqueos = getBloqueos();
  const citas = getCitas();

  ['manana','tarde'].forEach(id => {
    const c = document.getElementById(id);
    c.innerHTML = '';

    horas.forEach(h => {
      const b = document.createElement('button');

      const bloqueado =
        bloqueos[fecha]?.includes('todo') ||
        bloqueos[fecha]?.includes(h);

      const ocupado = citas.some(c =>
        c.fecha === fecha && c.hora === h
      );

      b.textContent = h;

      if (bloqueado) {
        b.classList.add('bloqueado');
      } else if (ocupado) {
        b.classList.add('ocupado');
      } else {
        b.onclick = () => seleccionarHora(b, h);
      }

      c.appendChild(b);
    });
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
