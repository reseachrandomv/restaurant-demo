const WA='9600000000'; // DEMO placeholder number — replace with the restaurant's real WhatsApp
const EMAIL='hello@kandutable.example'; // DEMO placeholder
const wa=m=>`https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
const MENU={Breakfast:[['Mas huni & roshi','Smoked tuna, coconut, onion, chilli, warm flatbread',95],['Kulhi boakiba','Spiced tuna cake, curry leaf, lime',55],['Island eggs','Two eggs, roshi, sambol, grilled tomato',85],['Fruit & yoghurt','Papaya, mango, passion fruit, honey',70]],
Mains:[['Grilled reef fish','Whole catch of the day, coconut, curry leaf, rice',240],['Mas riha','Tuna curry, coconut milk, rice & papadam',165],['Garudhiya','Clear fish broth, rice, lime, chilli, onion',120],['Chicken curry','Slow-cooked, roshi or rice',150],['Garden kottu','Chopped roshi, vegetables, egg',115]],
'Short eats':[['Gulha','Fried tuna dumplings, 4 pcs',45],['Bajiya','Crisp pastry, tuna & coconut, 3 pcs',45],['Masroshi','Baked roshi parcel, tuna filling',40]],
Coffee:[['Coconut iced latte','Double shot, coconut milk',65],['Flat white','',50],['Kalhu sai','Black tea, sugar on the side',25],['Fresh lime soda','Sweet or salty',40]],
Desserts:[['Passion fruit cake','Sponge, cream, fresh passion fruit',70],['Bondibai','Coconut rice pudding, cardamom',55]]};
const tabs=document.querySelector('.tabs'),items=document.querySelector('.items');
function show(c){tabs.querySelectorAll('.tab').forEach(t=>t.setAttribute('aria-selected',t.textContent===c));
items.innerHTML=MENU[c].map(([n,d,p],i)=>`<div class="item" style="animation-delay:${i*50}ms"><div><h3>${n}</h3><p>${d}</p></div><span class="price">MVR ${p}</span><a class="add" target="_blank" rel="noopener" href="${wa(`Hi Kandu Table, I'd like to order: ${n} (MVR ${p})`)}">Order</a></div>`).join('')}
Object.keys(MENU).forEach(c=>{const b=document.createElement('button');b.className='tab';b.role='tab';b.textContent=c;b.onclick=()=>show(c);tabs.append(b)});show('Breakfast');
document.querySelectorAll('a.wa').forEach(a=>{a.href=wa(a.dataset.msg);a.target='_blank';a.rel='noopener'});
const nav=document.querySelector('.nav'),bg=document.querySelector('.burger');
bg.onclick=()=>{bg.setAttribute('aria-expanded',nav.classList.toggle('open'))};document.querySelectorAll('.links a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
const onS=()=>nav.classList.toggle('solid',scrollY>40);addEventListener('scroll',onS,{passive:true});onS();
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('on')),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
// open/closed today (Maldives time, UTC+5)
const t=new Date(Date.now()+(new Date().getTimezoneOffset()+300)*6e4),d=t.getDay(),m=t.getHours()*60+t.getMinutes();
const [o,cl]=d===5?[840,1410]:[390,1380];document.getElementById('today').innerHTML=(m>=o&&m<cl)?'<i></i>Open now':'Closed now — see you soon';
const f=document.getElementById('form');f.date.min=new Date().toISOString().slice(0,10);
f.querySelectorAll('button').forEach(b=>b.onclick=e=>{e.preventDefault();if(!f.reportValidity())return;const v=Object.fromEntries(new FormData(f));
const msg=`Table request — Kandu Table\nName: ${v.name}\nDate: ${v.date} at ${v.time}\nGuests: ${v.guests}\nPhone: ${v.phone||'-'}\nNotes: ${v.notes||'-'}`;
location.href=b.dataset.via==='wa'?wa(msg):`mailto:${EMAIL}?subject=${encodeURIComponent('Table request')}&body=${encodeURIComponent(msg)}`});
