// ===================== FACCIONES Y PIEZAS ILUSTRADAS =====================
// Todas las figuras son dibujos SVG originales (viewBox 0-100). Cabeza estándar en (50,30) r=7.5;
// pies en y=86 sobre un pedestal con el color de la facción.
const O = '#17130f', SKIN = '#efcfae';
const st  = (w=1.4) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const pth = (d,f,w) => `<path d="${d}" fill="${f}" ${st(w)}/>`;
const cir = (cx,cy,r,f,w) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${st(w)}/>`;
const ell = (cx,cy,rx,ry,f,w) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${st(w)}/>`;
const ln  = (d,c,w) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const dot = (cx,cy,r,f) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}"/>`;
function star(cx,cy,R,fill,stroke,sw=0.6){
  const p=[]; for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5, r=i%2?R*0.42:R; p.push((cx+r*Math.cos(a)).toFixed(2)+','+(cy+r*Math.sin(a)).toFixed(2));}
  return `<polygon points="${p.join(' ')}" fill="${fill}" stroke="${stroke||'none'}" stroke-width="${sw}" stroke-linejoin="round"/>`;
}

// ---------- Tocados (para la cabeza estándar) ----------
const HAT = {
  shako: () => pth('M42.6 25 L41.6 12.5 H58.4 L57.4 25 Z','#151515')
      + pth('M50 15 L53.5 18.5 L50 22 L46.5 18.5 Z','#d4af37',0.8)
      + cir(50,10.6,2.6,'#c8102e',1)
      + pth('M41.5 24.5 Q50 29 58.5 24.5 L58 26.5 Q50 30 42 26.5 Z','#151515',1),
  bearskin: () => pth('M41 27 Q37.5 12 43 5.5 Q50 1.5 57 5.5 Q62.5 12 59 27 Z','#1c1a18')
      + ln('M44.5 10 Q45.5 16 44.5 22 M50 6 V14 M55.5 10 Q54.5 16 55.5 22','#45403a',1)
      + pth('M42 20 Q36.5 9 40.5 2.5 Q43.5 10 44.5 19 Z','#c8102e',1)
      + pth('M44 26.5 Q50 21 56 26.5 Z','#d4af37',0.8),
  bicorne: () => pth('M25 25 Q28 13.5 50 12 Q72 13.5 75 25 Q50 19.5 25 25 Z','#151515')
      + cir(65,18.5,3.2,'#1f3a8a',0.8) + dot(65,18.5,2.1,'#fff') + dot(65,18.5,1,'#c8102e'),
  marshal: () => pth('M23 25 Q27 13 50 11.5 Q73 13 77 25 Q50 19 23 25 Z','#151515')
      + ln('M26.5 21.5 Q30 13.2 50 11.8 Q70 13.2 73.5 21.5','#fbfbf6',3.4)
      + ln('M25.5 24.3 Q50 19 74.5 24.3','#d4af37',1.4)
      + cir(66,18.5,2.6,'#1f3a8a',0.8) + dot(66,18.5,1.4,'#c8102e'),
  cuirassier: () => pth('M50 7 Q63 6 67 20 Q60 13 52 13 Z','#151515',1)
      + pth('M41 26 Q41 14 50 13 Q59 14 59 26 Z','#c9a24a')
      + pth('M44 13.5 Q50 4.5 56 13.5 Z','#c9a24a',1)
      + ln('M41.5 25 H58.5','#7d5e18',2),
  mongolHelm: (c='#9a9a96') => pth('M39 24 L35.5 37 L42.5 35 Z','#6b4a2a',1) + pth('M61 24 L64.5 37 L57.5 35 Z','#6b4a2a',1)
      + pth('M41 25.5 Q41 13 50 12 Q59 13 59 25.5 Z',c)
      + ln('M50 12 V4.5','#3b2a12',1.8)
      + pth('M50 5 Q46 9.5 47 13 Q50 10.5 53 13 Q54 9.5 50 5 Z','#c8102e',0.8)
      + pth('M40 23.5 H60 V27 H40 Z','#6b4a2a',1),
  khanHat: () => pth('M42.5 22 Q44 8 50 7 Q56 8 57.5 22 Z','#b0302a')
      + ln('M50 8 V21 M46.3 10.5 L45.3 21 M53.7 10.5 L54.7 21','#e0b040',1)
      + cir(50,6.5,2,'#e0b040',0.8)
      + pth('M37.5 27 Q37 19.5 50 19.5 Q63 19.5 62.5 27 Q50 29.5 37.5 27 Z','#7a5434')
      + ln('M40.5 23 L41.5 26.3 M44.5 21.6 L45.2 25.6 M49.5 21 L49.7 25.3 M54.5 21.6 L54.3 25.6 M59 22.6 L58.4 26.2','#4e321b',1),
  shaman: () => ln('M42 24 L33 7 M45 23 L40 4 M48 22.5 L46.5 2 M52 22.5 L53.5 2 M55 23 L60 4 M58 24 L67 7','#3b2a12',2.4)
      + ln('M42 24 L35 10 M48 22.5 L47.2 5 M55 23 L58.8 7','#efe6d2',1)
      + pth('M41 22.5 H59 V27 H41 Z','#8a2a1a',1)
      + ln('M43 27 V33.5 M45.8 27 V34.5 M48.6 27 V35 M51.4 27 V35 M54.2 27 V34.5 M57 27 V33.5','#3b2a12',1.1),
  ssh40: () => pth('M39.5 27.5 Q39.5 13 50 12.8 Q60.5 13 60.5 27.5 L62 29 Q50 26.5 38 29 Z','#4d5a32')
      + star(50,19.5,3.8,'#d32f2f',O,0.5),
  budenovka: () => pth('M39 28 Q40 14 50 4.5 Q60 14 61 28 Z','#7b7f5c')
      + pth('M39.3 26 L36 34 L41.5 33 Z','#7b7f5c',1) + pth('M60.7 26 L64 34 L58.5 33 Z','#7b7f5c',1)
      + star(50,18.5,5.8,'#d32f2f',O,0.6),
  furazhka: (gold) => pth('M36.5 22 Q50 12.5 63.5 22 L60.5 26 H39.5 Z','#6b6b45')
      + pth('M39.6 22.2 H60.4 V26 H39.6 Z','#c62828',1)
      + pth('M39.5 26 Q50 30.5 60.5 26 L59.5 25.4 Q50 28.5 40.5 25.4 Z','#151515',1)
      + (gold ? ln('M41 27.4 Q50 31 59 27.4','#e0b040',1.3) : '')
      + star(50,19.2,2.8,'#d32f2f',gold?'#e0b040':O,0.6),
  stahlhelm: () => pth('M38.5 29 Q37.5 12.5 50 12 Q62.5 12.5 61.5 29 L65.5 31.5 Q50 27.5 34.5 31.5 Z','#5f665a')
      + ln('M42 18 Q50 14.5 58 18','#7d8576',1.2),
  schirm: (gold) => pth('M35.5 20 Q37 13 50 9.5 Q63 13 64.5 20 L60.5 25.5 H39.5 Z','#6f7568')
      + pth('M39.6 21.5 H60.4 V25.6 H39.6 Z','#2f3a2c',1)
      + pth('M39.5 25.6 Q50 30 60.5 25.6 L59.5 25 Q50 28.2 40.5 25 Z','#151515',1)
      + ln('M41 25.4 Q50 27.6 59 25.4', gold?'#e0b040':'#c9ccd0', 1.1)
      + cir(50,23.4,1.5, gold?'#e0b040':'#c9ccd0',0.5),
};

// ---------- Accesorios ----------
const rifle = (x,wood,bayonet) => pth(`M${x-1.7} 84 L${x+1.7} 84 L${x+1.2} 50 L${x-1.2} 50 Z`,wood,1)
  + ln(`M${x} 50 V17`,'#4b4f55',1.7) + (bayonet ? ln(`M${x} 17 V5`,'#c9ccd0',1.1) : '');
const spear = x => ln(`M${x} 85 V10`,'#6b4a2a',1.8) + pth(`M${x} 1.5 L${x+2.3} 10 L${x-2.3} 10 Z`,'#c9ccd0',0.8)
  + pth(`M${x-2} 10.5 Q${x} 16 ${x+2} 10.5 Z`,'#c8102e',0.7);
const epaul = c => ell(38.5,41.5,4.3,2.2,c,1) + ell(61.5,41.5,4.3,2.2,c,1);
const boards = c => pth('M36 40 L42 39.5 L42 42 L36 42.6 Z',c,0.7) + pth('M64 40 L58 39.5 L58 42 L64 42.6 Z',c,0.7);
const baton = (c,cap) => pth('M71.2 24.5 L75.6 13.5 L78.6 14.9 L74.3 25.8 Z',c,1) + cir(77.1,14.1,1.8,cap,0.7);
const beard = () => pth('M44.2 32.8 Q50 46 55.8 32.8 Q53 36.8 50 36.8 Q47 36.8 44.2 32.8 Z','#2a1d12',1)
  + ln('M45.5 34.2 Q47 33 50 33.4 Q53 33 54.5 34.2','#2a1d12',1.3);
const medals = (rows) => { let s=''; const cols=['#c62828','#1565c0','#e0b040','#2e7d32','#f5f5f5'];
  for(let r=0;r<rows;r++) for(let c=0;c<3;c++) s += `<rect x="${40.5+c*3.1}" y="${44+r*2.6}" width="2.8" height="2.1" fill="${cols[(r*3+c)%5]}" stroke="${O}" stroke-width=".4"/>`;
  return s; };

