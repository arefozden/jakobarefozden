// theme.js: dark/light toggle with localStorage
(function(){
  const THEME_KEY = 'site-theme';
  const root = document.documentElement;
  function setTheme(t){
      // add transition class briefly
      root.classList.add('theme-transition');
      window.setTimeout(()=> root.classList.remove('theme-transition'), 350);
      root.setAttribute('data-theme', t);
      localStorage.setItem(THEME_KEY,t);
    }
  function init(){
    const saved = localStorage.getItem(THEME_KEY);
    if(saved){ setTheme(saved); }
    const btn = document.addEventListener('click', (e)=>{
      const t = e.target.closest('[data-toggle-theme]');
      if(!t) return;
      const cur = root.getAttribute('data-theme') || 'dark';
      setTheme(cur==='dark' ? 'light' : 'dark');
    });
  }
  init();
})();