
// analytics.js: local, privacy-friendly pageview counter (per device)
(function(){
  try{
    const key = 'pv:' + location.pathname + location.search;
    const n = parseInt(localStorage.getItem(key)||'0',10) + 1;
    localStorage.setItem(key, String(n));
    document.addEventListener('DOMContentLoaded', ()=>{
      const slot = document.querySelector('[data-pv-slot]');
      if(slot){ slot.textContent = n + ' views (this device)'; }
    });
  }catch(e){ /* localStorage may be blocked */ }
})();