// ---------- Figura de pie ----------
function figure(o){
  const sk = o.skin || SKIN, sl = o.sleeve || o.coat;
  let s = o.back || '';
  if (!o.longCoat){
    s += pth('M40.5 62 H49 L48.6 86 H41.2 Z', o.trousers) + pth('M51 62 H59.5 L58.8 86 H51.4 Z', o.trousers);
    const bt = o.bootTop || 75;
    if (o.boots) s += pth(`M41 ${bt} H48.8 L48.6 86 H41.2 Z`,o.boots) + pth(`M51.2 ${bt} H59 L58.8 86 H51.4 Z`,o.boots);
  } else {
    s += pth('M42 78 H48.8 L48.6 86 H41.6 Z',o.boots||'#151515') + pth('M51.2 78 H58 L58.4 86 H51.4 Z',o.boots||'#151515');
  }
  s += pth('M38.5 41 Q34 42 32.5 45 L31.5 62 H36.5 L37.5 49 Z', sl);
  if (!o.noLeftHand) s += cir(34,63.5,2.6,sk,1);
  s += o.longCoat ? pth('M38 40 Q50 36.5 62 40 L66 81 Q50 84 34 81 Z', o.coat)
                  : pth('M38 40 Q50 36.5 62 40 L61.5 64 Q50 65.5 38.5 64 Z', o.coat);
  s += o.torso || '';
  const ra = o.rightArm || 'down';
  if (ra==='down')   s += pth('M61.5 41 Q66 42 67.5 45 L68.5 62 H63.5 L62.5 49 Z', sl) + cir(66.5,63.5,2.6,sk,1);
  if (ra==='raised') s += pth('M61 41 Q65 40 67 38 L71 26 L75.5 27.5 L71.5 41 Q68 46 62 48 Z', sl) + cir(73.5,25.2,2.7,sk,1);
  if (ra==='chest')  s += pth('M61.5 41 Q66 42 67 46 L65 53 L54 53 L54 49 L62 48 Z', sl) + cir(54,51,2.3,sk,1);
  s += o.arms || '';
  s += pth('M47 35 H53 V40 H47 Z', sk, 1);
  s += cir(50,30,7.5,sk,1.4) + dot(47.3,30.3,0.95,O) + dot(52.7,30.3,0.95,O);
  s += o.face || '';
  s += o.hat || '';
  s += o.front || '';
  const k = o.scale || 1;
  return `<g transform="translate(50 86) scale(${k}) translate(-50 -86)">${s}</g>`;
}

// ---------- Jinete ----------
function horseman(o){
  const sk = SKIN, hd = o.horseDark || o.horse;
  let s = o.back || '';
  s += pth('M73 53 Q88 58 85 78 Q80 66 71 59 Z', o.mane, 1.2);
  s += pth('M63 64 L66 85 H70.5 L68.5 62 Z', hd, 1.2) + pth('M40 62 L35.5 85 H40 L44.5 63 Z', hd, 1.2);
  s += ell(56,58,20,11,o.horse,1.4);
  s += pth('M69 62 L73.5 85 H78 L75 59 Z', o.horse, 1.2) + pth('M45 64 L43.5 85 H48 L50.5 63 Z', o.horse, 1.2);
  s += pth('M35.3 82 H40.2 V85.5 H35.3 Z M43.5 82 H48.2 V85.5 H43.5 Z M66 82 H70.6 V85.5 H66 Z M73.4 82 H78.2 V85.5 H73.4 Z', '#1d1a17', 0.8);
  s += pth('M39 57 L30 37 Q31 30 37 29 L49 50 Z', o.horse, 1.4);
  s += pth('M31 31 Q33 26 37 27 L38 31 Q31 41 23 47.5 Q18 48.5 18 44.5 Q22 38 31 31 Z', o.horse, 1.4);
  s += pth('M34 28 L35 20.5 L38.2 28 Z', o.horse, 1);
  s += ln('M37.5 28 Q43 37 49.5 49', o.mane, 3.6);
  s += dot(29.5,34,1.2,O) + ln('M21 44 L27 38 L33 36','#3b2a12',0.9);
  s += pth('M49 47 H67 L68 61 Q58 64 48 61 Z', o.cloth, 1.2) + ln('M49.6 59.3 Q58 62 67.6 59.3', o.clothTrim, 1.4);
  // jinete
  s += pth('M53 45 L55.5 58 L60 58 L58 45 Z', o.trousers, 1.1) + pth('M55 56 L55 68 H60 L60 56 Z', o.boots, 1.1);
  s += pth('M51 31 Q56 29 61 31 L60 47.5 H52 Z', o.coat, 1.3);
  s += o.torso || '';
  const w = o.weapon || 'saber';
  if (w==='saber'){
    s += pth('M52 33 L45 42 L47.5 44.5 L54.5 37 Z', o.coat, 1.1) + cir(46,43.6,2,sk,0.9);
    s += ln('M67.3 23 Q73 13 78 4','#d9dce0',1.8) + ln('M67.3 23 Q73 13 78 4',O,0.4) + ln('M65 21.5 L70 24.5','#c9a24a',1.6);
    s += pth('M59.5 32 L65.5 23.5 L69 25.5 L62.5 36 Z', o.coat, 1.1) + cir(67.3,23.2,2.1,sk,0.9);
  } else if (w==='bow'){
    s += ln('M37 13 Q28.5 30 37 47','#5a3a1e',2.2) + ln('M37 13 L56.5 29.5 L37 47','#e9e2cf',0.7);
    s += pth('M52 32 L38.5 30 L38.5 33.4 L53 36 Z', o.coat, 1.1) + cir(38,31.6,2,sk,0.9);
    s += pth('M60 32 L57 30.5 L55 33 L59 36 Z', o.coat, 1.1) + cir(56.5,29.8,2,sk,0.9);
    s += ln('M56 29.6 L33 29.8','#5a3a1e',1) + pth('M33 29.8 L35.5 28.6 L35.5 31 Z','#c9ccd0',0.5);
  } else if (w==='lance'){
    s += pth('M52 33 L45 42 L47.5 44.5 L54.5 37 Z', o.coat, 1.1) + cir(46,43.6,2,sk,0.9);
    s += pth('M60.5 33 L63 41 L57 43.5 L56 40.5 L60 39 Z', o.coat, 1.1);
    s += ln('M70 47 L8 14','#7a5230',1.7) + pth('M8 14 L4.5 10 L11 12.2 Z','#d9dce0',0.6)
       + pth('M14 17.2 L22 15 L19.5 21.6 Z','#f3f0e6',0.6) + ln('M15.5 17.6 L20.5 18.6','#b01e2e',1);
    s += cir(57.5,41.6,2,sk,0.9);
  } else { // carabina al hombro y riendas
    s += ln('M50.5 50 L66 16','#4b4f55',1.8) + pth('M49.5 49 L54 51.5 L57.5 43.5 L53 41.5 Z',o.wood||'#6a4426',0.9);
    s += pth('M52 33 L45 42 L47.5 44.5 L54.5 37 Z', o.coat, 1.1) + cir(46,43.6,2,sk,0.9);
    s += pth('M60.5 33 L63 41 L56 44 L55 41 L60 39 Z', o.coat, 1.1) + cir(54.5,42.6,2,sk,0.9);
  }
  s += ln('M46 43.6 L28 37','#3b2a12',0.8);
  s += pth('M54 26 H58 V31 H54 Z', sk, 1) + cir(56,25,5.6,sk,1.2) + dot(53.6,25.2,0.8,O);
  s += `<g transform="translate(56 25) scale(.75) translate(-50 -30)">${o.hat}</g>`;
  return s;
}

