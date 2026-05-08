
const I18N = {
  kz: {
    courseTitle:'Python Бағдарламалау Курсы', contentTitle:'Курс мазмұны', lesson:'📖 Сабақ', compiler:'💻 Компилятор',
    login:'Кіру', register:'Тіркелу', profile:'Профиль', logout:'Шығу', run:'▶ Іске қосу', clear:'тазалау',
    points:'ұпай', completedLectures:'лекция аяқталды', aiTitle:'AI Көмекші · Python', inputPlaceholder:'Сұрақ жаз...',
    switched:'🇰🇿 Қазақ тіліне ауысты', loginRequired:'Профиль үшін кіріңіз'
  },
  ru: {
    courseTitle:'Курс программирования Python', contentTitle:'Содержание курса', lesson:'📖 Урок', compiler:'💻 Компилятор',
    login:'Войти', register:'Регистрация', profile:'Профиль', logout:'Выйти', run:'▶ Запустить', clear:'очистить',
    points:'очков', completedLectures:'лекций завершено', aiTitle:'AI Помощник · Python', inputPlaceholder:'Напишите вопрос...',
    switched:'🇷🇺 Переключено на русский', loginRequired:'Войдите, чтобы открыть профиль'
  }
};
let currentLang = localStorage.getItem(APP_KEYS.lang) || 'kz';
function t(key){ return (I18N[currentLang] && I18N[currentLang][key]) || I18N.kz[key] || key; }
function initLanguage(){ setLang(currentLang, true); }
function setLang(lang, silent=false){
  currentLang = I18N[lang] ? lang : 'kz';
  localStorage.setItem(APP_KEYS.lang, currentLang);
  updateTranslations();
  if(!silent && typeof toast === 'function') toast(t('switched'), 'blue');
}
function updateTranslations(){
  const kz=document.getElementById('lbKZ'), ru=document.getElementById('lbRU');
  if(kz) kz.classList.toggle('active', currentLang==='kz');
  if(ru) ru.classList.toggle('active', currentLang==='ru');
  const h=document.querySelector('.h-title'); if(h) h.textContent=t('courseTitle');
  const sb=document.querySelector('.sb-top-title'); if(sb) sb.textContent=t('contentTitle');
  document.querySelectorAll('.tab').forEach(tab=>{ if(tab.dataset.tab==='lesson') tab.textContent=t('lesson'); if(tab.dataset.tab==='compiler') tab.textContent=t('compiler'); });
  const ai=document.querySelector('.ai-head-title'); if(ai) ai.textContent=t('aiTitle');
  const inp=document.getElementById('aiInput'); if(inp) inp.placeholder=t('inputPlaceholder');
  if(typeof renderSidebar === 'function') renderSidebar();
}
