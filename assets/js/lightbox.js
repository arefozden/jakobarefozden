
// lightbox.js: simple image lightbox for blog posts
(function(){
  function setup(){
    const backdrop = document.createElement('div');
    backdrop.className = 'lightbox-backdrop';
    backdrop.innerHTML = '<button class="lightbox-close">✕</button><img class="lightbox-img" alt=""/>';
    document.body.appendChild(backdrop);
    const img = backdrop.querySelector('.lightbox-img');
    const close = ()=> backdrop.classList.remove('active');
    backdrop.addEventListener('click', (e)=>{ if(e.target===backdrop || e.target.classList.contains('lightbox-close')) close(); });
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });

    // delegate clicks inside post content and cover image
    document.addEventListener('click', (e)=>{
      const a = e.target.closest('.post-content img, article.card > img');
      if(!a) return;
      const src = a.getAttribute('src');
      if(!src) return;
      img.src = src;
      backdrop.classList.add('active');
    });
  }
  document.addEventListener('DOMContentLoaded', setup);
})();