// ---------- Máquinas: torres ----------
function cannon(){
  let s = '';
  s += pth('M48 71 L86 83 L84 86 L46 76 Z','#6f4a2a',1.2);
  s += cir(78,82,2.6,'#1d1d1d',0.8) + cir(82.5,82.5,2.6,'#1d1d1d',0.8) + cir(80.2,78.5,2.6,'#1d1d1d',0.8);
  s += cir(45,70,14.5,'#7a5230',1.6) + cir(45,70,11.5,'none',0.8);
  for (let i=0;i<8;i++){ const a=i*Math.PI/4; s += ln(`M45 70 L${(45+11.5*Math.cos(a)).toFixed(1)} ${(70+11.5*Math.sin(a)).toFixed(1)}`,'#4a3018',1.6); }
  s += cir(45,70,3,'#c9a24a',1);
  s += pth('M18 49 L68 55 L69 64 L19 57 Z','#b8913f',1.5);
  s += pth('M14 47.5 L19.5 48.3 L20.5 58 L15 57.3 Z','#a07a2e',1.2);
  s += ln('M32 51 L32.8 59.2 M54 53.6 L54.8 62','#7d5e18',1.4) + cir(69.5,59.7,3,'#a07a2e',1);
  s += `<text x="41" y="58.8" font-size="5" font-family="Cinzel,serif" font-weight="800" fill="#6b4f12" transform="rotate(7 41 57)">N</text>`;
  return s;
}
function trebuchet(){
  let s = '';
  s += pth('M16 80 H84 V85 H16 Z','#6f4a2a',1.2);
  s += pth('M28 80 L47 34 L51 34 L34 80 Z','#7a5230',1.2) + pth('M72 80 L53 34 L49 34 L66 80 Z','#7a5230',1.2);
  s += ln('M38 62 H62','#5a3a1e',2.6);
  s += pth('M14 13 L16.5 10.5 L76 50.5 L73.5 53 Z','#8a6038',1.2);
  s += pth('M66 50 H82 V66 H66 Z','#5a5a52',1.3) + ln('M66 55.3 H82 M66 60.6 H82 M71.3 50 V66 M76.6 50 V66','#3a3a34',0.8);
  s += ln('M74.8 51.5 L74 50','#3b2a12',1.6);
  s += cir(50,37.5,3.2,'#3b2a12',1);
  s += ln('M15 11.5 Q18 26 26 34','#d9caa0',1) + cir(27,35.5,4.2,'#8e8a80',1.1);
  return s;
}
function t34(){
  let s = '';
  s += pth('M13 66 H87 Q92 75 87 84 H13 Q8 75 13 66 Z','#2b2a24',1.5);
  for (const x of [20,33,46,59,72]) s += cir(x+2,75,6.3,'#4f5c2c',1.1) + dot(x+2,75,1.8,'#2b2a24');
  s += cir(84,75,3.5,'#3a3a32',1);
  s += pth('M8 66 L19 55 H80 L90 61 V66 Z','#4f5c2c',1.5);
  s += pth('M33 55 L36.5 43 Q50 38.5 64 42.5 L68 55 Z','#566433',1.5);
  s += pth('M3 45.5 H36 V49.5 H3 Z','#3f4a24',1.2) + pth('M30 43.5 H37 V51.5 H30 Z','#4f5c2c',1.1);
  s += star(53,48.5,4.6,'#d32f2f',O,0.5);
  s += ln('M22 60 H76','#3f4a24',1) + cir(78,58.5,1.6,'#3f4a24',0.6);
  return s;
}
function panzer(){
  let s = '';
  s += pth('M12 68 H88 Q91 76 88 84 H12 Q9 76 12 68 Z','#2b2a26',1.5);
  for (let i=0;i<8;i++){ const x = 18.5 + i*8.9; s += cir(x,77.5,4,'#565b52',1) + dot(x,77.5,1.2,'#2b2a26'); }
  s += cir(15,71,2.4,'#3c3f39',0.8) + cir(85,71,2.4,'#3c3f39',0.8);
  s += pth('M10 68 L12 56 H88 V68 Z','#5d6457',1.5);
  s += pth('M14 56 V50 H38 V56 Z','#5d6457',1.3);
  s += pth('M35 50 L39 37.5 H72 L76 50 Z','#646b5e',1.5) + pth('M62 37.5 V32.5 H71 V37.5 Z','#5d6457',1.1);
  s += pth('M5 41.2 H39 V44.8 H5 Z','#4b5047',1.1) + pth('M1.5 40 H6 V46 H1.5 Z','#3c3f39',1);
  s += pth('M58 58.5 H62 V54.5 H66 V58.5 H70 V62.5 H66 V66.5 H62 V62.5 H58 Z','#fff',0.8)
     + pth('M59.4 59.6 H63 V56 H65 V59.6 H68.6 V61.4 H65 V65 H63 V61.4 H59.4 Z','#151515',0);
  return s;
}

