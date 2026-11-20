(() => {
  'use strict';
  const form = document.querySelector('#location-form');
  const status = document.querySelector('#status');
  const results = document.querySelector('#results');
  const button = document.querySelector('#load-button');
  const countrySelect = document.querySelector('#country');
  const citySelect = document.querySelector('#city');
  const cityNote = document.querySelector('#city-note');
  const fallbackCities = {
    Norway:['Oslo','Bergen','Trondheim','Stavanger','Tromsø','Lillestrøm','Lørenskog','Drammen','Kristiansand','Fredrikstad','Sandnes','Bodø','Ålesund','Tønsberg','Skien','Hamar','Molde','Alta','Narvik'],
    Turkey:['İstanbul','Ankara','İzmir','Bursa','Antalya','Konya','Adana','Gaziantep','Kayseri','Trabzon','Samsun','Diyarbakır','Erzurum','Eskişehir'],
    Sweden:['Stockholm','Gothenburg','Malmö','Uppsala','Västerås','Örebro','Linköping','Helsingborg'],
    Denmark:['Copenhagen','Aarhus','Odense','Aalborg','Esbjerg','Randers'],
    Germany:['Berlin','Hamburg','Munich','Cologne','Frankfurt','Stuttgart','Düsseldorf','Dortmund'],
    'United Kingdom':['London','Birmingham','Manchester','Leeds','Glasgow','Edinburgh','Liverpool','Bristol'],
    'United States':['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Francisco','Seattle','Boston']
  };
  let cityRequest = 0;
  function setCities(items, preferred) {
    const names = [...new Set(items.map(s => String(s).trim()).filter(Boolean))]
      .sort((a,b) => a.localeCompare(b,undefined,{sensitivity:'base'}));
    citySelect.replaceChildren(...names.map(name => new Option(name,name)));
    citySelect.value = names.includes(preferred) ? preferred : (names.includes('Oslo') && countrySelect.value === 'Norway' ? 'Oslo' : names[0] || '');
    citySelect.disabled = !names.length;
  }
  async function updateCities(preferred) {
    const country = countrySelect.value;
    const request = ++cityRequest;
    setCities(fallbackCities[country] || [],preferred);
    cityNote.textContent = 'Loading more cities…';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(),6500);
      let response;
      try {
        response = await fetch('https://countriesnow.space/api/v0.1/countries/cities',{
          method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({country}),signal:controller.signal
        });
      } finally { clearTimeout(timeout); }
      if(!response.ok) throw new Error('City service unavailable');
      const payload = await response.json();
      if(payload.error || !Array.isArray(payload.data)) throw new Error('Invalid city list');
      if(request !== cityRequest) return;
      const chosen = citySelect.value;
      setCities([...(fallbackCities[country] || []),...payload.data],preferred || chosen);
      cityNote.textContent = `${citySelect.options.length} cities available`;
    } catch (_) {
      if(request === cityRequest) cityNote.textContent = 'Showing popular cities (full list unavailable)';
    }
  }
  countrySelect.addEventListener('change', () => {
    updateCities(countrySelect.value === 'Norway' ? 'Oslo' : undefined);
  });
  const prayers = [['Fajr','Fajr'],['Sunrise','Sunrise'],['Dhuhr','Dhuhr'],['Asr','Asr'],['Maghrib','Maghrib'],['Isha','Isha']];
  const daily = prayers.filter(([key]) => key !== 'Sunrise');
  let current = null;
  let timer = null;
  const two = value => String(value).padStart(2,'0');
  function localParts(date, timezone) {
    const parts = new Intl.DateTimeFormat('en-GB',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date);
    return Object.fromEntries(parts.filter(p=>p.type!=='literal').map(p=>[p.type,Number(p.value)]));
  }
  function minutes(value) {
    const match = String(value||'').match(/^(\d{1,2}):(\d{2})/);
    return match ? Number(match[1])*60+Number(match[2]) : NaN;
  }
  function tick() {
    if (!current) return;
    const now = localParts(new Date(),current.timezone);
    const today = `${now.year}-${two(now.month)}-${two(now.day)}`;
    if (today !== current.day) {
      document.querySelector('#next-name').textContent='New day';
      document.querySelector('#countdown').textContent='--:--:--';
      document.querySelector('#next-detail').textContent='Refresh the page for today’s schedule';
      return;
    }
    const secondsNow = now.hour*3600+now.minute*60+now.second;
    let next = daily.map(([key,name])=>({key,name,seconds:minutes(current.timings[key])*60})).find(item=>Number.isFinite(item.seconds)&&item.seconds>secondsNow);
    let remaining;
    if(next) remaining=next.seconds-secondsNow;
    else {
      next={key:'Fajr',name:'Fajr (tomorrow)'};
      remaining=86400-secondsNow+minutes(current.timings.Fajr)*60;
    }
    document.querySelector('#next-name').textContent=next.name;
    document.querySelector('#countdown').textContent=`${two(Math.floor(remaining/3600))}:${two(Math.floor(remaining%3600/60))}:${two(remaining%60)}`;
    document.querySelector('#next-detail').textContent=next.key==='Fajr'&&next.name.includes('tomorrow')?'Approximate countdown using today’s Fajr time':`At ${current.timings[next.key].slice(0,5)} · ${current.timezone}`;
    document.querySelectorAll('.prayer-time').forEach(el=>el.classList.toggle('active',el.dataset.prayer===next.key));
  }
  async function load(event) {
    if(event) event.preventDefault();
    const city=citySelect.value.trim();
    const country=document.querySelector('#country').value;
    const method=document.querySelector('#method').value;
    if(!city)return;
    button.disabled=true;status.classList.remove('error');status.textContent='Loading prayer times…';
    try {
      const url=new URL('https://api.aladhan.com/v1/timingsByCity');
      url.search=new URLSearchParams({city,country,method}).toString();
      const response=await fetch(url,{headers:{Accept:'application/json'}});
      if(!response.ok)throw new Error('Service unavailable');
      const json=await response.json();
      if(json.code!==200||!json.data?.timings||!json.data?.meta?.timezone)throw new Error('No prayer times found for this location');
      const data=json.data;
      const timezone=data.meta.timezone;
      const now=localParts(new Date(),timezone);
      const apiDay=data.date?.gregorian?.date;
      const requestedDay=`${two(now.day)}-${two(now.month)}-${now.year}`;
      // The API returns today's schedule; warn if the browser and selected city are on different dates.
      current={timings:data.timings,timezone,day:`${now.year}-${two(now.month)}-${two(now.day)}`};
      document.querySelector('#place-name').textContent=`${city}, ${country}`;
      document.querySelector('#date-label').textContent=data.date?.readable||requestedDay;
      document.querySelector('#hijri-label').textContent=data.date?.hijri?`${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year} AH`:'';
      const list=document.querySelector('#timings-list');list.replaceChildren();
      for(const [key,name] of prayers){
        const item=document.createElement('div');item.className='prayer-time';item.dataset.prayer=key;
        const label=document.createElement('div');label.className='name';label.textContent=name;
        const time=document.createElement('div');time.className='time';time.textContent=String(data.timings[key]||'—').slice(0,5);
        item.append(label,time);list.append(item);
      }
      results.hidden=false;
      status.textContent=apiDay&&apiDay!==requestedDay?'Location and browser may be on different calendar days; verify times with your local mosque.':'';
      clearInterval(timer);tick();timer=setInterval(tick,1000);
      try{localStorage.setItem('prayer-preferences',JSON.stringify({city,country,method}));}catch(_){}
    }catch(error){status.classList.add('error');status.textContent='Could not load prayer times. Check the city, internet connection or try again later.';results.hidden=true;current=null;clearInterval(timer);}
    finally{button.disabled=false;}
  }
  let initialCity = 'Oslo';
  try {
    const saved=JSON.parse(localStorage.getItem('prayer-preferences')||'null');
    if(saved){
      if([...countrySelect.options].some(o=>o.value===saved.country)) countrySelect.value=saved.country;
      if(typeof saved.city==='string') initialCity=saved.city;
      if([...document.querySelector('#method').options].some(o=>o.value===saved.method))document.querySelector('#method').value=saved.method;
    }
  } catch (_) {}
  setCities(fallbackCities[countrySelect.value] || [],initialCity);
  updateCities(initialCity);
  form.addEventListener('submit',load);
  load();
})();
