let servicio = '';
let fecha = '';
let hora = '';

const meses = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

let mes = new Date().getMonth();
let año = 2026;

function seleccionarServicio(s) {
  servicio = s;
  document.getElementById('dias').classList.remove('oculto');
  generar();
}

function cambiarMes(d) {
  mes = (mes + d + 12) % 12;
  generar();
}

function generar() {
  document.getElementById('nombreMes').innerText = meses[mes] + ' ' + año;
  const cont = document.getElementById('diasMes');
  cont.innerHTML = '';

  for (let i = 1; i <= 30; i++) {
    const b = document.createElement('button');
    b.textContent = i;
    b.onclick = () => selDia(i);
    cont.appendChild(b);
  }
}

function selDia(d) {
  fecha = `${d}-${mes + 1}-${año}`;
  document.getElementById('horas').classList.remove('oculto');
  genHoras();
}

function genHoras() {
  const horas = ['10:00','11:00','12:00','17:00','18:00'];

  ['manana','tarde'].forEach(id => {
    const c = document.getElementById(id);
    c.innerHTML = '';

    horas.forEach(h => {
      const b = document.createElement('button');
      b.textContent = h;
      b.onclick = () => selHora(h);
      c.appendChild(b);
    });
  });
}

function selHora(h) {
  hora = h;
  document.getElementById('formulario').classList.remove('oculto');
}

function enviarReserva(e) {
  e.preventDefault();

  const citas = JSON.parse(localStorage.getItem('citas') || '[]');
  citas.push({ servicio, fecha, hora });

  localStorage.setItem('citas', JSON.stringify(citas));
  alert('Reserva enviada');
}