// ---------- Facciones ----------
const FACTIONS = {
  napoleon: {
    name:'Grande Armée', era:'Francia napoleónica, c. 1805',
    blurb:'La Grande Armée de Napoleón dominó Europa de Austerlitz a Wagram gracias a sus cuerpos de ejército móviles y su artillería masiva.',
    fill:'#1f3a8a', base:'#1f3a8a', baseDark:'#13255c', rim:'#d4af37',
    names:{K:'Emperador Napoleón',Q:'Mariscal del Imperio',R:'Cañón de 12 libras',B:'Abanderado de la Guardia',N:'Coracero',P:'Fusilero de línea'},
    draw:{
      P: () => figure({scale:.8, coat:'#1d3b8b', trousers:'#f3f0e6', boots:'#1a1a1a', bootTop:73, hat:HAT.shako(),
            back: rifle(70.5,'#7a5230',true),
            torso: pth('M45.5 40.5 L50 43 L54.5 40.5 L54 57 H46 Z','#f3f0e6',1) + ln('M39.5 42.5 L60.5 62','#f3f0e6',2.4) + epaul('#c8102e')}),
      B: () => figure({scale:.9, coat:'#1d3b8b', trousers:'#f3f0e6', boots:'#1a1a1a', bootTop:73, hat:HAT.bearskin(),
            back: ln('M70.5 85 V8','#6b4a2a',1.8) + pth('M71 10 H93 V31 H71 Z','#f3f0e6',1.1) + pth('M71 10 H78.3 V31 H71 Z','#1f3a8a',0)
                  + pth('M85.7 10 H93 V31 H85.7 Z','#c8102e',0) + pth('M71 10 H93 V31 H71 Z','none',1.1)
                  + pth('M70.5 1.5 Q67 3.5 66.5 6.5 Q69 5.5 70.5 7.5 Q72 5.5 74.5 6.5 Q74 3.5 70.5 1.5 Z','#d4af37',0.7) + pth('M68.5 7.5 H72.5 V9 H68.5 Z','#d4af37',0.6),
            torso: pth('M45.5 40.5 L50 43 L54.5 40.5 L54 57 H46 Z','#f3f0e6',1) + epaul('#c8102e') + ln('M39.5 42.5 L60.5 62','#f3f0e6',2.4)}),
      Q: () => figure({scale:.95, coat:'#1d3b8b', trousers:'#f3f0e6', boots:'#1a1a1a', bootTop:70, hat:HAT.marshal(), rightArm:'raised',
            torso: ln('M45 40.5 L47 60 M55 40.5 L53 60','#d4af37',2) + ln('M40 46 Q43 50 40 54 M60 46 Q57 50 60 54','#d4af37',1)
                   + pth('M38.5 56.5 H61.5 L61.6 61 H38.4 Z','#f3f0e6',1) + ln('M41 61.5 V64 M44 61.5 V64 M56 61.5 V64 M59 61.5 V64','#d4af37',1.2)
                   + epaul('#d4af37'),
            front: baton('#1f3a8a','#d4af37')}),
      K: () => figure({scale:1, longCoat:true, coat:'#8e8b80', sleeve:'#8e8b80', boots:'#151515', hat:HAT.bicorne(), rightArm:'chest',
            torso: pth('M44.5 40.5 Q50 42.5 55.5 40.5 L57 80.5 Q50 82 43 80.5 Z','#1f5133',1)
                   + pth('M46.6 42 H53.4 L53 61 H47 Z','#f3f0e6',1) + pth('M46.6 61 H53.4 L53.5 79 H46.5 Z','#f3f0e6',0.8)
                   + ln('M44.5 41 L43 80.5 M55.5 41 L57 80.5','#6f6c62',1.4)
                   + star(41.5,48,2.6,'#f3f0e6','#d4af37',0.7) + ell(56.5,42.5,3,1.6,'#c8102e',0.6)}),
      N: () => horseman({horse:'#3b2a1e', horseDark:'#2a1d14', mane:'#111', cloth:'#1d3b8b', clothTrim:'#f3f0e6',
            coat:'#1d3b8b', trousers:'#f3f0e6', boots:'#151515', hat:HAT.cuirassier(), weapon:'saber',
            torso: pth('M51.5 32.5 Q56 31 60.5 32.5 L59.8 44 Q56 46 52.2 44 Z','#c9ccd0',1) + ln('M56 33 V44.5','#8a8d92',0.8)}),
      R: () => cannon()
    }
  },
  mongol: {
    name:'Imperio Mongol', era:'Gengis Kan, c. 1220',
    blurb:'Los tumenes de Gengis Kan combinaban arqueros a caballo, disciplina férrea e ingenieros de asedio capturados en China y Persia.',
    fill:'#8a5a1c', base:'#9a6a22', baseDark:'#5e3f12', rim:'#f0d070',
    names:{K:'Gengis Kan',Q:'General Subotai',R:'Trebuchet de asedio',B:'Chamán',N:'Arquero a caballo',P:'Lancero'},
    draw:{
      P: () => figure({scale:.8, coat:'#7a4a2a', trousers:'#3c3a5a', boots:'#3b2a12', bootTop:72, hat:HAT.mongolHelm(),
            back: spear(70.5),
            torso: ln('M39 46 H61 M39 51 H61','#4e321b',0.9) + pth('M38.6 55.5 H61.4 V59 H38.6 Z','#3b2a12',1),
            front: cir(33,54,8,'#a57d40',1.3) + cir(33,54,5,'none',0.8) + cir(33,54,1.8,'#6b4a2a',0.8)}),
      B: () => figure({scale:.9, longCoat:true, coat:'#3a4f63', sleeve:'#3a4f63', boots:'#3b2a12', hat:HAT.shaman(), rightArm:'raised',
            torso: ln('M38 62 L37 80 M42 62 L41.5 81.5 M46 62 L46 82.5 M54 62 L54 82.5 M58 62 L58.5 81.5 M62 62 L63 80','#c8102e',1.5)
                   + ln('M40 62 L39.5 81 M44 62 L43.8 82 M56 62 L56.2 82 M60 62 L60.8 81','#e0b040',1.2)
                   + pth('M37 59 H63 L63.2 62.5 H36.8 Z','#8a2a1a',1) + cir(50,48,3.4,'#d9dce0',1),
            front: ell(31,51,7,9,'#e3cf9f',1.3) + ln('M31 42.5 V59.5 M24.5 51 H37.5','#8a6a3a',0.8)
                   + ln('M73.5 25 L79 13','#5a3a1e',1.7) + cir(79.3,12.4,1.8,'#c8102e',0.7)}),
      Q: () => figure({scale:.95, coat:'#a8321e', trousers:'#2d2b45', boots:'#3b2a12', bootTop:71,
            hat: HAT.mongolHelm('#c9a24a') + pth('M50 5 Q60 -1 67 9 Q59 6 52 10 Z','#c8102e',0.8),
            back: ln('M70.5 86 V5','#5a3a1e',1.9) + pth('M70.5 0.5 L72.5 5 H68.5 Z','#d9dce0',0.6) + ell(70.5,6.2,2.6,1.1,'#e0b040',0.6)
                  + pth('M70.5 7 Q61 16 63.5 31 Q66.5 24 70.5 31 Q74.5 24 77.5 31 Q80 16 70.5 7 Z','#1c1a18',1)
                  + ln('M66 18 Q65 24 66 29 M75 18 Q76 24 75 29','#4a4540',0.8),
            torso: ln('M39 45 H61 M39 49.5 H61 M39 54 H61','#e0b040',0.9) + pth('M38.6 57 H61.4 V60.5 H38.6 Z','#3b2a12',1)
                   + ell(38.5,42,4.4,2.5,'#c9a24a',1) + ell(61.5,42,4.4,2.5,'#c9a24a',1)}),
      K: () => figure({scale:1, longCoat:true, coat:'#2d4f7a', sleeve:'#2d4f7a', boots:'#3b2a12', hat:HAT.khanHat(), face:beard(),
            torso: ln('M47.5 40 Q53 45 61 44','#e0b040',1.8) + ln('M61 44 L64.5 80','#e0b040',1.8) + ln('M34.5 80.5 Q50 83.5 65.5 80.5','#e0b040',1.8)
                   + pth('M37.6 57 H62.4 L62.7 61.5 H37.3 Z','#e0b040',1) + ln('M41 58 L36 72','#5a3a1e',2.4) + ln('M42.5 56 L39.5 59.5','#e0b040',1.6)
                   + ln('M38 66 Q42 70 38 74 M62 66 Q58 70 62 74','#4a6d9a',1)}),
      N: () => horseman({horse:'#b38a52', horseDark:'#8e6a3a', mane:'#2a1d12', cloth:'#a8321e', clothTrim:'#e0b040',
            coat:'#7a4a2a', trousers:'#3c3a5a', boots:'#3b2a12', hat:HAT.mongolHelm(), weapon:'bow',
            torso: ln('M51.5 37 H60.5 M51.7 42 H60.2','#4e321b',0.8)}),
      R: () => trebuchet()
    }
  },
  soviet: {
    name:'Ejército Rojo', era:'Unión Soviética, 1943',
    blurb:'El Ejército Rojo resistió en Stalingrado y Kursk y avanzó hasta Berlín con oleadas de T-34 y artillería concentrada.',
    fill:'#a31515', base:'#a31515', baseDark:'#6a0d0d', rim:'#f2c94c',
    names:{K:'Mariscal de la Unión Soviética',Q:'General de frente',R:'Tanque T-34',B:'Comisario político',N:'Jinete cosaco',P:'Fusilero'},
    draw:{
      P: () => figure({scale:.8, coat:'#7d7a4e', trousers:'#6d6a44', boots:'#1a1a1a', bootTop:72, hat:HAT.ssh40(),
            back: rifle(70.5,'#6b4423',true),
            torso: ln('M39.5 43 Q49 50 61 61.5','#8f8d7e',4.6) + ln('M39.5 43 Q49 50 61 61.5',O,0.4) + pth('M38.6 56.5 H61.4 V59.5 H38.6 Z','#5a3a1e',1)
                   + ln('M50 41 V48','#5c5a38',1)}),
      B: () => figure({scale:.9, longCoat:true, coat:'#2b2523', sleeve:'#2b2523', boots:'#151515', hat:HAT.furazhka(false), rightArm:'raised',
            torso: ln('M50 40.5 V80','#4a4240',1) + pth('M38 57 H62 L62.2 60 H37.8 Z','#5a3a1e',1) + star(35,51,2.8,'#d32f2f',O,0.4),
            front: pth('M72 23.5 L72.2 16.5 L76 15.5 L76.5 18.8 L74.6 19.4 L74.8 23.8 Z','#2a2a2a',0.8)}),
      Q: () => figure({scale:.95, longCoat:true, coat:'#5f5e4c', sleeve:'#5f5e4c', boots:'#151515', hat:HAT.furazhka(true),
            torso: ln('M50 40.5 V81','#c62828',1.2) + boards('#e0b040') + pth('M42 46 H47 V48 H42 Z','#c62828',0.5) + pth('M42 49 H47 V51 H42 Z','#1565c0',0.5)
                   + star(55,48,2,'#e0b040',O,0.4) + cir(44.5,55,1.6,'#e0b040',0.5) + ln('M37 79 Q50 83 63 79','#c62828',1)}),
      K: () => figure({scale:1, coat:'#6b6b45', trousers:'#2f3550', boots:'#151515', bootTop:69, hat:HAT.furazhka(true),
            torso: medals(4) + star(56.5,46,2.6,'#e0b040',O,0.5) + star(50,41.6,2.9,'#e0b040',O,0.5) + boards('#e0b040')
                   + pth('M38.6 56.5 H61.4 V59.5 H38.6 Z','#5a3a1e',1) + ln('M44.8 63 V69 M55.2 63 V69','#c62828',1)}),
      N: () => horseman({horse:'#8a4b22', horseDark:'#683615', mane:'#2a1a10', cloth:'#a31515', clothTrim:'#f2c94c',
            coat:'#7d7a4e', trousers:'#2f3550', boots:'#151515', hat:HAT.budenovka(), weapon:'saber',
            torso: ln('M51.8 33 L60 46','#5a3a1e',1.4)}),
      R: () => t34()
    }
  },
  wehrmacht: {
    name:'Wehrmacht', era:'Alemania, 1941',
    blurb:'Las fuerzas armadas del Tercer Reich: blitzkrieg de blindados y aviación, frenada en el frente oriental y derrotada en 1945.',
    fill:'#3a3f37', base:'#3a3f37', baseDark:'#20231e', rim:'#c9ccd0',
    names:{K:'Mariscal de campo',Q:'General',R:'Tanque Panzer IV',B:'Oficial de Estado Mayor',N:'Jinete de caballería',P:'Fusilero'},
    draw:{
      P: () => figure({scale:.8, coat:'#5f665a', trousers:'#585e53', boots:'#1a1a1a', bootTop:72, hat:HAT.stahlhelm(),
            back: rifle(70.5,'#6a4426',false),
            torso: ln('M42 41 L45.5 56 M58 41 L54.5 56','#262626',1.4) + pth('M38.6 56 H61.4 V59 H38.6 Z','#1d1d1d',1)
                   + pth('M41 54 H46 V59.5 H41 Z M54 54 H59 V59.5 H54 Z','#2a2a2a',0.8) + pth('M46.5 38.5 L50 42 L53.5 38.5 Z','#2f3a2c',0.8)}),
      B: () => figure({scale:.9, coat:'#646b5e', trousers:'#585e53', boots:'#151515', bootTop:69, hat:HAT.schirm(false),
            torso: ln('M45 40.5 Q50 46 55 40.5','#262626',0.8) + pth('M45.5 45 H49.5 V51 H45.5 Z M50.5 45 H54.5 V51 H50.5 Z','#1d1d1d',0.8)
                   + pth('M38.6 56.5 H61.4 V59.5 H38.6 Z','#4a3020',1) + pth('M35.5 58 H41.5 V67 H35.5 Z','#6a4426',1)
                   + pth('M46.5 38.5 L50 42 L53.5 38.5 Z','#2f3a2c',0.8)}),
      Q: () => figure({scale:.95, longCoat:true, coat:'#6e7468', sleeve:'#6e7468', boots:'#151515', hat:HAT.schirm(true),
            torso: pth('M43.5 40.5 L50 52 L56.5 40.5 L54 40.5 L50 47.5 L46 40.5 Z','#c62828',0.8)
                   + dot(46.5,56,0.9,'#e0b040') + dot(53.5,56,0.9,'#e0b040') + dot(46.8,63,0.9,'#e0b040') + dot(53.2,63,0.9,'#e0b040')
                   + dot(47.2,70,0.9,'#e0b040') + dot(52.8,70,0.9,'#e0b040')
                   + pth('M36 40 L42 39.5 L42 42 L36 42.6 Z','#e0b040',0.6) + pth('M64 40 L58 39.5 L58 42 L64 42.6 Z','#e0b040',0.6)}),
      K: () => figure({scale:1, longCoat:true, coat:'#6e7468', sleeve:'#6e7468', boots:'#151515', hat:HAT.schirm(true), rightArm:'raised',
            torso: pth('M43.5 40.5 L50 52 L56.5 40.5 L54 40.5 L50 47.5 L46 40.5 Z','#c62828',0.8)
                   + dot(46.5,56,0.9,'#e0b040') + dot(53.5,56,0.9,'#e0b040') + dot(46.8,63,0.9,'#e0b040') + dot(53.2,63,0.9,'#e0b040')
                   + dot(47.2,70,0.9,'#e0b040') + dot(52.8,70,0.9,'#e0b040')
                   + pth('M36 40 L42 39.5 L42 42 L36 42.6 Z','#e0b040',0.6) + pth('M64 40 L58 39.5 L58 42 L64 42.6 Z','#e0b040',0.6),
            front: baton('#2a2a2a','#c9ccd0')}),
      N: () => horseman({horse:'#5a3a22', horseDark:'#422a17', mane:'#1a120c', cloth:'#3a3f37', clothTrim:'#c9ccd0',
            coat:'#5f665a', trousers:'#585e53', boots:'#151515', hat:HAT.stahlhelm(), weapon:'carbine',
            torso: pth('M51.4 43 H60.2 V45.5 H51.4 Z','#1d1d1d',0.8)}),
      R: () => panzer()
    }
  }
};

