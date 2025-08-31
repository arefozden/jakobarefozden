
// post.js: render a single post from slug + build TOC
import {mdToHtml} from './markdown.js';
import {$,formatDate} from './utils.js';
function buildTOC(container){
  const heads = container.querySelectorAll('h1,h2,h3');
  if(!heads.length) return '';
  const items = Array.from(heads).map(h=>{
    const id = h.id || h.textContent.trim().toLowerCase().replace(/\s+/g,'-');
    h.id = id;
    const lvl = {H1:1,H2:2,H3:3}[h.tagName]||1;
    return `<li style="margin-left:${(lvl-1)*12}px"><a href="#${id}">${h.textContent}</a></li>`;
  }).join('');
  return `<aside class="card card-body" style="position:sticky;top:88px"><strong>Contents</strong><ul style="list-style:none;padding-left:0">${items}</ul></aside>`;
}
async function load(){
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const container = document.getElementById('post-container');
  if(!slug || !container){ container.innerHTML='<p>Post not found.</p>'; return; }
  const res = await fetch('/blog/blog-manifest.json'); const man = await res.json();
  const post = man.posts.find(p=>p.slug===slug);
  if(!post){ container.innerHTML='<p>Post not found.</p>'; return; }
  const md = await (await fetch(post.path)).text();
  const html = mdToHtml(md);
  const article = `
    <article class="card" style="display:grid;grid-template-columns:1fr 320px;gap:16px">
      <div>
        <img src="${post.cover||'/assets/img/cover-placeholder.svg'}" alt="" loading="lazy">
        <div class="card-body">
          <div class="badge">${post.category}</div>
          <h1>${post.title}</h1>
          <small style="color:var(--muted)">${formatDate(post.date)}</small>
          <div class="post-content">${html}</div>
        </div>
      </div>
      <div class="toc-slot"></div>
    </article>`;
  container.innerHTML = article;
  const toc = buildTOC(container.querySelector('.post-content'));
  container.querySelector('.toc-slot').innerHTML = toc;
}
document.addEventListener('DOMContentLoaded', load);
