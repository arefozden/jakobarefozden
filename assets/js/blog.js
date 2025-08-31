
// blog.js: list posts from manifest with optional category + live search & tag filter
import {$, $all, formatDate, debounce} from './utils.js';
async function load(){
  const listEl = document.querySelector('.post-list'); if(!listEl) return;
  const res = await fetch('/blog/blog-manifest.json'); const data = await res.json();
  let posts = data.posts.sort((a,b)=> b.date.localeCompare(a.date));

  const params = new URLSearchParams(location.search);
  const category = document.body.dataset.category || params.get('category');
  if(category) posts = posts.filter(p=>p.category===category);

  // Build tag set
  const tagSet = new Set();
  posts.forEach(p=> (p.tags||[]).forEach(t=> tagSet.add(t)));
  const searchWrap = document.querySelector('.blog-search-wrap');
  if(searchWrap){
    const tagsEl = document.createElement('div'); tagsEl.className = 'tags';
    tagsEl.innerHTML = ['all', ...Array.from(tagSet)].map(t=>`<button class="tag" data-tag="${t}">${t}</button>`).join('');
    searchWrap.appendChild(tagsEl);
    const input = document.createElement('input');
    input.type='search'; input.placeholder='Search posts...';
    input.style='padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:transparent;color:var(--text);min-width:220px;margin-top:8px';
    searchWrap.appendChild(input);

    let activeTag = 'all';
    function match(p, q){
      if(!q) return true;
      const hay = (p.title+' '+(p.excerpt||'')+' '+(p.tags||[]).join(' ')).toLowerCase();
      return hay.includes(q.toLowerCase());
    }
    function tagOk(p){ return activeTag==='all' || (p.tags||[]).includes(activeTag); }
    function render(){
      const q = input.value.trim();
      const items = posts.filter(p=> tagOk(p) && match(p,q));
      listEl.innerHTML = items.map(p=>`
        <article class="post-card">
          <img class="cover" src="${p.cover||'/assets/img/cover-placeholder.svg'}" alt="" loading="lazy">
          <div class="card-body">
            <div class="badge">${p.category}</div>
            <h3 style="margin:.4rem 0">${p.title}</h3>
            <small style="color:var(--muted)">${formatDate(p.date)}</small>
            <p style="margin:.5rem 0;color:var(--muted)">${p.excerpt||''}</p>
            <div class="project-meta">${(p.tags||[]).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
            <a class="btn" href="/blog/posts/slug.html?slug=${p.slug}" style="margin-top:8px">Read</a>
          </div>
        </article>`).join('') || '<p>No posts found.</p>';
    }
    tagsEl.addEventListener('click', (e)=>{
      const b = e.target.closest('[data-tag]'); if(!b) return;
      activeTag = b.dataset.tag;
      tagsEl.querySelectorAll('.tag').forEach(x=> x.classList.toggle('active', x.dataset.tag===activeTag));
      render();
    });
    input.addEventListener('input', debounce(render, 200));

    tagsEl.querySelector('[data-tag="all"]')?.classList.add('active');
    render();
  }else{
    // No search UI on this page, just render all
    const cards = posts.map(p=>`
      <article class="post-card">
        <img class="cover" src="${p.cover||'/assets/img/cover-placeholder.svg'}" alt="" loading="lazy">
        <div class="card-body">
          <div class="badge">${p.category}</div>
          <h3 style="margin:.4rem 0">${p.title}</h3>
          <small style="color:var(--muted)">${formatDate(p.date)}</small>
          <p style="margin:.5rem 0;color:var(--muted)">${p.excerpt||''}</p>
          <div class="project-meta">${(p.tags||[]).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
          <a class="btn" href="/blog/posts/slug.html?slug=${p.slug}" style="margin-top:8px">Read</a>
        </div>
      </article>`).join('');
    listEl.innerHTML = cards || '<p>No posts yet.</p>';
  }
}
document.addEventListener('DOMContentLoaded', load);