// ---------- Accesorios y tocados de las nuevas civilizaciones ----------
const AZ_SKIN = '#c68b5e';
const macuahuitl = x => pth(`M${x-2} 62 L${x-2.6} 30 Q${x} 26 ${x+2.6} 30 L${x+2} 62 Z`,'#7a5230',1)
  + [33,38,43,48,53,58].map(y => pth(`M${x-2.4} ${y} l-2 1.4 l2 1.4 Z M${x+2.4} ${y} l2 1.4 l-2 1.4 Z`,'#1a1a1a',0.4)).join('')
  + ln(`M${x} 62 V70`,'#5a3a1e',1.6);
const chimalli = (cx,cy,c1,c2) => cir(cx,cy,8,c1,1.3) + `<path d="M${cx-8} ${cy} A8 8 0 0 0 ${cx+8} ${cy} Z" fill="${c2}"/>` + cir(cx,cy,8,'none',1.3)
  + ln(`M${cx-5} ${cy+8.5} V${cy+12} M${cx} ${cy+9} V${cy+13} M${cx+5} ${cy+8.5} V${cy+12}`,'#c8102e',1.6)
  + ln(`M${cx-2.5} ${cy+9} V${cy+12.5} M${cx+2.5} ${cy+9} V${cy+12.5}`,'#e0b040',1.4);
const sword = () => ln('M73.5 25 L80 5','#d9dce0',1.8) + ln('M73.5 25 L80 5',O,0.4) + ln('M70.8 23.8 L76.4 26.2','#d4af37',1.6);
const telescope = () => pth('M72 23 L82.5 9.5 L85.5 11.7 L75.2 25.3 Z','#c9a24a',1) + ln('M78 16.5 L80.8 18.6','#7d5e18',1);
Object.assign(HAT, {
  penacho: () => {
    let s = '';
    for (let i=0;i<11;i++){
      const a = (-170 + i*14) * Math.PI/180, cx = 50 + 15.5*Math.cos(a), cy = 27 + 15.5*Math.sin(a), deg = (a*180/Math.PI) + 90;
      s += `<g transform="rotate(${deg.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})">`
        + ell(cx.toFixed(1), cy.toFixed(1), 3.2, 9, i%2 ? '#1e8c4e' : '#27a85e', 0.9)
        + `<ellipse cx="${cx.toFixed(1)}" cy="${(cy-6).toFixed(1)}" rx="1.8" ry="2.2" fill="#1f5fa8"/></g>`;
    }
    s += `<path d="M38.5 27 A11.5 11.5 0 0 1 61.5 27 L57.5 27 A7.5 7.5 0 0 0 42.5 27 Z" fill="#e0b040" ${st(1)}/>`;
    s += ln('M40.5 25 A9.5 9.5 0 0 1 59.5 25','#c8102e',1.4);
    return s;
  },
  priestHair: () => pth('M40.5 27 Q39.5 17.5 50 16.8 Q60.5 17.5 59.5 27 L61.5 42 L57 42 L56.2 30.5 Q50 27.5 43.8 30.5 L43 42 L38.5 42 Z','#141210',1.2)
      + pth('M41 24 H59 V26.6 H41 Z','#c8102e',0.8) + ln('M50 17 L48 7 M50 17 L53 8','#f3f0e6',1.6),
  plainBand: () => pth('M41.5 24.5 H58.5 V27.5 H41.5 Z','#c8102e',0.9) + ln('M56 25 Q61 16 59 9','#27a85e',2) + ln('M57.5 25.5 Q64 19 64.5 12','#e0b040',1.6),
  eagle: () => pth('M37 34 Q34.5 12.5 50 10.5 Q65.5 12.5 63 34 L58.6 30 Q50 25.5 41.4 30 Z','#6b4a2a')
      + ln('M41 16 Q44 14 46 16 M54 16 Q56 14 59 16 M39.5 23 L42 21 M60.5 23 L58 21','#e9dfc9',1.1)
      + cir(43.5,19,1.8,'#f3f0e6',0.6) + dot(43.5,19,0.8,O) + cir(56.5,19,1.8,'#f3f0e6',0.6) + dot(56.5,19,0.8,O)
      + pth('M44 21.5 Q50 17 56 21.5 L52.2 28.5 Q50 30.5 47.8 28.5 Z','#e0b040',1)
      + pth('M41.5 33.5 Q50 42.5 58.5 33.5 L57 38 Q50 45 43 38 Z','#e0b040',1),
  jaguar: () => cir(40.5,13.5,3.4,'#d99a2b',1) + cir(59.5,13.5,3.4,'#d99a2b',1)
      + pth('M37 34 Q35 13 50 11 Q65 13 63 34 L58.4 30 Q50 25.5 41.6 30 Z','#d99a2b')
      + [[42,17],[47,14.5],[53,14.5],[58,17],[40,24],[60,24],[45,21],[55,21]].map(([x,y]) => cir(x,y,1.3,'none',0.9)+dot(x,y,0.5,O)).join('')
      + pth('M43.5 22 Q50 18.5 56.5 22 L55 26.6 Q50 27.8 45 26.6 Z','#e8b04a',1) + dot(50,22.6,1.3,O)
      + pth('M46 26.4 L47 29.4 L48 26.6 Z M52 26.6 L53 29.4 L54 26.4 Z','#fff',0.5),
  belgic: () => pth('M42.6 25 L41.8 15 Q43 8 50 7.5 Q57 8 58.2 15 L57.4 25 Z','#151515')
      + pth('M46 13 Q50 9.5 54 13 L53.2 21 H46.8 Z','#d4af37',0.8)
      + pth('M41.5 18 Q39 9 41.5 4 Q44.5 9 44 18 Z','#f3f0e6',0.9)
      + pth('M41.5 24.5 Q50 29 58.5 24.5 L58 26.5 Q50 30 42 26.5 Z','#151515',1)
      + ln('M43 23 Q50 25 57 23','#f3f0e6',0.9),
  highland: () => pth('M40.5 27 Q37 12 43 6 Q50 2.5 57 6 Q63 12 59.5 27 Z','#1c1a18')
      + ln('M44 9 Q45 15 44 21 M50 5 V13 M56 9 Q55 15 56 21','#45403a',1)
      + pth('M40.8 23.5 H59.2 V27 H40.8 Z','#f3f0e6',0.9)
      + `<path d="M42.5 23.5 h2.2 v3.5 h-2.2 Z M46.9 23.5 h2.2 v3.5 h-2.2 Z M51.3 23.5 h2.2 v3.5 h-2.2 Z M55.7 23.5 h2.2 v3.5 h-2.2 Z" fill="#c8102e"/>`
      + pth('M56 22 Q61 12 58.5 6 Q63.5 10 59.5 22 Z','#c8102e',0.8),
  foreAft: () => pth('M44 25.5 Q43.5 6 50 4.5 Q56.5 6 56 25.5 Z','#151515') + ln('M45.5 24 Q46 9 50 6.5','#3a3631',1)
      + cir(46.5,21,1.8,'#151515',0.8),
  britGeneral: () => pth('M23 25 Q27 13 50 11.5 Q73 13 77 25 Q50 19 23 25 Z','#151515')
      + ln('M27 21.5 Q30 13.4 50 12 Q70 13.4 73 21.5','#fbfbf6',3.2)
      + ln('M40 13.5 Q50 11.8 60 13.5','#c8102e',2)
      + ln('M25.5 24.3 Q50 19 74.5 24.3','#d4af37',1.4) + cir(66,18.5,2.2,'#151515',0.8),
  greysBearskin: () => pth('M41 27 Q37.5 12 43 5.5 Q50 1.5 57 5.5 Q62.5 12 59 27 Z','#1c1a18')
      + ln('M44.5 10 Q45.5 16 44.5 22 M50 6 V14 M55.5 10 Q54.5 16 55.5 22','#45403a',1)
      + pth('M42 20 Q36.5 9 40.5 2.5 Q43.5 10 44.5 19 Z','#f3f0e6',1)
      + pth('M44.5 26.5 Q50 22.5 55.5 26.5 Z','#d4af37',0.8),
});
const spots = pts => pts.map(([x,y]) => cir(x,y,1.2,'none',0.8) + dot(x,y,0.45,O)).join('');
function templo(){
  const stone = '#cdbf9b', dark = '#a8996f';
  let s = '';
  s += pth('M20 70 H80 V84 H20 Z',stone,1.3) + pth('M25 58 H75 V70 H25 Z',stone,1.3) + pth('M30 47 H70 V58 H30 Z',stone,1.3) + pth('M34 38 H66 V47 H34 Z',stone,1.3);
  for (const y of [74,79,62,66,51,54,41,44]) s += ln(`M${y>69?21:y>57?26:y>46?31:35} ${y} H${y>69?79:y>57?74:y>46?69:65}`,dark,0.6);
  s += pth('M44 38 H49.2 V84 H44 Z','#e3d7b6',1) + pth('M50.8 38 H56 V84 H50.8 Z','#e3d7b6',1);
  for (let y=41;y<84;y+=3.4) s += ln(`M44 ${y} H49.2 M50.8 ${y} H56`,dark,0.6);
  s += pth('M49.2 38 H50.8 V84 H49.2 Z','#8a2a1a',0.6);
  s += pth('M35.5 25 H48 V38 H35.5 Z','#2f6db5',1.2) + pth('M38.8 30 H44.7 V38 H38.8 Z','#151515',0.8);
  s += ln('M35.5 25 V21.5 M38.6 25 V21.5 M41.7 25 V21.5 M44.8 25 V21.5 M48 25 V21.5','#2f6db5',2.2);
  s += pth('M52 25 H64.5 V38 H52 Z','#b03a2e',1.2) + pth('M55.3 30 H61.2 V38 H55.3 Z','#151515',0.8);
  s += pth('M52 25 L58.25 17 L64.5 25 Z','#b03a2e',1.1) + ln('M53.5 23 H63','#f3f0e6',0.8);
  return s;
}
function navio(){
  let s = '';
  s += ln('M15 61 L1 50','#5a3a1e',1.6);
  for (const [x,top] of [[32,16],[50,7],[68,19]]){
    s += ln(`M${x} 62 V${top}`,'#5a3a1e',1.7);
    s += pth(`M${x-11} ${top+4} Q${x} ${top+1.5} ${x+11} ${top+4} L${x+10} ${top+16} Q${x} ${top+14} ${x-10} ${top+16} Z`,'#f3efe2',1);
    s += pth(`M${x-12.5} ${top+19} Q${x} ${top+16.5} ${x+12.5} ${top+19} L${x+11.5} ${top+33} Q${x} ${top+31} ${x-11.5} ${top+33} Z`,'#f3efe2',1);
  }
  s += pth('M3 55 L15 44 L16 56 Z','#f3efe2',0.9);
  s += ln('M86 60 L90 47','#5a3a1e',1.2) + pth('M90 47 H98 V52.5 H90 Z','#c8102e',0.7) + pth('M90 47 H93.5 V49.6 H90 Z','#1f3a8a',0);
  s += pth('M10 61 H88 L84 72 Q80 81 70 82 H28 Q16 81 13 72 Z','#1c1a18',1.5);
  s += pth('M12.2 65 H87 L86 68.3 H13.2 Z','#d9a441',0.7) + pth('M14.2 72.2 H84.2 L83 75.4 H15.6 Z','#d9a441',0.7);
  for (let x=20;x<82;x+=7) s += `<rect x="${x}" y="65.6" width="3.2" height="2.2" fill="#1c1a18"/><rect x="${x+2}" y="72.8" width="3.2" height="2.2" fill="#1c1a18"/>`;
  s += ln('M8 86 Q14 83 20 86 T32 86 T44 86 T56 86 T68 86 T80 86 T92 86','#6fb3d6',1.4);
  return s;
}

