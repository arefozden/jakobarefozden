(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const zones = [
    ['Europe/Oslo','Oslo','Norway'],['Europe/Istanbul','Istanbul','Türkiye'],
    ['Europe/London','London','United Kingdom'],['America/New_York','New York','United States'],
    ['Europe/Stockholm','Stockholm','Sweden'],['Europe/Copenhagen','Copenhagen','Denmark'],
    ['Europe/Berlin','Berlin','Germany'],['Europe/Paris','Paris','France'],
    ['Europe/Amsterdam','Amsterdam','Netherlands'],['Europe/Zurich','Zurich','Switzerland'],
    ['Europe/Madrid','Madrid','Spain'],['Europe/Rome','Rome','Italy'],
    ['Asia/Dubai','Dubai','United Arab Emirates'],['Asia/Riyadh','Riyadh','Saudi Arabia'],
    ['Asia/Tokyo','Tokyo','Japan'],['Asia/Shanghai','Shanghai','China'],
    ['Asia/Kolkata','Mumbai','India'],['Asia/Singapore','Singapore','Singapore'],
    ['Australia/Sydney','Sydney','Australia'],['Pacific/Auckland','Auckland','New Zealand'],
    ['America/Los_Angeles','Los Angeles','United States'],['America/Chicago','Chicago','United States'],
    ['America/Toronto','Toronto','Canada'],['America/Sao_Paulo','São Paulo','Brazil'],
    ['Africa/Cairo','Cairo','Egypt'],['Africa/Johannesburg','Johannesburg','South Africa']
  ];
  const lookup = Object.fromEntries(zones.map(z => [z[0],z]));
  const defaults = ['Europe/Oslo','Europe/Istanbul','Europe/London','America/New_York'];
  let selected;
  try { const stored=JSON.parse(localStorage.getItem('ja-world-clocks')); selected=Array.isArray(stored)?[...new Set(stored.filter(z=>lookup[z]))]:defaults.slice(); } catch { selected=defaults.slice(); }
  if(!selected.length) selected=defaults.slice();
  const fmt = (zone, opts) => new Intl.DateTimeFormat('en-GB',{timeZone:zone,...opts});
  const timeFmt = zone => fmt(zone,{hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
  const dateFmt = zone => fmt(zone,{weekday:'long',day:'numeric',month:'short',year:'numeric'});
  const partsFmt = zone => fmt(zone,{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
  const parts = (date,zone) => Object.fromEntries(partsFmt(zone).formatToParts(date).filter(p=>p.type!=='literal').map(p=>[p.type,Number(p.value)]));
  const offset = (date,zone) => { const p=parts(date,zone);return (Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)-Math.floor(date.getTime()/1000)*1000)/60000; };
  const offsetLabel = (date,zone) => { const m=offset(date,zone);return 'UTC'+(m<0?'−':'+')+String(Math.floor(Math.abs(m)/60)).padStart(2,'0')+':'+String(Math.abs(m)%60).padStart(2,'0'); };
  const escapeHtml = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const option = z => `<option value="${escapeHtml(z[0])}">${escapeHtml(z[1])} — ${escapeHtml(z[2])}</option>`;
  $('zone-select').innerHTML = zones.map(option).join('');
  function persist(){try{localStorage.setItem('ja-world-clocks',JSON.stringify(selected));}catch{}}
  function render(){
    $('clock-grid').innerHTML=selected.map(zone=>{
      const z=lookup[zone];return `<article class="card clock-tile" data-zone="${escapeHtml(zone)}"><button type="button" class="clock-remove" data-remove="${escapeHtml(zone)}" aria-label="Remove ${escapeHtml(z[1])}">×</button><div class="meta">${escapeHtml(z[2])}</div><h2>${escapeHtml(z[1])}</h2><div class="clock-time" data-time>--:--:--</div><div class="clock-date" data-date>Loading…</div><div class="clock-offset" data-offset></div></article>`;
    }).join('');
    const old=$('meeting-zone').value;
    $('meeting-zone').innerHTML=selected.map(z=>option(lookup[z])).join('');
    $('meeting-zone').value=selected.includes(old)?old:selected[0];
    update();
    $('meeting-results').replaceChildren();$('meeting-status').textContent='';
  }
  function update(){const now=new Date();document.querySelectorAll('.clock-tile').forEach(tile=>{
    const zone=tile.dataset.zone;
    tile.querySelector('[data-time]').textContent=timeFmt(zone).format(now);
    tile.querySelector('[data-date]').textContent=dateFmt(zone).format(now);
    tile.querySelector('[data-offset]').textContent=offsetLabel(now,zone);
  });}
  $('add-zone').addEventListener('click',()=>{const z=$('zone-select').value;if(!selected.includes(z)){selected.push(z);persist();render();}});
  $('reset-zones').addEventListener('click',()=>{selected=defaults.slice();persist();render();});
  $('clock-grid').addEventListener('click',event=>{const btn=event.target.closest('[data-remove]');if(!btn)return;if(selected.length===1){$('meeting-status').textContent='Keep at least one city.';return;}selected=selected.filter(z=>z!==btn.dataset.remove);persist();render();});
  // Resolve a wall-clock time to UTC by testing candidate offsets. Detect DST gaps/overlaps.
  function localToUtc(value,zone){
    const match=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
    if(!match)return {error:'Choose a valid date and time.'};
    const [y,m,d,h,min]=match.slice(1).map(Number);
    const naive=Date.UTC(y,m-1,d,h,min);
    if(!Number.isFinite(naive)||new Date(naive).getUTCFullYear()!==y)return {error:'Invalid date.'};
    const offsets=new Set([-36,-12,0,12,36].map(hrs=>offset(new Date(naive+hrs*3600000),zone)));
    const matches=[];
    for(const off of offsets){const candidate=new Date(naive-off*60000);const p=parts(candidate,zone);if(p.year===y&&p.month===m&&p.day===d&&p.hour===h&&p.minute===min&&!matches.some(x=>x.getTime()===candidate.getTime()))matches.push(candidate);}
    if(!matches.length)return {error:'This local time does not exist because of a daylight saving time change. Choose another time.'};
    matches.sort((a,b)=>a-b);
    return {date:matches[0],ambiguous:matches.length>1};
  }
  function compare(){
    const status=$('meeting-status');status.classList.remove('error');
    const parsed=localToUtc($('meeting-datetime').value,$('meeting-zone').value);
    if(parsed.error){status.textContent=parsed.error;status.classList.add('error');$('meeting-results').replaceChildren();return;}
    status.textContent=parsed.ambiguous?'This time occurs twice during the daylight saving transition; showing the first occurrence.':'All times refer to the same moment.';
    $('meeting-results').innerHTML=selected.map(zone=>`<div class="meeting-result"><div class="meta">${escapeHtml(lookup[zone][1])}</div><strong>${escapeHtml(fmt(zone,{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(parsed.date))}</strong><small>${escapeHtml(offsetLabel(parsed.date,zone))}</small></div>`).join('');
  }
  $('meeting-convert').addEventListener('click',compare);
  const now=new Date();const oslo=parts(now,'Europe/Oslo');
  const pad=n=>String(n).padStart(2,'0');
  $('meeting-datetime').value=`${oslo.year}-${pad(oslo.month)}-${pad(oslo.day)}T${pad(oslo.hour)}:${pad(oslo.minute)}`;
  render();compare();setInterval(update,1000);
})();
