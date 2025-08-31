// markdown.js: tiny markdown to HTML (basic)
export function mdToHtml(src=''){
  // very small subset: headings, bold/italic, code, links, lists, blockquote, paragraphs
  let html = src
    .replace(/^###\s+(.*)$/gm,'<h3>$1</h3>')
    .replace(/^##\s+(.*)$/gm,'<h2>$1</h2>')
    .replace(/^#\s+(.*)$/gm,'<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,'<em>$1</em>')
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')
  ;
  // code blocks
  html = html.replace(/```([\s\S]*?)```/g, (m,p1)=>`<pre class="code"><code>${p1.replace(/</g,'&lt;')}</code></pre>`);
  // lists
  html = html.replace(/^(?:-\s+.*\n?)+/gm, m=>'<ul>'+m.trim().split(/\n/).map(li=>'<li>'+li.replace(/^-\s+/,'')+'</li>').join('')+'</ul>');
  // blockquote
  html = html.replace(/^(>\s+.*)$/gm, m=>'<blockquote>'+m.replace(/^>\s+/,'')+'</blockquote>');
  // paragraphs
  html = html.replace(/(^|\n)([^<\n][^\n]*)/g, (m,br,txt)=>{
    if(/^<h\d|<ul>|<blockquote>|<pre/.test(txt)) return m;
    return `${br}<p>${txt}</p>`;
  });
  return html;
}