FACTIONS.azteca = {
  name:'Imperio Azteca', era:'Tenochtitlan, c. 1519',
  blurb:'Desde Tenochtitlan, la Triple Alianza mexica dominó el centro de México con sus órdenes de guerreros águila y jaguar, hasta la llegada de Cortés en 1519.',
  fill:'#16867a', base:'#16867a', baseDark:'#0d5a52', rim:'#e0b040',
  names:{K:'Huey tlatoani Moctezuma',Q:'Guerrero jaguar',R:'Templo Mayor',B:'Sumo sacerdote',N:'Guerrero águila',P:'Guerrero mexica'},
  draw:{
    P: () => figure({scale:.8, skin:AZ_SKIN, coat:'#f1ead8', sleeve:AZ_SKIN, trousers:AZ_SKIN, boots:'#7a5230', bootTop:82, hat:HAT.plainBand(),
          back: macuahuitl(70.5),
          torso: ln('M39 46 H61 M39 51 H61 M39 56 H61','#cfc6ae',0.9) + pth('M38.6 61 H61.4 L62 66 H38 Z','#f1ead8',1),
          front: chimalli(33,53,'#f3f0e6','#1f5fa8')}),
    B: () => figure({scale:.9, longCoat:true, skin:AZ_SKIN, coat:'#25211e', sleeve:'#25211e', boots:'#7a5230', hat:HAT.priestHair(), rightArm:'raised',
          torso: ln('M38.5 41 L34.5 81 M61.5 41 L65.5 81','#8a2a1a',2) + ln('M44 50 Q50 54 56 50 M44 58 Q50 62 56 58','#c8102e',1.2),
          front: ln('M73.5 25 L80 17','#7a5230',1.6) + pth('M77 17.5 Q80 21.5 84.5 18 L83 14.5 Q80 15.5 78 14.5 Z','#b06a3a',0.9)
                 + ln('M81 13 Q79 9 81.5 6 Q84 3 82 0','#b9b4aa',1.1)}),
    Q: () => figure({scale:.95, skin:AZ_SKIN, coat:'#d99a2b', trousers:'#d99a2b', boots:'#7a5230', bootTop:82, hat:HAT.jaguar(),
          back: macuahuitl(70.5),
          torso: spots([[42,45],[48,47],[55,44],[58,51],[44,53],[51,56],[57,59],[41,60]]) + pth('M38.6 58.5 H61.4 V61.5 H38.6 Z','#f1ead8',1)
                 + spots([[44,68],[56,70],[45,76],[55,77]]),
          front: chimalli(33,53,'#c8102e','#e0b040')}),
    K: () => figure({scale:1, longCoat:true, skin:AZ_SKIN, coat:'#2aa198', sleeve:'#2aa198', boots:'#7a5230', hat:HAT.penacho(),
          back: ln('M70.5 85 V20','#e0b040',2) + cir(70.5,18,3,'#27a85e',1),
          torso: pth('M38 40 Q44 46 50 44 Q56 46 62 40 L61 45 Q50 51 39 45 Z','#e0b040',1)
                 + ln('M35 80.5 Q50 84 65 80.5','#e0b040',2) + ln('M39 52 L36.5 78 M61 52 L63.5 78','#1f5fa8',1.4)
                 + pth('M42 55 H58 V66 H42 Z','#f3f0e6',1) + ln('M42 58 H58 M42 62.5 H58','#c8102e',1)
                 + dot(43.2,31.5,1.1,'#e0b040') + dot(56.8,31.5,1.1,'#e0b040')}),
    N: () => figure({scale:.9, skin:AZ_SKIN, coat:'#6b4a2a', trousers:'#6b4a2a', boots:'#7a5230', bootTop:82, hat:HAT.eagle(),
          back: pth('M39 42 L22 47 L24 52 L20 55 L26 58 L24 62 L33 61 Z','#5a3a1e',1) + pth('M61 42 L78 47 L76 52 L80 55 L74 58 L76 62 L67 61 Z','#5a3a1e',1)
                + ln('M26 50 L35 48 M25 56 L34 54','#e9dfc9',0.9) + ln('M74 50 L65 48 M75 56 L66 54','#e9dfc9',0.9),
          torso: ln('M40 46 Q42 48 44 46 M46 46 Q48 48 50 46 M52 46 Q54 48 56 46 M42 53 Q44 55 46 53 M48 53 Q50 55 52 53 M54 53 Q56 55 58 53','#e9dfc9',0.9)
                 + pth('M38.6 59 H61.4 V62 H38.6 Z','#e0b040',1),
          front: macuahuitl(71)}),
    R: () => templo()
  }
};

FACTIONS.britanicos = {
  name:'Ejército Británico', era:'Reino Unido, 1815',
  blurb:'Las casacas rojas de Wellington, con escoceses de las Highlands y los Scots Greys, resistieron en Waterloo y pusieron fin al imperio de Napoleón.',
  fill:'#b3202a', base:'#ece4cf', baseDark:'#c4b993', rim:'#b3202a', badgeFill:'#b3202a',
  names:{K:'Duque de Wellington',Q:'General de división',R:'Navío de línea',B:'Gaitero highlander',N:'Dragón de los Scots Greys',P:'Casaca roja'},
  draw:{
    P: () => figure({scale:.8, coat:'#b3202a', trousers:'#6f7177', boots:'#1a1a1a', bootTop:80, hat:HAT.belgic(),
          back: rifle(70.5,'#7a5230',true),
          torso: ln('M39.5 42.5 L60.5 62 M60.5 42.5 L39.5 62','#f3f0e6',2.2) + cir(50,52,1.8,'#d4af37',0.6)
                 + ell(38.5,41.5,4.2,2.1,'#f3f0e6',1) + ell(61.5,41.5,4.2,2.1,'#f3f0e6',1)}),
    B: () => figure({scale:.9, coat:'#b3202a', trousers:'#efcfae', boots:'#ddd3bd', bootTop:73, hat:HAT.highland(),
          back: ln('M37 46 L27 14 M34 47 L22 22 M39 45 L35 10','#151515',1.8) + dot(27,14,1.5,'#efe6d2') + dot(22,22,1.5,'#efe6d2') + dot(35,10,1.5,'#efe6d2')
                + ln('M27.4 15.2 L33 31 M22.6 23 L30.5 36','#c8102e',0.8),
          torso: pth('M37.8 61 H62.2 L64 73 Q50 75 36 73 Z','#1f3d2b',1.1) + ln('M40 61 L39.5 73 M46 61 V74 M52 61 V74 M58 61 L59 73 M37 66 H63 M36.8 70 H63.3','#2f5fa0',1)
                 + ln('M41 61 L40.5 73 M55 61 L55.5 73','#c8102e',0.6) + pth('M46.5 62 H53.5 V70 H46.5 Z','#e9dfc9',0.8)
                 + ln('M42 74 H48.5 M51.5 74 H58','#c8102e',1.2) + ln('M40 42 L60 57','#1f3d2b',3),
          front: ell(35,49,6,5,'#1f3d2b',1.1) + ln('M31 47 H39 M31 51 H39','#2f5fa0',0.8) + ln('M50 37 L49 60','#151515',1.6)}),
    Q: () => figure({scale:.95, coat:'#b3202a', trousers:'#f3f0e6', boots:'#151515', bootTop:70, hat:HAT.britGeneral(), rightArm:'raised',
          torso: ln('M45 40.5 L47 60 M55 40.5 L53 60','#d4af37',1.8) + epaul('#d4af37')
                 + pth('M38.5 56.5 H61.5 L61.6 61 H38.4 Z','#8a1530',1) + ln('M59 61 L61 66','#8a1530',1.8),
          front: sword()}),
    K: () => figure({scale:1, longCoat:true, coat:'#1c2340', sleeve:'#1c2340', boots:'#151515', hat:HAT.foreAft(), rightArm:'raised',
          torso: pth('M46 39.5 Q50 41.5 54 39.5 L53.5 45 Q50 47 46.5 45 Z','#f3f0e6',1)
                 + ln('M50 47 V80','#2e3a63',1.2) + dot(47.5,52,0.9,'#d4af37') + dot(47.6,58,0.9,'#d4af37') + dot(47.7,64,0.9,'#d4af37')
                 + pth('M36.5 41 Q34 60 33 80 L37 80 Q38 60 40 43 Z','#2e3a63',0.8) + pth('M63.5 41 Q66 60 67 80 L63 80 Q62 60 60 43 Z','#2e3a63',0.8),
          front: telescope()}),
    N: () => horseman({horse:'#dcd8cf', horseDark:'#b7b2a7', mane:'#8a867e', cloth:'#1f3a8a', clothTrim:'#d4af37',
          coat:'#b3202a', trousers:'#f3f0e6', boots:'#151515', hat:HAT.greysBearskin(), weapon:'saber',
          torso: ln('M51.8 33 L60 46 M60 33 L51.8 46','#f3f0e6',1.2)}),
    R: () => navio()
  }
};

