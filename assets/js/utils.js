// utils.js: small helpers (global)
function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
function debounce(fn, ms=250){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); } }
function formatDate(iso){
  try{ return new Date(iso).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'2-digit'});}
  catch{return iso;}
}

// export globally
window.$ = $;
window.$all = $all;
window.debounce = debounce;
window.formatDate = formatDate;
