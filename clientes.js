let servicio="", fecha="", hora="";

const horasManana=[
  "09:00","09:30","10:00","10:30","11:00",
  "11:30","12:00","12:30","13:00","13:30"
];
const horasTarde=[
  "16:30","17:00","17:30","18:00",
  "18:30","19:00","19:30","20:00"
];

function seleccionarServicio(btn,s){
  limpiar("button");
  btn.classList.add("seleccionado");
  servicio=s;
  document.getElementById("dias").classList.remove("oculto");
  generarCalendario();
}

function generarCalendario(){
  const cal=document.getElementById("calendario");
  cal.innerHTML="";

  const hoy=new Date();
  hoy.setHours(0,0,0,0);
  const año=hoy.getFullYear();
  const mes=hoy.getMonth();
  const ultimo=new Date(año,mes+1,0).getDate();

  for(let d=1;d<=ultimo;d++){
    const f=new Date(año,mes,d);
    const b=document.createElement("button");
    b.textContent=d;

    if(f<hoy){
      b.classList.add("bloqueado");
    }else{
      b.onclick=()=>seleccionarDia(b,f);
    }
    cal.appendChild(b);
  }
}

function seleccionarDia(btn,f){
  limpiar("#calendario button");
  btn.classList.add("seleccionado");
  fecha=f.toISOString().split("T")[0];
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
  const citas=JSON.parse(localStorage.getItem("citas")||"[]");

  horas.forEach(h=>{
    const b=document.createElement("button");
    b.textContent=h;
    if(citas.some(c=>c.fecha===fecha && c.hora===h)){
      b.classList.add("ocupado");
    }else{
      b.onclick=()=>seleccionarHora(b,h);
    }
    cont.appendChild(b);
  });
}

function seleccionarHora(btn,h){
  limpiar("#horas button");
  btn.classList.add("seleccionado");
  hora=h;
  document.getElementById("formulario").classList.remove("oculto");
}

function reservar(e){
  e.preventDefault();
  const citas=JSON.parse(localStorage.getItem("citas")||"[]");
  citas.push({
    nombre:nombre.value,
    telefono:telefono.value,
    servicio,fecha,hora
  });
  localStorage.setItem("citas",JSON.stringify(citas));
  alert("Cita reservada");
  location.reload();
}

function limpiar(sel){
  document.querySelectorAll(sel).forEach(b=>b.classList.remove("seleccionado"));
}
