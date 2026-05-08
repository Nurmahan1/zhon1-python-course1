
function formatActive(seconds){ const h=Math.floor((seconds||0)/3600), m=Math.floor(((seconds||0)%3600)/60); return `${h} сағ ${m} мин`; }
function renderProfilePage(){
  const root=document.getElementById('profileRoot'); if(!root) return; const u=getCurrentUser();
  if(!u){ root.innerHTML='<div class="auth-modal"><div class="auth-title">Профиль үшін кіріңіз</div><br><a class="auth-btn" style="display:block;text-align:center;text-decoration:none" href="login.html">Кіру</a></div>'; return; }
  const certs=u.certificates||[];
  root.innerHTML=`<div class="profile-shell"><div class="profile-card hero"><div class="h-avatar" style="width:64px;height:64px;font-size:1.1rem">${u.name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase()}</div><div><h1>${u.name}</h1><p>${u.email}</p></div><button class="btn btn-prev" onclick="logoutUser()">Шығу</button></div><div class="stats-grid">${[
    ['Кіру саны',u.loginCount||0],['Белсенді уақыт',formatActive(u.activeTime)],['Лекциялар',(u.completedLectures||[]).length],['Семинарлар',(u.completedSeminars||[]).length],['Прогресс',(u.progress||0)+'%'],['Ұпай',u.points||0],['Сертификат',certs.length],['Соңғы белсенділік',new Date(u.lastActivity).toLocaleString()]
  ].map(x=>`<div class="profile-card"><div class="stat-label">${x[0]}</div><div class="stat-value">${x[1]}</div></div>`).join('')}</div><div class="profile-card"><h2>Сертификаттар</h2>${certs.length?certs.map(c=>`<p>🏆 ${c.course} · ${new Date(c.date).toLocaleDateString()}</p>`).join(''):'<p>Әлі сертификат жоқ.</p>'}</div><div class="profile-card"><h2>Account Settings</h2><p>Деректер localStorage ішінде сақталады.</p></div></div>`;
}
document.addEventListener('DOMContentLoaded', renderProfilePage);
