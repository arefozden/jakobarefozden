// post.js: render a single post from slug
import {mdToHtml} from './markdown.js';
import {$,formatDate} from './utils.js';
async function load(){
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const container = document.getElementById('post-container');
  if(!slug || !container){ container.innerHTML='<p>Yazı bulunamadı.</p>'; return; }
  const res = await fetch('/blog/blog-manifest.json'); const man = await res.json();
  const post = man.posts.find(p=>p.slug===slug);
  if(!post){ container.innerHTML='<p>Yazı bulunamadı.</p>'; return; }
  const md = await (await fetch(post.path)).text();
  const article = `
    <article class="card">
      <img src="${post.cover||'/assets/img/cover-placeholder.svg'}" alt="" loading="lazy">
      <div class="card-body">
        <div class="badge">${post.category}</div>
        <h1>${post.title}</h1>
        <small style="color:var(--muted)">${formatDate(post.date)}</small>
        <div class="post-content">${mdToHtml(md)}</div>
      </div>
    </article>`;
  container.innerHTML = article;
}
document.addEventListener('DOMContentLoaded', load);