// blog.js: list posts from manifest with optional category
import {$,formatDate} from './utils.js';
async function load(){
  const listEl = document.querySelector('.post-list'); if(!listEl) return;
  const params = new URLSearchParams(location.search);
  const category = document.body.dataset.category || params.get('category');
  const res = await fetch('/blog/blog-manifest.json'); const data = await res.json();
  let posts = data.posts.sort((a,b)=> b.date.localeCompare(a.date));
  if(category) posts = posts.filter(p=>p.category===category);
  const cards = posts.map(p=>`
    <article class="post-card">
      <img class="cover" src="${p.cover||'/assets/img/cover-placeholder.svg'}" alt="" loading="lazy">
      <div class="card-body">
        <div class="badge">${p.category}</div>
        <h3 style="margin:.4rem 0">${p.title}</h3>
        <small style="color:var(--muted)">${formatDate(p.date)}</small>
        <p style="margin:.5rem 0;color:var(--muted)">${p.excerpt||''}</p>
        <a class="btn" href="/blog/posts/slug.html?slug=${p.slug}">Oku</a>
      </div>
    </article>`).join('');
  listEl.innerHTML = cards || '<p>Henüz yazı yok.</p>';
}
document.addEventListener('DOMContentLoaded', load);