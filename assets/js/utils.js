// utils.js: small helpers
export function $(sel,root=document){ return root.querySelector(sel); }
export function $all(sel,root=document){ return Array.from(root.querySelectorAll(sel)); }
export function debounce(fn,ms=250){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); } }
export function formatDate(iso){ try{ return new Date(iso).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'2-digit'});}catch{return iso;}}