
function calculateProgress(){ const total=(LECTURES?.length||15) + (LECTURES?.reduce((s,l)=>s+l.seminars.length,0)||30); const done=completedLectures.size + completedSeminars.size; return Math.round(done/total*100); }
function saveProgress(){
  const data={ score, completedLectures:[...completedLectures], completedSeminars:[...completedSeminars], quizState, codeSubmitted, updatedAt:new Date().toISOString() };
  const email=currentUser?.email || getCurrentEmail(); Storage.set(userProgressKey(email), data); updateUserStats();
}
function loadProgress(){
  const email=currentUser?.email || getCurrentEmail(); const data=Storage.get(userProgressKey(email), null); if(!data) return;
  score=data.score||0; completedLectures=new Set(data.completedLectures||[]); completedSeminars=new Set(data.completedSeminars||[]); quizState=data.quizState||{}; codeSubmitted=data.codeSubmitted||{};
}
function updateUserStats(){
  currentUser=getCurrentUser(); if(!currentUser) return;
  currentUser.completedLectures=[...completedLectures]; currentUser.completedSeminars=[...completedSeminars]; currentUser.points=score; currentUser.progress=calculateProgress(); currentUser.lastActivity=new Date().toISOString(); saveUser(currentUser);
}
function checkCourseComplete(){
  const pct=calculateProgress(); updateUserStats();
  if(pct>=100){
    currentUser=getCurrentUser();
    if(currentUser && !currentUser.certificates?.some(c=>c.course==='Python')){ currentUser.certificates=currentUser.certificates||[]; currentUser.certificates.push({course:'Python', date:new Date().toISOString(), progress:pct, points:score}); saveUser(currentUser); }
    if(!document.getElementById('certBanner')){ const banner=document.createElement('div'); banner.id='certBanner'; banner.style.cssText='background:linear-gradient(135deg,#e8f5e9,#e3f2fd);border:1px solid var(--green-mid);border-radius:10px;padding:18px;text-align:center;margin:14px 0;'; banner.innerHTML='<div style="font-size:2rem">🎓</div><div style="font-weight:700;margin:6px 0">Курсты аяқтадыңыз!</div><div style="font-size:.8rem;color:var(--text-light);margin-bottom:12px">Барлық курс элементтері орындалды</div><button class="cert-btn" onclick="showCertificate()">🏆 Сертификат алу</button>'; document.getElementById('tab-lesson')?.prepend(banner); }
    setTimeout(showCertificate, 300);
  }
}
let activeTimer=null;
function startActiveTimeTracking(){
  if(activeTimer) clearInterval(activeTimer);
  activeTimer=setInterval(()=>{ if(document.visibilityState==='visible'){ const u=getCurrentUser(); if(u){ u.activeTime=(u.activeTime||0)+5; u.lastActivity=new Date().toISOString(); saveUser(u); currentUser=u; } } },5000);
}
function showCertificate(){ const name=getCurrentUser()?.name || 'Студент'; const date=new Date().toLocaleDateString(currentLang==='ru'?'ru-RU':'kk-KZ',{year:'numeric',month:'long',day:'numeric'}); document.getElementById('certName').textContent=name; document.getElementById('certDate').textContent=date; document.getElementById('certScore').textContent=score+' '+t('points'); document.getElementById('certModal').classList.remove('hidden'); }
function closeCert(){ document.getElementById('certModal').classList.add('hidden'); }
function downloadCert(){ window.print(); }