// ---------- Conquistadores y samuráis ----------
const steel = '#c3c7cc';
Object.assign(HAT, {
  morion: (plume) => (plume ? pth('M55 9 Q63 0 70 6 Q63 4 57 11 Z','#b01e2e',0.8) + pth('M55 10 Q61 3 66 7 Q60 6 56 11.5 Z','#f3f0e6',0.6) : '')
      + pth('M45 12.5 Q50 1.5 55 12.5 Z',steel,1)
      + pth('M40 23.5 Q40 12 50 11 Q60 12 60 23.5 Z',steel)
      + pth('M28.5 25.5 Q35 31 50 28.4 Q65 31 71.5 25.5 Q67 21.5 61 22.4 H39 Q33 21.5 28.5 25.5 Z',steel,1.2)
      + ln('M41 17 Q50 13.5 59 17','#8d939b',0.9),
  malinche: () => pth('M41 28 Q40 17.5 50 17 Q60 17.5 59 28 L59.5 35 L56.5 35 L56 30 Q50 26.8 44 30 L43.5 35 L40.5 35 Z','#141210',1.1)
      + pth('M39.5 34 Q38 44 39.5 56 L42.5 56 Q41.5 44 43 34 Z','#141210',0.9) + pth('M60.5 34 Q62 44 60.5 56 L57.5 56 Q58.5 44 57 34 Z','#141210',0.9)
      + ln('M39.6 45 H42.6 M57.4 45 H60.4','#c8102e',1.3) + ell(41,57,1.8,1.3,'#c8102e',0.6) + ell(59,57,1.8,1.3,'#c8102e',0.6)
      + ln('M41.5 22.5 Q50 19.5 58.5 22.5','#2a7f6f',1.4) + dot(50,20.6,1.3,'#e0b040'),
  tonsure: () => pth('M42.5 29 Q42 24.5 44 23.5 Q46 25 50 25 Q54 25 56 23.5 Q58 24.5 57.5 29 Q50 26.5 42.5 29 Z','#5a3a1e',0.9),
  kabuto: (lace) => pth('M33 35 L36.5 24 H63.5 L67 35 L60.5 31.5 L59 27 H41 L39.5 31.5 Z','#2a2230',1.2)
      + ln('M35.5 29 H38.8 M61.2 29 H64.5 M34.5 32 H38 M62 32 H65.5',lace,1.3)
      + pth('M39.5 25.5 Q39.5 12.5 50 12 Q60.5 12.5 60.5 25.5 Z','#2b2b2b')
      + ln('M45 13.5 V25 M50 12.5 V25 M55 13.5 V25','#4a4a4a',0.8)
      + pth('M39 23 L32.5 18 L34.5 28.5 Z','#2b2b2b',1) + pth('M61 23 L67.5 18 L65.5 28.5 Z','#2b2b2b',1)
      + ln('M33.2 19.3 L34.5 27.5 M66.8 19.3 L65.5 27.5','#d4af37',0.9)
      + ln('M47.5 20 Q40 11 36.5 0.5 M52.5 20 Q60 11 63.5 0.5','#d4af37',2.4) + cir(50,20,2.4,'#d4af37',0.7),
  tomoe: () => pth('M41 28 Q40 17.5 50 17 Q60 17.5 59 28 L58.5 25 Q50 22 41.5 25 Z','#141210',1)
      + pth('M58 20 Q70 18 76 26 Q68 23 59 25 Z','#141210',0.9)
      + pth('M40.6 23.8 Q50 20.6 59.4 23.8 L59.2 26.4 Q50 23.4 40.8 26.4 Z','#f3f0e6',0.8) + ln('M59 24.5 L65 21 M59 25.5 L64 27','#f3f0e6',1.2),
  cowl: () => `<path d="M38.5 34 Q37.5 14.5 50 12.5 Q62.5 14.5 61.5 34 Q60 41.5 50 42 Q40 41.5 38.5 34 Z M43.5 27.5 H56.5 V32.5 H43.5 Z" fill="#f3f0e6" fill-rule="evenodd" ${st(1.3)}/>`
      + ln('M41 20 Q50 16.5 59 20','#d8d2c2',1),
  jingasa: () => pth('M29 26.5 L50 14.5 L71 26.5 Q50 29.5 29 26.5 Z','#2b2b2b',1.3) + cir(50,21.5,2.4,'#c0392b',0.6),
});
const naginata = x => ln(`M${x} 85 V16`,'#5a3a1e',1.8) + pth(`M${x-1.2} 16.5 Q${x-1} 6 ${x+3} 1 Q${x+2} 8 ${x+1.2} 16.5 Z`,'#d9dce0',0.8) + ln(`M${x-2} 17 H${x+2}`,'#d4af37',1.6);
const yoroi = (lace) => ln('M39 45 H61 M39 49 H61 M39 53 H61 M39 57 H61',lace,1.4) + ln('M39 45 H61 M39 49 H61 M39 53 H61 M39 57 H61','#d4af37',0.35)
  + pth('M30.5 40 H39.5 L40.5 54 H31 Z','#2a2230',1.1) + ln('M31 44 H39.8 M31 48 H40 M31 51.5 H40.3',lace,1.1)
  + pth('M69.5 40 H60.5 L59.5 54 H69 Z','#2a2230',1.1) + ln('M69 44 H60.2 M69 48 H60 M69 51.5 H59.7',lace,1.1)
  + pth('M38.4 61 H61.6 L63.5 71 H36.5 Z','#2a2230',1.1) + ln('M38 65 H62 M37.4 68 H62.6 M44 61 L43.5 71 M50 61 V71 M56 61 L56.5 71',lace,1);
function bergantin(){
  let s = '';
  s += ln('M28 76 L20 86 M38 77 L31 87 M48 77 L42 87 M58 77 L53 87 M68 76 L64 86','#7a5230',1.3);
  s += ln('M35 70 V20 M62 70 V30','#5a3a1e',1.7);
  s += pth('M35 21 L13 56 Q26 54 35 58 Z','#f3efe2',1) + ln('M38 18 L12 58','#5a3a1e',1.2);
  s += pth('M62 31 L45 60 Q55 58 62 61 Z','#f3efe2',1) + ln('M64.5 28 L44 62','#5a3a1e',1.1);
  s += pth('M28 32 L32 32 L22 50 L18 50 Z','#b01e2e',0) ;
  s += pth('M62 30 L74 30 L74 38 L62 38 Z','#f3f0e6',0.8) + ln('M63.5 31 L72.5 37 M72.5 31 L63.5 37','#b01e2e',1.6);
  s += pth('M10 67 Q12 70 16 72 H84 Q90 70 93 64 L86 66 H12 Z','#7a5230',1.5);
  s += pth('M12 66 H86 L85 70 H14 Z','#9a6a3a',1) + ln('M16 68 H84','#5a3a1e',0.6);
  s += ln('M8 86 Q14 83 20 86 T32 86 T44 86 T56 86 T68 86 T80 86 T92 86','#6fb3d6',1.4);
  return s;
}
function pagoda(){
  let s = '';
  const tiers = [[80,25,9],[71,21.5,8],[63,18,7.5],[55.5,15,7],[48.5,12,6.5]];
  for (const [yb,half,h] of tiers){
    s += pth(`M${50-half+3} ${yb} H${50+half-3} V${yb-h} H${50-half+3} Z`,'#f3efe2',1.1) + ln(`M${50-half+3} ${yb-1.6} H${50+half-3}`,'#c0392b',2);
    s += pth(`M${50-half-6} ${yb-h+1.5} Q${50-half} ${yb-h-1} ${50-half+4} ${yb-h-3} H${50+half-4} Q${50+half} ${yb-h-1} ${50+half+6} ${yb-h+1.5} Q${50+half} ${yb-h+0.5} ${50+half-4} ${yb-h} H${50-half+4} Q${50-half} ${yb-h+0.5} ${50-half-6} ${yb-h+1.5} Z`,'#3a3a3a',1.1);
  }
  s += pth('M28 84 H72 V80 H28 Z','#9a8f7a',1);
  s += ln('M50 39 V18','#d4af37',1.6) + [22,25,28,31,34].map(y => ell(50,y,2.4,0.8,'#d4af37',0.5)).join('') + cir(50,17,1.8,'#d4af37',0.6);
  return s;
}

