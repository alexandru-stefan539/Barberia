let servicio='',fecha='',hora='';
const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
let mes=new Date().getMonth(),año=2026;

function seleccionarServicio(s){servicio=s;document.getElementById('dias').classList.remove('oculto');generar();}
function cambiarMes(d){mes=(mes+d+12)%12;generar();}
function generar(){
 document.getElementById('nombreMes').innerText=meses[mes]+' '+año;
 let d=document.getElementById('diasMes');d.innerHTML='';
 for(let i=1;i<=30;i++){let b=document.createElement('button');b.textContent=i;b.onclick=()=>selDia(i);d.appendChild(b);}
}
function selDia(d){fecha=d+'-'+mes+'-'+año;document.getElementById('horas').classList.remove('oculto');genHoras();}
function genHoras(){
 ['manana','tarde'].forEach(id=>{let c=document.getElementById(id);c.innerHTML='';['10:00','11:00','12:00','17:00','18:00'].forEach(h=>{
 let b=document.createElement('button');b.textContent=h;b.onclick=()=>selHora(h);c.appendChild(b);
 })})
}
function selHora(h){hora=h;document.getElementById('formulario').classList.remove('oculto');}
function enviarReserva(e){e.preventDefault();let r=JSON.parse(localStorage.getItem('citas')||'[]');r.push({servicio,fecha,hora});localStorage.setItem('citas',JSON.stringify(r));alert('Reserva enviada');}
