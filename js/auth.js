
let currentUser = null;
function createUser({name,email,password}){
  return { id:Storage.id(), name, email, password:btoa(password), joinDate:new Date().toISOString(), loginCount:0, activeTime:0,
    completedLectures:[], completedSeminars:[], progress:0, points:0, certificates:[], lastActivity:new Date().toISOString(), settings:{} };
}
function initAuth(){
  currentUser = getCurrentUser();
  if(currentUser){ currentUser.lastActivity=new Date().toISOString(); saveUser(currentUser); }
  updateAvatarUI();
  loadProgress();
}
function openProfileOrLogin(){ location.href = currentUser ? 'profile.html' : 'login.html'; }
function doPageLogin(){
  const email=(document.getElementById('loginEmail')?.value||'').trim().toLowerCase();
  const pass=document.getElementById('loginPass')?.value||''; const err=document.getElementById('loginErr');
  const users=getUsers(); const u=users[email];
  if(!email || !pass){ if(err) err.textContent='Барлық өрістерді толтырыңыз'; return; }
  if(!u || u.password!==btoa(pass)){ if(err) err.textContent='Email немесе пароль қате'; return; }
  u.loginCount=(u.loginCount||0)+1; u.lastActivity=new Date().toISOString(); saveUser(u); setCurrentUser(email); location.href='index.html';
}
function doPageRegister(){
  const name=(document.getElementById('regName')?.value||'').trim(); const email=(document.getElementById('regEmail')?.value||'').trim().toLowerCase(); const pass=document.getElementById('regPass')?.value||''; const err=document.getElementById('regErr');
  if(!name || !email || !pass){ if(err) err.textContent='Барлық өрістерді толтырыңыз'; return; }
  if(pass.length<6){ if(err) err.textContent='Пароль кемінде 6 символ болуы керек'; return; }
  if(!email.includes('@')){ if(err) err.textContent='Email дұрыс емес'; return; }
  const users=getUsers(); if(users[email]){ if(err) err.textContent='Бұл email тіркелген'; return; }
  const u=createUser({name,email,password:pass}); u.loginCount=1; saveUser(u); setCurrentUser(email); location.href='index.html';
}
function logoutUser(){ clearCurrentUser(); currentUser=null; updateAvatarUI(); location.href='login.html'; }
function updateAvatarUI(){
  const av=document.getElementById('hAvatar'); if(!av) return;
  currentUser=getCurrentUser();
  if(currentUser){ av.textContent=currentUser.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); av.title=currentUser.name+' · Профиль'; }
  else { av.textContent='АС'; av.title='Кіру / Тіркелу'; }
}