FACTIONS.conquistadores = {
  name:'Conquistadores', era:'Hernán Cortés, 1519',
  blurb:'La expedición de Hernán Cortés desembarcó en 1519 y, con miles de aliados tlaxcaltecas y la intérprete Malinche, tomó Tenochtitlan en 1521 tras sitiarla con bergantines en el lago.',
  fill:'#8e1b2b', base:'#8e1b2b', baseDark:'#5a0f1a', rim:'#e0b040',
  names:{K:'Hernán Cortés',Q:'La Malinche',R:'Bergantín',B:'Fray Bartolomé de Olmedo',N:'Jinete con lanza',P:'Arcabucero'},
  draw:{
    P: () => figure({scale:.8, coat:'#c9a26b', trousers:'#8e1b2b', boots:'#3b2a1e', bootTop:76, hat:HAT.morion(false),
          back: rifle(70.5,'#6b4423',false) + ln('M69 56 L72 58','#3a3a3a',1.4),
          torso: ln('M39 46 H61 M39 51 H61 M39 56 H61','#a8844e',0.9) + ln('M39.5 42.5 L60.5 62','#5a3a1e',1.8)
                 + dot(45,48.5,1.1,'#5a3a1e') + dot(49,52.3,1.1,'#5a3a1e') + dot(53,56,1.1,'#5a3a1e')
                 + ln('M39 62 H62 M44 62 V69 M50 62 V69 M56 62 V69','#b8946a',0)}),
    B: () => figure({scale:.9, longCoat:true, coat:'#f1ede2', sleeve:'#f1ede2', boots:'#3b2a1e', hat:HAT.tonsure(), rightArm:'raised',
          torso: pth('M40 39 Q50 45 60 39 L59 44 Q50 50 41 44 Z','#e2dccb',1) + ln('M38.5 59 Q50 61.5 61.5 59','#8a7a5a',1.6) + ln('M58 60 L59 72','#8a7a5a',1.2)
                 + cir(50,50,3.3,'#c8102e',0.8) + ln('M50 47.2 V52.8 M47.2 50 H52.8','#e0b040',1),
          front: ln('M76.5 3 V25','#4a2f18',2) + ln('M72.2 9 H80.8','#4a2f18',2)}),
    Q: () => figure({scale:.95, longCoat:true, skin:AZ_SKIN, coat:'#f5f1e6', sleeve:'#f5f1e6', boots:'#7a5230', hat:HAT.malinche(), rightArm:'raised',
          torso: pth('M44 39.5 H56 L54.5 45 H45.5 Z','#c8102e',0.8)
                 + ln('M37 52 H63 M36.3 64 H64.7','#2a7f6f',2.4) + ln('M37 52 H63 M36.3 64 H64.7','#e0b040',0.6)
                 + [40,45,50,55,60].map(x => pth(`M${x-1.5} 57 L${x} 55 L${x+1.5} 57 L${x} 59 Z`,'#c8102e',0.5)).join('')
                 + ln('M35 76 H65','#c8102e',2.2) + [39,44,49,54,59].map(x => dot(x+1.5,72,1,'#2a7f6f')).join('')}),
    K: () => figure({scale:1, coat:'#2b2523', trousers:'#8e1b2b', boots:'#3b2a1e', bootTop:70, hat:HAT.morion(true), rightArm:'raised', face:beard(),
          torso: pth('M39 40.5 Q50 37.5 61 40.5 L60.5 58 Q50 62.5 39.5 58 Z',steel,1.2) + ln('M50 39.5 V60','#8d939b',1)
                 + ln('M39.5 43 L60.5 58','#c8102e',2.6) + pth('M39.5 58 Q50 62.5 60.5 58 L61.5 64 Q50 67 38.5 64 Z',steel,1)
                 + ln('M44 63 V70 M50 63.5 V70.5 M56 63 V70','#3b2a1e',0)
                 + ln('M43 62 L44 71 M50 63 V72 M57 62 L56 71','#6a1424',2.2),
          front: sword()}),
    N: () => horseman({horse:'#4a2e1c', horseDark:'#36210f', mane:'#14100c', cloth:'#8e1b2b', clothTrim:'#e0b040',
          coat:'#2b2523', trousers:'#8e1b2b', boots:'#3b2a1e', hat:HAT.morion(false), weapon:'lance',
          torso: pth('M51.5 32.5 Q56 31 60.5 32.5 L59.8 44 Q56 46 52.2 44 Z',steel,1) + ln('M56 33 V44.5','#8d939b',0.8)}),
    R: () => bergantin()
  }
};

FACTIONS.samurai = {
  name:'Samuráis', era:'Japón, 1274–1281',
  blurb:'Los samuráis del shogunato Kamakura rechazaron las dos invasiones mongolas de Kublai Kan, ayudados por los tifones que los japoneses llamaron kamikaze, «viento divino».',
  fill:'#5b2a6e', base:'#5b2a6e', baseDark:'#3a1848', rim:'#d4af37',
  names:{K:'Regente Hōjō Tokimune',Q:'Tomoe Gozen',R:'Pagoda',B:'Monje guerrero',N:'Samurái a caballo',P:'Ashigaru'},
  draw:{
    P: () => figure({scale:.8, coat:'#3a3a48', trousers:'#4a4a5a', boots:'#1a1a1a', bootTop:79, hat:HAT.jingasa(),
          back: spear(70.5),
          torso: ln('M39 46 H61 M39 51 H61','#5b2a6e',1.6) + pth('M38.6 57 H61.4 V60 H38.6 Z','#c0392b',0.9) + cir(50,51,2,'#d4af37',0.5)}),
    B: () => figure({scale:.9, longCoat:true, coat:'#2f2f3a', sleeve:'#2f2f3a', boots:'#1a1a1a', hat:HAT.cowl(),
          back: ln('M70.5 85 V12','#5a3a1e',1.8) + cir(70.5,8,4,'none',1.3) + ln('M70.5 4 V12','#d4af37',1) + cir(67,11,1.3,'#d4af37',0.5) + cir(74,11,1.3,'#d4af37',0.5),
          torso: pth('M38.5 42 L61.5 70 L58 74 L37.5 48 Z','#d98c2b',1) + [[43,44],[46,47.5],[49,50],[52,50.5],[55,48],[57,44.5]].map(([x,y]) => cir(x,y,1.2,'#7a5230',0.5)).join('')
                 + ln('M37 79 Q50 83 63 79','#5b2a6e',1.6)}),
    Q: () => figure({scale:.95, coat:'#c0392b', trousers:'#f3f0e6', boots:'#1a1a1a', bootTop:79, hat:HAT.tomoe(),
          back: naginata(70.5), torso: yoroi('#7a1e2e')}),
    K: () => figure({scale:1, coat:'#2f4f8a', trousers:'#5b2a6e', boots:'#1a1a1a', bootTop:79, hat:HAT.kabuto('#2f4f8a'), rightArm:'raised',
          torso: yoroi('#2f4f8a') + ln('M39 47.5 H61','#f3f0e6',0.6),
          front: ln('M73.5 25 L76.5 18','#2b2b2b',1.5) + ell(78.5,11.5,5.5,7,'#1a1a1a',1) + cir(78.5,11,2.8,'#c0392b',0.5)}),
    N: () => horseman({horse:'#2a2320', horseDark:'#1c1715', mane:'#0e0b0a', cloth:'#5b2a6e', clothTrim:'#d4af37',
          coat:'#c0392b', trousers:'#f3f0e6', boots:'#1a1a1a', hat:HAT.kabuto('#c0392b'), weapon:'bow',
          back: ell(66,33,7.5,9.5,'#d98c2b',1.1) + ln('M60 28 Q66 33 61 40','#b06a1a',0.8),
          torso: ln('M51.5 36 H60.5 M51.7 40 H60.3 M51.9 44 H60.1','#7a1e2e',1.2)}),
    R: () => pagoda()
  }
};

const GLYPH = { K:'♚', Q:'♛', R:'♜', B:'♝', N:'♞', P:'♟' };
let showGlyph = true, classicShapes = false;

function _mix(h, to, a){
  const p = x => [1,3,5].map(i => parseInt(x.slice(i,i+2),16)), A = p(h), B = p(to);
  return '#' + A.map((v,i) => Math.round(v + (B[i]-v)*a).toString(16).padStart(2,'0')).join('');
}
function _classic(type, f){
  const lum = (0.299*parseInt(f.fill.slice(1,3),16) + 0.587*parseInt(f.fill.slice(3,5),16) + 0.114*parseInt(f.fill.slice(5,7),16)) / 255;
  return stauntonPiece(type, f.fill, lum < 0.4 ? _mix(f.fill,'#ffffff',.4) : _mix(f.fill,'#000000',.45), f.rim);
}
function pieceSVG(type, fk, opts={}){
  const f = FACTIONS[fk];
  const base = `<path d="M17 84 V88.5 A33 6.5 0 0 0 83 88.5 V84 Z" fill="${f.baseDark}" ${st(1.4)}/>`
             + `<ellipse cx="50" cy="84" rx="33" ry="6.5" fill="${f.base}" ${st(1.4)}/>`
             + `<ellipse cx="50" cy="84" rx="28" ry="4.4" fill="none" stroke="${f.rim}" stroke-width="1.2"/>`;
  const badge = (showGlyph && !opts.noBadge)
    ? `<circle cx="83" cy="6" r="7.5" fill="${f.badgeFill||f.base}" stroke="${f.rim}" stroke-width="1.3"/>`
      + `<text x="83" y="9.6" text-anchor="middle" font-size="10.5" fill="#fff" font-family="'DejaVu Sans','Segoe UI Symbol','Apple Symbols',sans-serif">${GLYPH[type]}︎</text>`
    : '';
  return `<svg viewBox="10 -2 80 94" overflow="visible" style="overflow:visible" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${base}${(classicShapes && typeof stauntonPiece === 'function') ? _classic(type, f) : f.draw[type]()}${badge}</svg>`;
}
