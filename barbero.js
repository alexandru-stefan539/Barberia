function login(){
 if(user.value==='admin'&&pass.value==='1234'){
  login.style.display='none';panel.style.display='block';cargar();
 } else alert('Datos incorrectos');
}
function cargar(){
 let r=JSON.parse(localStorage.getItem('citas')||'[]');
 let l=document.getElementById('lista');l.innerHTML='';
 r.forEach(c=>{let li=document.createElement('li');li.textContent=c.servicio+' '+c.fecha+' '+c.hora;l.appendChild(li);});
}
