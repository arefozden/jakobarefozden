
// markdown.js: tiny markdown to HTML (basic) + heading ids
export function slugify(s=''){
  return s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g,'')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-');
}
export function mdToHtml(src=''){
  // capture headings first for id injection
  let html = src
    .replace(/^###\s+(.*)$/gm,(m,t)=>`<h3 id="${slugify(t)}">${t}</h3>`)
    .replace(/^##\s+(.*)$/gm,(m,t)=>`<h2 id="${slugify(t)}">${t}</h2>`)
    .replace(/^#\s+(.*)$/gm,(m,t)=>`<h1 id="${slugify(t)}">${t}</h1>`)
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,'<em>$1</em>')
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');

  // code blocks
  html = html.replace(/```([\s\S]*?)```/g, (m,p1)=>`<pre class="code"><code>${p1.replace(/</g,'&lt;')}</code></pre>`);
  // lists
  html = html.replace(/^(?:-\s+.*\n?)+/gm, m=>'<ul>'+m.trim().split(/\n/).map(li=>'<li>'+li.replace(/^-\s+/,'')+'</li>').join('')+'</ul>');
  // blockquote
  html = html.replace(/^(>\s+.*)$/gm, m=>'<blockquote>'+m.replace(/^>\s+/,'')+'</blockquote>');
  // paragraphs (skip if already block element)
  html = html.replace(/(^|\n)([^<\n][^\n]*)/g, (m,br,txt)=>{
    if(/^<h\d|<ul>|<blockquote>|<pre/.test(txt)) return m;
    return `${br}<p>${txt}</p>`;
  });
  return html;
}
