// projects.js: render & filter projects
import {$,$all,debounce} from './utils.js';
async function load(){ 
  const listEl = $('.projects-grid'); if(!listEl) return;
  const res = await fetch('/projects/projects.json'); const data = await res.json();
  const search = $('#search'); const tagsEl = $('#tags'); let activeTag = 'all';
  function render(items){
    listEl.innerHTML = items.map(p=>`
      <article class="card project-card">
        <div class="project-cover"><img src="${p.cover||'/assets/img/cover-placeholder.svg'}" alt="" loading="lazy"></div>
        <div class="card-body">
          <h3>${p.title}</h3>
          <p style="color:var(--muted)">${p.description||''}</p>
          <div class="project-meta">${(p.tags||[]).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
          <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
            ${p.repo?`<a class="btn" href="${p.repo}" target="_blank" rel="noopener">Repo</a>`:''}
            ${p.demo?`<a class="btn" href="${p.demo}" target="_blank" rel="noopener">Demo</a>`:''}
          </div>
        </div>
      </article>`).join('');
  }
  function filter(){
    const q = (search?.value||'').toLowerCase();
    let items = data.projects;
    if(activeTag!=='all') items = items.filter(p=>p.tags?.includes(activeTag));
    if(q) items = items.filter(p=> (p.title+p.description).toLowerCase().includes(q));
    render(items);
  }
  // tags
  const tagSet = new Set(data.projects.flatMap(p=>p.tags||[]));
  tagsEl.innerHTML = ['all',...tagSet].map(t=>`<button class="tag" data-tag="${t}">${t}</button>`).join('');
  tagsEl.addEventListener('click',(e)=>{ const b=e.target.closest('[data-tag]'); if(!b) return; activeTag=b.dataset.tag; tagsEl.querySelectorAll('.tag').forEach(x=>x.classList.toggle('active',x.dataset.tag===activeTag)); filter(); });
  search?.addEventListener('input', debounce(filter,200));
  // default
  tagsEl.querySelector('[data-tag="all"]')?.classList.add('active');
  render(data.projects.slice(0,12));
}
document.addEventListener('DOMContentLoaded', load);