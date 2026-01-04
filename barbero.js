const USER="admin",PASS="1234";

document.getElementById("btnLogin").onclick=login;

function login(){
  if(usuario.value===USER && password.value===PASS){
    login.style.display="none";
    panel.style.display="block";
    mostrarCitas();
  } else error.innerText="Credenciales incorrectas";
}

function logout(){location.reload();}

function mostrarCitas(){
  const cont=document.getElementById("listaCitas");
  cont.innerHTML="";
  const dia=document.getElementById("filtroDia").value;
  const citas=JSON.parse(localStorage.getItem("citas")||"[]");

  citas
    .filter(c=>!dia||c.fecha==dia)
    .forEach((c,i)=>{
      const d=document.createElement("div");
      d.innerHTML=`
        <b>${c.fecha} ${c.hora}</b><br>
        ${c.nombre} — ${c.servicio}
        <button onclick="cancelar(${i})">❌</button>
      `;
      cont.appendChild(d);
    });
}

function cancelar(i){
  const citas=JSON.parse(localStorage.getItem("citas"));
  citas.splice(i,1);
  localStorage.setItem("citas",JSON.stringify(citas));
  mostrarCitas();
}
