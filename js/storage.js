
const Storage = {
  get(key, fallback=null) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch(e){ return fallback; } },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
  remove(key) { localStorage.removeItem(key); },
  id(){ return 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
};
const APP_KEYS = { users:'zhon1_users_v2', session:'zhon1_session', lang:'app_lang' };
function getUsers(){ return Storage.get(APP_KEYS.users, {}); }
function setUsers(users){ Storage.set(APP_KEYS.users, users); }
function getCurrentEmail(){ return localStorage.getItem(APP_KEYS.session) || ''; }
function getCurrentUser(){ const email = getCurrentEmail(); return email ? getUsers()[email] || null : null; }
function setCurrentUser(email){ localStorage.setItem(APP_KEYS.session, email); }
function clearCurrentUser(){ localStorage.removeItem(APP_KEYS.session); }
function saveUser(user){ const users=getUsers(); users[user.email]=user; setUsers(users); }
function userProgressKey(email){ return 'zhon1_progress_' + (email || 'guest'); }
