let servicio="", fecha="", hora="";

const horasManana = [
  "09:00","09:30","10:00","10:30","11:00",
  "11:30","12:00","12:30","13:00","13:30"
];
const horasTarde = [
  "16:30","17:00","17:30","18:00",
  "18:30","19:00","19:30","20:00"
];

function seleccionarServicio(btn,s){
  limpiarSeleccion("button");
  btn.classList.add("seleccionado");
  servicio=s;
  document.getElementById("dias").classList.remove("oculto");
  generarCalendario();
}

function generarCalendario(){
  const cal=document.getElementById("calendario");
  cal.innerHTML="";
  for(let i=1;i<=30;i++){
    const b=document.createElement("button");
    b.textContent=i;
    b.onclick=()=>seleccionarDia(b,i);
    cal.appendChild(b);
  }
}

function seleccionarDia(btn,d){
  limpiarSeleccion("#calendario button");
  btn.classList.add("seleccionado");
  fecha=d;
  document.getElementById("horas").classList.remove("oculto");
  generarHoras();
}

function generarHoras(){
  generarBloque("manana",horasManana);
  generarBloque("tarde",horasTarde);
}

function generarBloque(id,horas){
  const cont=document.getElementById(id);
  cont.innerHTML="";
  horas.forEach(h=>{
    const b=document.createElement("button");
    b.textContent=h;
    b.onclick=()=>seleccionarHora(b,h);
    cont.appendChild(b);
  });
}

function seleccionarHora(btn,h){
  limpiarSeleccion("#horas button");
  btn.classList.add("seleccionado");
  hora=h;
  document.getElementById("formulario").classList.remove("oculto");
}

function reservar(e){
  e.preventDefault();
  const nombre=document.getElementById("nombre").value;
  const tel=document.getElementById("telefono").value;

  const citas=JSON.parse(localStorage.getItem("citas")||"[]");
  citas.push({nombre,telefono:tel,servicio,fecha,hora});
  localStorage.setItem("citas",JSON.stringify(citas));

  alert("Cita reservada");
  location.reload();
}

function limpiarSeleccion(selector){
  document.querySelectorAll(selector).forEach(b=>b.classList.remove("seleccionado"));
}
