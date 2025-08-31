// injectPartials.js: load header & footer once per page
(async function(){
  async function inject(id, url){
    const el = document.getElementById(id);
    if(!el) return;
    try{
      const res = await fetch(url, {cache:'no-store'});
      el.innerHTML = await res.text();
      // set active link
      const path = location.pathname.replace(/\/index\.html$/, '/');
      el.querySelectorAll('a.nav-link').forEach(a=>{
        const href = a.getAttribute('href');
        if(href && (href===path || (href!== '/' && path.startsWith(href)))){
          a.classList.add('active');
        }
      });
    }catch(e){ console.warn('Partial inject failed', e); }
  }
  await inject('site-header', '/partials/header.html');
  await inject('site-footer', '/partials/footer.html');
})();