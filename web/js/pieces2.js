// ===================== EJÉRCITOS ADICIONALES =====================
// Atenas · Persia · Proletariado · Burguesía · Estados Unidos · Vietnam · piezas clásicas blancas y negras.
// Usa los ayudantes de pieces.js (figure, horseman, pth, cir, ell, ln, dot, star, HAT…).

const BRONZE = '#b8893a', MARBLE = '#efe9d8';
const rect = (x,y,w,h,f,sw) => pth(`M${x} ${y} h${w} v${h} h${-w} Z`,f,sw);
const glasses = () => cir(47.3,30.3,2.5,'none',0.7) + cir(52.7,30.3,2.5,'none',0.7) + ln('M49.8 30.2 H50.2','#17130f',0.7);
const hairCap = c => pth('M41.2 31 Q39.5 16.5 50 16 Q60.5 16.5 58.8 31 Q57 23.5 50 22.8 Q43 23.5 41.2 31 Z',c,1);
const mustache = c => pth('M45 34 Q50 31.8 55 34 Q52 36.2 50 35 Q48 36.2 45 34 Z',c,0.8);
const goatee = c => pth('M47.6 36 Q50 43.5 52.4 36 Q50 37.5 47.6 36 Z',c,0.9) + ln('M46.5 34.2 Q50 32.6 53.5 34.2',c,1);
const longBeard = (c) => pth('M42.3 30 Q42 42 50 46.5 Q58 42 57.7 30 Q55.5 37 50 37 Q44.5 37 42.3 30 Z',c,1)
  + ln('M44.5 37 Q50 41 55.5 37','#00000044',0.7);
const squareBeard = (c) => pth('M42 29.5 Q41 40 43.5 46 H56.5 Q59 40 58 29.5 Q55.5 36.5 50 36.5 Q44.5 36.5 42 29.5 Z',c,1)
  + [38.5,41.5,44.5].map(y => ln(`M43.5 ${y} Q50 ${y+2.2} 56.5 ${y}`,'#00000055',0.8)).join('');

// ---------- Tocados nuevos ----------
const HAT2 = {
  corinthian: (crest='#a8261b') => pth('M41.2 31.5 Q40.5 15.5 50 14.5 Q59.5 15.5 58.8 31.5 L56 31.5 Q56 22.5 50 22 Q44 22.5 44 31.5 Z',BRONZE,1.2)
      + pth('M42 18 Q50 -1 60 8 Q57 9 55 16 L44 17 Z',crest,1.1)
      + ln('M44.5 31 L44.5 25 M55.5 31 L55.5 25','#7a5a1e',0.9),
  pushedBack: () => pth('M41 24 Q40.5 11 50 10.5 Q59.5 11 59 24 Q50 19.5 41 24 Z',BRONZE,1.2)
      + pth('M42 13 Q50 -3 60 5 Q57 7 55 12 L44 13 Z','#a8261b',1.1) + ln('M41.5 22 Q50 18.5 58.5 22','#7a5a1e',1),
  tiara: () => pth('M43.2 24 L42.2 5.5 Q50 3.5 57.8 5.5 L56.8 24 Z','#7a2f8f',1.2)
      + rect(42.4,7.5,15.2,2.2,'#e0b040',0.7) + rect(43,14,14,1.6,'#e0b040',0.6) + rect(43.2,21,13.6,2.2,'#e0b040',0.7)
      + [45,50,55].map(x => dot(x,18,0.9,'#e0b040')).join('')
      + ln('M41.5 27 Q40 24 44 23.5 M58.5 27 Q60 24 56 23.5','#1c1410',2.4),
  immortal: () => pth('M41 25 Q41 12 50 11 Q59 12 59 25 Q50 21.5 41 25 Z','#f1e8d0',1.1)
      + rect(41.2,20.5,17.6,2.4,'#c9a24a',0.7) + ln('M44 12.5 Q46 18 44.5 21 M50 11.5 V21 M56 12.5 Q54 18 55.5 21','#cbbf9f',0.8)
      + ln('M41.5 28 Q40.5 24.5 44 24 M58.5 28 Q59.5 24.5 56 24','#1c1410',2.2),
  kyrbasia: (c='#b4382c') => pth('M41 26 Q42 13 52 11.5 L63 15.5 Q55 16.5 58.5 26 Q50 22 41 26 Z',c,1.2) + ln('M44 22.5 H57','#e0b040',1.1),
  magus: () => pth('M42 24 Q43 7 50 3.5 Q57 7 58 24 Q50 21 42 24 Z','#f6f2e6',1.2) + ln('M50 4.5 V19','#d9d2bd',0.8)
      + pth('M41.2 30 Q50 37.5 58.8 30 L58 38.5 Q50 43 42 38.5 Z','#f6f2e6',1.1) + ln('M50 34 V41.5','#d9d2bd',0.8),
  flatCap: (c='#2d2a28') => pth('M40 25.5 Q40.5 17.5 50 17.5 Q60 17.5 60 25.5 Q50 22.5 40 25.5 Z',c,1.1)
      + pth('M52 24.4 Q62.5 22.6 64 26.8 Q58 27.2 52 25.6 Z',c,1),
  bowler: () => pth('M43.2 24.5 Q43 12.5 50 12.2 Q57 12.5 56.8 24.5 Z','#1d1b19',1.1) + ell(50,24.8,10.8,2.1,'#1d1b19',1.1) + rect(43.4,21.2,13.2,2.1,'#6b1f1f',0.5),
  topHat: () => pth('M42.8 24.5 L43.4 5.5 H56.6 L57.2 24.5 Z','#151413',1.2) + ell(50,24.8,11,2.2,'#151413',1.1) + rect(43,20.6,14,2.5,'#7a1e2e',0.6)
      + ln('M45 8 V19','#3a3835',0.9),
  helmetM1: () => pth('M37.5 27.5 Q38.5 11.5 50 11 Q61.5 11.5 62.5 27.5 Q50 24 37.5 27.5 Z','#5b6540',1.2)
      + ln('M41 17 L59 25 M59 17 L41 25 M50 11.5 V24.5','#454d30',0.7) + ln('M41 28.5 L42 33.5 M59 28.5 L58 33.5','#2f3320',1),
  stetson: () => ell(50,23.6,15.5,3.2,'#b79a63',1.1) + pth('M41.5 23.5 Q41.5 9.5 50 9.5 Q58.5 9.5 58.5 23.5 Z','#b79a63',1.1) + ln('M41.5 20.6 H58.5','#5a4325',1.6) + ln('M46 10.5 L50 14 L54 10.5','#8f7745',0.8),
  nonLa: () => pth('M27 26 L50 3 L73 26 Q50 30.5 27 26 Z','#dcc98f',1.2) + ln('M34 22.8 L50 8 M42 25.4 L50 12 M66 22.8 L50 8 M58 25.4 L50 12 M50 4 V27','#b5a269',0.7)
      + ln('M41.5 27.8 L41.5 34 M58.5 27.8 L58.5 34','#7a2f2f',1.1),
  grayHair: () => hairCap('#c9c4b8'),
  bun: c => hairCap(c) + cir(50,13.8,3.9,c,1),
  bob: c => pth('M39.6 35 Q37 14.5 50 14 Q63 14.5 60.4 35 L56.4 35 Q57 24 50 23 Q43 24 43.6 35 Z',c,1.1),
  headband: () => pth('M41 22.2 Q50 18.5 59 22.2 L58.7 24.4 Q50 21 41.3 24.4 Z','#2f5aa8',0.8),
  tonsured: c => hairCap(c),
  workerCap: () => HAT2.flatCap('#4a4038'),
};

// ---------- Accesorios ----------
const redFlag = x => ln(`M${x} 86 V6`,'#6b4a2a',1.8) + pth(`M${x+0.8} 7 H${x+23} Q${x+19} 12.5 ${x+23} 18 H${x+0.8} Z`,'#c4161c',1)
  + star(x+8.5,12.5,3.2,'#f2c200','#7a5a00',0.4);
const hammer = x => ln(`M${x} 84 V44`,'#7a5230',1.8) + pth(`M${x-4.6} 40 H${x+4.6} V46 H${x-4.6} Z`,'#6c7076',1);
const spearGreek = x => ln(`M${x} 86 V8`,'#7a5230',1.8) + pth(`M${x} 0.5 L${x+2.4} 10 L${x-2.4} 10 Z`,'#b8893a',0.8);
const hoplonShield = (cx,cy,c1,c2) => cir(cx,cy,9,c1,1.3) + cir(cx,cy,5.5,'none',0.9) + `<path d="M${cx-9} ${cy} h18" stroke="${c2}" stroke-width="1.3"/>` + dot(cx,cy,1.6,c2);
const bookSmall = () => rect(30.5,51.5,7.5,10,'#7a1e2e',0.9) + ln('M32 53 H36.6','#e0b040',0.8);
const briefcase = () => rect(27,60,12,8.5,'#5a3a1e',1) + rect(31,58.3,4,2,'none',0.9) + ln('M27 63.5 H39','#3b2812',0.8);
const moneyBag = () => pth('M28.5 69 Q25 61 31.5 57.5 Q36 61 38.5 57.5 Q44 61 40.5 69 Q34.5 72 28.5 69 Z','#c9b46a',1) + `<text x="34.5" y="67" text-anchor="middle" font-size="7.5" font-weight="800" fill="#2b2a14" font-family="Georgia,serif">$</text>`;
const m16 = x => pth(`M${x-1.5} 70 L${x+1.5} 70 L${x+1.1} 40 L${x-1.1} 40 Z`,'#2f3236',1) + ln(`M${x} 40 V26`,'#2f3236',2.1) + pth(`M${x-1.8} 56 h3.6 v6 h-3.6 Z`,'#1f2124',0.8);
const ak47 = x => pth(`M${x-1.6} 72 L${x+1.6} 72 L${x+1.2} 44 L${x-1.2} 44 Z`,'#6b4423',1) + ln(`M${x} 44 V24`,'#2a2d30',1.8) + pth(`M${x-1.2} 56 Q${x+3.5} 57 ${x+4} 62 L${x+1.6} 62 Z`,'#2a2d30',0.8);

// ---------- Torres ----------
function parthenon(){
  let s = rect(14,78,72,6,'#cfc6ae',1.2) + rect(18,74.5,64,4,'#ddd5bd',1);
  for (let i=0;i<6;i++){ const x = 22 + i*11.2; s += rect(x-3.1,38,6.2,36.5,MARBLE,1) + ln(`M${x-1} 40 V73 M${x+1} 40 V73`,'#cfc6ae',0.6) + rect(x-4.2,35.6,8.4,2.6,'#e4dcc4',0.9) + rect(x-4,73.6,8,1.6,'#e4dcc4',0.6); }
  s += rect(17,31,66,5,'#e4dcc4',1.1) + ln('M21 33.6 H79','#a9a089',0.5);
  [24,32,40,48,56,64,72].forEach(x => { s += rect(x-1.8,31.7,3.6,3.6,'#b7683f',0.5); });
  s += pth('M15 31 L50 11 L85 31 Z','#d86e4a',1.3) + pth('M23 29.2 L50 14.4 L77 29.2 Z','#f0e8d2',0.9) + cir(50,24,2.6,'#d8a93f',0.7);
  return s;
}
function persepolis(){
  let s = rect(12,80,76,4.4,'#a99e84',1.2) + rect(16,76.5,68,3.8,'#bdb298',1);
  for (const x of [25,50,75]){
    s += rect(x-4.4,70,8.8,6.5,'#c9bf9f',0.9) + rect(x-2.8,34,5.6,36.5,'#d6ccaa',1) + ln(`M${x-0.9} 36 V69 M${x+0.9} 36 V69`,'#a99e84',0.6)
      + rect(x-4.4,31.5,8.8,3,'#c9bf9f',0.9)
      // capitel con dos toros
      + pth(`M${x-9.5} 28 Q${x-9.5} 22 ${x-5} 21.5 L${x-4.6} 31 L${x-9.5} 30.5 Z`,'#c9bf9f',1) + pth(`M${x+9.5} 28 Q${x+9.5} 22 ${x+5} 21.5 L${x+4.6} 31 L${x+9.5} 30.5 Z`,'#c9bf9f',1)
      + rect(x-5,19.5,10,10,'#d6ccaa',0.9) + ln(`M${x-8} 22.5 L${x-11.5} 21.5 M${x+8} 22.5 L${x+11.5} 21.5`,'#a99e84',1.1);
  }
  s += rect(15,15.5,70,5,'#bdb298',1) + ln('M18 18 H82','#8f866c',0.6);
  // disco alado (faravahar)
  s += cir(50,9,3.1,'#e0b040',0.8) + pth('M46.8 9 Q38 6 31 9.5 Q38 9.6 45.5 11.5 Z','#2f5fa8',0.8) + pth('M53.2 9 Q62 6 69 9.5 Q62 9.6 54.5 11.5 Z','#2f5fa8',0.8);
  return s;
}
function fabrica(){
  let s = rect(12,80,76,4.4,'#6a625a',1.2);
  s += pth('M16 80 V50 L30 40 V50 L44 40 V50 L58 40 V50 L72 40 V80 Z','#a64b36',1.4);
  for (let i=0;i<6;i++){ const x = 20 + i*8.6; s += rect(x,60,5.2,7,'#f1d889',0.7); }
  s += rect(24,70,10,10,'#4a2f22',0.9) + rect(74,52,12,28,'#8d3f2d',1.2);
  s += rect(78,24,5.6,28,'#7a3322',1) + rect(77,22,7.6,3,'#5c2619',0.9);
  s += pth('M80.8 21 Q85 17 82 12.5 Q86 9 82.5 5.5 Q78 9 80 13 Q76.5 16 80.8 21 Z','#c9c4bc',0.9);
  s += cir(46,52,7.4,'#c4161c',1.2) + star(46,52,5,'#f2c200','#7a5a00',0.4);
  s += rect(54,26,2,18,'#6b4a2a',0.6) + pth('M56 26 H70 L67 30.5 L70 35 H56 Z','#c4161c',0.9);
  return s;
}
function rascacielos(){
  let s = rect(14,80,72,4.4,'#4d5560',1.2);
  s += rect(26,56,48,24,'#6e7885',1.3) + rect(34,36,32,20,'#7c8794',1.3) + rect(41,16,18,20,'#8a95a2',1.3);
  s += ln('M50 16 V3','#6e7885',1.6) + dot(50,2.6,1.4,'#c62828');
  for (let r=0;r<5;r++) for (let c=0;c<7;c++){ const lit=(r*3+c)%3!==0; s += rect(29+c*6.2,58.5+r*4.4,3.4,2.6,lit?'#f1d889':'#4d5560',0.4); }
  for (let r=0;r<4;r++) for (let c=0;c<5;c++){ const lit=(r+c)%2===0; s += rect(36.5+c*5.6,39+r*4.1,3.2,2.4,lit?'#f1d889':'#4d5560',0.4); }
  for (let r=0;r<4;r++) for (let c=0;c<3;c++){ s += rect(43.6+c*4.6,19+r*4.2,2.8,2.3,(r+c)%2?'#f1d889':'#4d5560',0.4); }
  s += `<text x="50" y="76" text-anchor="middle" font-size="12" font-weight="800" fill="#e6c778" font-family="Georgia,serif" stroke="#17130f" stroke-width=".5">$</text>`;
  return s;
}
function huey(){
  let s = ln('M14 25 H86','#3f4636',2.2) + rect(48.5,25,3,6,'#3f4636',0.8);
  s += pth('M10 44 L40 40 L40 46 L12 47 Z','#556040',1.2) + pth('M7 36 L13 36 L16 46 L10 47 Z','#556040',1.1);   // cola
  s += pth('M38 32 Q42 28 60 28 Q76 29 80 44 Q82 54 70 57 H40 Q32 54 33 44 Q34 36 38 32 Z','#657249',1.5);
  s += pth('M62 31.5 Q73 33 77.5 43 L63 43 Z','#cfe3ec',1) + pth('M44 33 H58 V43 H44 Z','#cfe3ec',0.9);
  s += ln('M72 56 Q80 54 79 49','#17130f',0);
  s += ln('M36 68 H80 M44 58 V68 M68 58 V68','#2f3326',2) + ln('M32 70 Q36 68 40 68 M76 68 Q82 68 84 70','#2f3326',1.6);
  s += cir(48,50,2.3,'#e8e8e0',0.6) + star(48,50,2.3,'#f2f2f2','#17130f',0.3);
  s += rect(61,48,10,6,'#394028',0.8) + ln('M60 51 H72','#17130f',0.7);
  return s;
}
function aaGun(){
  let s = '';
  for (let i=0;i<5;i++) s += ell(22+i*12,80,7.5,4.6,'#a8946a',1.1);
  for (let i=0;i<4;i++) s += ell(28+i*12,75,7,4.2,'#bba67a',1.1);
  s += ln('M26 64 L50 72 L74 64','#4b5047',2.4) + cir(50,68,6,'#4f5948',1.3);
  s += pth('M44 62 H58 L56 52 H46 Z','#5c664f',1.3);
  s += pth('M52 58 L81 22 L84.5 25 L56 62 Z','#3d433a',1.4) + pth('M80 20.5 L86.5 15.5 L88 19 L82.5 23.5 Z','#2a2f27',1.1);
  s += ln('M47 50 L26 58','#3d433a',2) + cir(26,58.6,2.4,'#2a2f27',1);
  s += ln('M20 66 Q15 54 22 44 M24 66 Q22 52 31 46 M17 62 Q10 54 14 46','#4f7a3a',2.2) + [[22,44],[31,46],[14,46]].map(([x,y]) => cir(x,y,2.6,'#6f9a4a',0.8)).join('');
  return s;
}
function bicycleRider(){
  let s = '';
  // carga de bambú y sacos
  s += pth('M10 52 Q12 40 24 42 L38 49 L35 58 L14 58 Z','#c9b27a',1.2) + ln('M12 49 L36 53 M13 55 L34 57','#8f7a45',0.9)
     + pth('M18 40 Q20 30 31 32 L40 44 Z','#b8a164',1.1) + ln('M10 36 L40 46 M8 40 L38 50','#7f9a4a',2);
  // ruedas y cuadro
  s += cir(26,74,11.5,'none',2.2) + cir(26,74,11.5,'none',0.6) + cir(76,74,11.5,'none',2.2) + dot(26,74,1.8,'#17130f') + dot(76,74,1.8,'#17130f');
  s += ln('M26 74 L45 74 L56 56 L36 56 Z M45 74 L56 56 L76 74 M56 56 L62 52','#3a3a38',2.6) + ln('M62 52 H69 M36 56 L33 50','#3a3a38',2.2);
  // guerrillero
  s += pth('M50 36 L58 36 L60 56 L52 56 Z','#2a2d2f',1.2);                                   // torso
  s += pth('M52 54 L58 54 L64 68 L61 70 Z','#2a2d2f',1.1) + pth('M52 54 L47 66 L50 70 L56 58 Z','#2a2d2f',1.1);
  s += pth('M57 40 L64 46 L68 50 L66 53 L58 48 Z','#2a2d2f',1);
  s += cir(54.5,29.5,5.4,SKIN,1.2) + dot(53,29.6,0.8,O) + dot(56.5,29.6,0.8,O);
  s += `<g transform="translate(54.5 26) scale(.55) translate(-50 -26)">${HAT2.nonLa()}</g>`;
  s += pth('M64 49 L82 36 L84 38.5 L66 53 Z','#2a2d2f',0) + ln('M63 48 L80 38','#3a2c1c',1.8) + pth('M76 37 L84 31.5 L85.5 33.5 L78 39 Z','#2a2d30',0.8);
  return s;
}
function stauntonPiece(type, f, s2, a){
  // f: relleno, s2: sombra, a: acento (todo dentro de la caja 14..86 × 4..84)
  const body = (d) => pth(d, f, 1.5);
  let s = '';
  const baseP = body('M26 83 Q26 77 32 76 H68 Q74 77 74 83 Z') + ln('M30 79.5 H70', s2, 1.1);
  const collar = (y,w) => ell(50,y,w,2.6,f,1.4);
  if (type==='P'){
    s += baseP + body('M38 76 Q43 62 45 54 H55 Q57 62 62 76 Z') + collar(53,9) + cir(50,40,10,f,1.5) + ln('M44 38 Q46 34 50 34',s2,1.1);
  } else if (type==='R'){
    s += baseP + body('M36 76 L40 38 H60 L64 76 Z') + ell(50,38,12,3,f,1.4)
      + body('M34 38 V20 H41 V26 H46 V20 H54 V26 H59 V20 H66 V38 Q50 42 34 38 Z') + ln('M41 46 V70 M59 46 V70',s2,0.9);
  } else if (type==='N'){
    s += baseP + body('M32 76 Q34 56 42 46 Q38 42 36 36 L30 38 L28 31 Q38 14 52 12 Q66 14 70 34 Q72 56 68 76 Z')
      + pth('M44 18 L46.6 7.8 L53 15.5 Z',f,1.4) + dot(53,24,1.9,s2) + ln('M30 33 Q27 35 30 38',s2,1.2) + ln('M56 18 Q62 30 60 50',s2,1.5);
  } else if (type==='B'){
    s += baseP + body('M37 76 Q44 62 46 52 H54 Q56 62 63 76 Z') + collar(51.5,8.5)
      + body('M50 14 Q64 22 61 40 Q58 49 50 50 Q42 49 39 40 Q36 22 50 14 Z') + cir(50,10.5,3.1,f,1.3)
      + ln('M49 24 L56 33 M52 22 L58 29',s2,1.9);
  } else if (type==='Q'){
    s += baseP + body('M35 76 Q42 54 45 46 H55 Q58 54 65 76 Z') + collar(45.5,10.5)
      + body('M43 46 Q36 30 33 20 L38.5 22 L41 12 L45.6 21 L50 8 L54.4 21 L59 12 L61.5 22 L67 20 Q64 30 57 46 Z')
      + [[33,18.2],[41,9.8],[50,6],[59,9.8],[67,18.2]].map(([x,y]) => cir(x,y,2.2,f,1.2)).join('') + ln('M44 40 Q50 43 56 40',s2,1.1);
  } else { // K
    s += baseP + body('M35 76 Q42 54 45 46 H55 Q58 54 65 76 Z') + collar(45.5,10.5)
      + body('M43 46 Q36 33 40 25 Q44 20 50 20 Q56 20 60 25 Q64 33 57 46 Z') + collar(21,7.8)
      + ln('M50 6 V19 M44.2 11.6 H55.8',s2,0) + pth('M47.4 4.5 H52.6 V9.6 H57.6 V14.4 H52.6 V19 H47.4 V14.4 H42.4 V9.6 H47.4 Z',f,1.5);
  }
  return s;
}

// ---------- Facciones ----------
const STEEL2 = '#a9afb7';

FACTIONS.atenas = {
  name:'Atenas', era:'Pericles, 431 a. C.',
  blurb:'La Atenas de Pericles, con su flota imbatible, el Partenón en construcción y la democracia en plena madurez, enfrentó a Esparta y a Persia en el siglo de oro del mundo griego.',
  fill:'#2f6db3', base:'#2f6db3', baseDark:'#1c4678', rim:'#f1ead2',
  names:{K:'Pericles',Q:'Atenea',R:'Partenón',B:'Filósofo',N:'Jinete ateniense',P:'Hoplita'},
  draw:{
    P: () => figure({scale:.8, coat:'#e9e1cc', sleeve:'#e9e1cc', trousers:'#d9ceb0', boots:'#8a6a3d', bootTop:80, hat:HAT2.corinthian(),
          back: spearGreek(70.5),
          torso: pth('M39 40.5 Q50 37.5 61 40.5 L60 56 Q50 59 40 56 Z',BRONZE,1.1) + ln('M50 40 V57','#7a5a1e',0.8) + pth('M39 56 H61 V62 H39 Z','#c8553d',0.9),
          front: hoplonShield(33,53,'#2f6db3','#f1ead2')}),
    B: () => figure({scale:.9, longCoat:true, coat:'#efe9d8', sleeve:'#efe9d8', boots:'#8a6a3d', hat:HAT2.grayHair(), rightArm:'raised', face:longBeard('#d8d3c8'),
          torso: pth('M38 40 Q50 46 62 40 L66 82 Q50 86 34 82 Z','#e2dac2',0.9) + ln('M40 48 L62 70 M44 46 L58 78','#cfc6ae',0.8) + ln('M38.5 42 L36 80','#cfc6ae',0.8),
          front: ln('M74 27 L79 84','#6b4a2a',1.8) + pth('M75 25 Q80 22 82.5 27 L76.4 30 Z','#efe9d8',0.9)}),
    Q: () => figure({scale:.95, longCoat:true, coat:'#f3efe2', sleeve:'#f3efe2', boots:'#8a6a3d', hat:HAT2.corinthian('#2f6db3'), rightArm:'raised',
          torso: pth('M38 40 Q50 36 62 40 L60 52 Q50 56 40 52 Z','#c9a24a',1) + cir(50,46,2.4,'#7a1e2e',0.8) + ln('M37 66 Q50 70 63 66','#2f6db3',2.2) + ln('M38 74 Q50 78 62 74','#c9a24a',1.4)
                 + ln('M40 52 L36 80 M60 52 L64 80','#d6cdb4',0.8),
          back: hoplonShield(31,56,'#d8c07a','#7a5a1e') + ln('M70.5 85 V10','#7a5230',1.8),
          front: pth('M72 23 L74 15 L77 24 Z','#c9a24a',0.8) + ln('M75.3 17 V12','#7a5230',1.6) + ell(79.2,8.4,2.5,3.2,'#6b5a3e',0.7)}),
    K: () => figure({scale:1, longCoat:true, coat:'#2f6db3', sleeve:'#2f6db3', boots:'#8a6a3d', hat:HAT2.pushedBack(), rightArm:'raised', face:longBeard('#4a3a2a'),
          torso: pth('M38 40 Q50 36.5 62 40 L66 82 Q50 85 34 82 Z','#e9e1cc',1) + pth('M38 40 L62 70 L58 76 L36 50 Z','#1f4f8a',0.9)
                 + ln('M36 78 Q50 82 64 78','#c9a24a',2) + ln('M36 74 Q50 78 64 74','#c9a24a',0.9),
          front: ln('M74 27 L79 84','#6b4a2a',1.8) + cir(75,25.4,2.4,'#c9a24a',0.7)}),
    N: () => horseman({horse:'#8a6a47', horseDark:'#6e5334', mane:'#2d2118', cloth:'#c8553d', clothTrim:'#f1ead2',
          coat:'#e9e1cc', trousers:'#d9ceb0', boots:'#8a6a3d', hat:HAT2.corinthian('#2f6db3'), weapon:'lance',
          torso: pth('M51.5 32.5 Q56 31 60.5 32.5 L59.8 44 Q56 46 52.2 44 Z',BRONZE,1)}),
    R: () => parthenon()
  }
};

FACTIONS.persia = {
  name:'Persia', era:'Jerjes I, 480 a. C.',
  blurb:'El Imperio aqueménida de Jerjes lanzó contra Grecia el mayor ejército de su tiempo: Inmortales, caballería escita y una flota con la reina Artemisia al mando de sus naves.',
  fill:'#7a2f8f', base:'#7a2f8f', baseDark:'#4d1b5c', rim:'#e0b040',
  names:{K:'Jerjes I',Q:'Artemisia de Caria',R:'Persépolis',B:'Mago zoroástrico',N:'Jinete persa',P:'Inmortal'},
  draw:{
    P: () => figure({scale:.8, coat:'#d1a233', sleeve:'#d1a233', trousers:'#2f5fa8', boots:'#6a4a2a', bootTop:78, hat:HAT2.immortal(), face:ln('M43.5 33.5 Q50 38.5 56.5 33.5','#2b1f16',1.6),
          back: spear(70.5) + ln('M70.5 62 H80','#6b4a2a',0),
          torso: [[43,46],[50,46],[57,46],[46.5,51.5],[53.5,51.5],[43,57],[50,57],[57,57]].map(([x,y]) => `<path d="M${x} ${y-2.2} l2.2 2.2 l-2.2 2.2 l-2.2 -2.2 Z" fill="#7a2f8f" stroke="#17130f" stroke-width=".4"/>`).join(''),
          front: pth('M25 53 Q33 45 41 53 Q38 61 33 62 Q28 61 25 53 Z','#c9a96a',1.2) + ln('M27 53 Q33 49 39 53 M33 47 V61','#7a5a1e',0.8)}),
    B: () => figure({scale:.9, longCoat:true, coat:'#f3efe2', sleeve:'#f3efe2', boots:'#8a6a3d', hat:HAT2.magus(), rightArm:'raised',
          torso: pth('M38 40 Q50 45 62 40 L60 46 Q50 51 40 46 Z','#e0b040',0.9) + ln('M44 56 H56 M44 63 H56','#d9d2bd',0.8) + ln('M36 78 Q50 82 64 78','#7a2f8f',1.8),
          front: ln('M74 27 L79 84','#6b4a2a',1.6) + ln('M72 24 L80 19 M72 29 L80 26','#e0b040',1.4)
                 + ln('M50 56 V80','#d9d2bd',0)}),
    Q: () => figure({scale:.95, longCoat:true, coat:'#2f5fa8', sleeve:'#2f5fa8', boots:'#8a6a3d', hat:pth('M41 28 Q40 13 50 12.5 Q60 13 59 28 Q56 21 50 21 Q44 21 41 28 Z','#17130f',1) + pth('M43 13.5 Q50 3.5 57 13.5 Q50 10.5 43 13.5 Z','#e0b040',1) + dot(50,8,1.5,'#c62828') + ln('M41 26 Q38 33 42 38 M59 26 Q62 33 58 38','#17130f',2.4),
          torso: pth('M38.5 41 Q50 37.5 61.5 41 L60 54 Q50 58 40 54 Z',STEEL2,1.1) + [[43,45],[48,47],[53,45],[57,48],[45,51],[51,53],[56,52]].map(([x,y]) => cir(x,y,1.1,'#8d939b',0.4)).join('')
                 + ln('M37 66 Q50 70 63 66','#e0b040',2.2) + ln('M37 74 Q50 78 63 74','#7a2f8f',1.6),
          back: ln('M70.5 85 V16','#6b4a2a',1.8) + pth('M70.5 6 L74 16 L70.5 14 L67 16 Z','#c9ccd0',0.8) + pth('M66 18 H86 L83 25 L86 32 H66 Z','#7a2f8f',1) + star(75,25,3.2,'#e0b040','#17130f',0.4)}),
    K: () => figure({scale:1, longCoat:true, coat:'#7a2f8f', sleeve:'#7a2f8f', boots:'#8a6a3d', hat:HAT2.tiara(), rightArm:'raised', face:squareBeard('#241a14'),
          torso: pth('M38 40 Q50 36.5 62 40 L66 82 Q50 85 34 82 Z','#7a2f8f',1) + pth('M45 38 L50 82 L55 38 Z','#e0b040',0.8)
                 + [48,56,64,72].map(y => ln(`M36 ${y} Q50 ${y+4} 64 ${y}`,'#e0b040',1.1)).join('') + ln('M38 44 Q50 50 62 44','#e0b040',2)
                 + dot(43.4,30.6,0,'#e0b040'),
          front: ln('M74 27 L79 84','#e0b040',2) + cir(74.5,25,3.1,'#e0b040',0.8) + dot(74.5,25,1.2,'#c62828')}),
    N: () => horseman({horse:'#d9d2c0', horseDark:'#b9b19c', mane:'#3a2f24', cloth:'#7a2f8f', clothTrim:'#e0b040',
          coat:'#2f5fa8', trousers:'#d1a233', boots:'#6a4a2a', hat:HAT2.kyrbasia('#7a2f8f'), weapon:'bow',
          torso: ln('M51.5 36 H60.5 M51.7 40 H60.3 M51.9 44 H60.1','#e0b040',1.1)}),
    R: () => persepolis()
  }
};

FACTIONS.proletariado = {
  name:'Proletariado', era:'Rusia revolucionaria, 1917',
  blurb:'Obreros, soldados y campesinos que tomaron el Palacio de Invierno en 1917 bajo la dirección de Lenin, con Nadezhda Krúpskaya organizando la educación y el partido.',
  fill:'#c4161c', base:'#c4161c', baseDark:'#7d0d12', rim:'#f2c200',
  names:{K:'Vladímir Lenin',Q:'Nadezhda Krúpskaya',R:'Fábrica',B:'Agitador con bandera',N:'Caballería roja',P:'Obrero'},
  draw:{
    P: () => figure({scale:.8, coat:'#4f5b6b', sleeve:'#4f5b6b', trousers:'#3c4552', boots:'#2a2622', bootTop:80, hat:HAT2.workerCap(),
          back: hammer(70.5),
          torso: pth('M44 44 H56 V62 H44 Z','#445060',0.9) + ln('M44 44 L42 40 M56 44 L58 40','#3c4552',1.2) + rect(46,50,8,5,'#3a4452',0.6)
                 + pth('M62 46 H66.4 V51 H62 Z','#c4161c',0.8)}),
    B: () => figure({scale:.9, longCoat:true, coat:'#3a3733', sleeve:'#3a3733', boots:'#1a1a1a', hat:HAT2.flatCap('#2d2a28'), rightArm:'raised', face:mustache('#3a2a1c'),
          torso: pth('M44 39.5 H56 L54.5 48 H45.5 Z','#efe9d8',0.8) + pth('M49 42 H51 L52 54 L50 56 L48 54 Z','#c4161c',0.6) + ln('M38.5 58 H61.5 M38 70 H62','#2a2724',1),
          back: redFlag(70.5)}),
    Q: () => figure({scale:.95, longCoat:true, coat:'#4a3f46', sleeve:'#4a3f46', boots:'#1a1a1a', hat:HAT2.bun('#6a5442'), face:glasses(), rightArm:'chest',
          torso: pth('M44 39.5 H56 L54.5 45 H45.5 Z','#efe9d8',0.8) + ln('M38.5 62 H61.5','#3a3036',1.2) + pth('M46 52 H54 V58 H46 Z','#c4161c',0.7),
          front: bookSmall() + ln('M36 72 H64','#3a3036',1)}),
    K: () => figure({scale:1, coat:'#3a3733', sleeve:'#3a3733', trousers:'#34312d', boots:'#1a1a1a', bootTop:78, hat:'', rightArm:'raised', face:goatee('#7a4b24') + ln('M42.5 24 Q50 17 57.5 24','#00000000',0)
          + pth('M41.8 28 Q42.4 21 47 19.5 Q50 19 53 19.5 Q57.6 21 58.2 28 Q56 22.5 50 21.5 Q44 22.5 41.8 28 Z','#d6a56a',0.8),
          torso: pth('M44 39 H56 L54.5 50 H45.5 Z','#efe9d8',0.8) + pth('M49 41 H51 L52 56 L50 58 L48 56 Z','#c4161c',0.7) + pth('M44 46 L50 60 L56 46 L56 62 H44 Z','#2d2a28',0.8)
                 + ln('M38.5 62 H61.5','#26231f',1),
          front: ln('M73.5 25 L80 12','#efe9d8',0) + pth('M76 12.5 L84 7.5 L85.5 10.5 L77.2 15 Z','#efe9d8',0.7),
          back: redFlag(70.5)}),
    N: () => horseman({horse:'#6e4a2c', horseDark:'#563a22', mane:'#1f150d', cloth:'#c4161c', clothTrim:'#f2c200',
          coat:'#7b7f5c', trousers:'#3c4552', boots:'#2a2622', hat:HAT.budenovka(), weapon:'saber',
          torso: star(56,40,2.6,'#c4161c','#17130f',0.3)}),
    R: () => fabrica()
  }
};

FACTIONS.burguesia = {
  name:'Burguesía', era:'Capitalismo liberal, 1871–1957',
  blurb:'Empresarios, banqueros y pensadores del libre mercado: de la revolución marginalista de Carl Menger en Viena al individualismo radical de Ayn Rand en Nueva York.',
  fill:'#1f4d3a', base:'#1f4d3a', baseDark:'#12301f', rim:'#d4af37',
  names:{K:'Carl Menger',Q:'Ayn Rand',R:'Rascacielos',B:'Banquero',N:'Magnate a caballo',P:'Comerciante'},
  draw:{
    P: () => figure({scale:.8, coat:'#4b4540', sleeve:'#4b4540', trousers:'#3c3733', boots:'#1a1a1a', bootTop:80, hat:HAT2.bowler(), face:mustache('#2a1d12'),
          torso: pth('M44 40 H56 L54.5 52 H45.5 Z','#efe9d8',0.8) + pth('M46 44 H54 V60 H46 Z','#6b5a3e',0.8) + ln('M46 50 H54 M46 55 H54','#8a7650',0.6)
                 + ln('M48 44 Q50 48 52 44','#d4af37',0.9) + dot(50,52,0.9,'#d4af37'),
          front: briefcase()}),
    B: () => figure({scale:.9, longCoat:true, coat:'#26231f', sleeve:'#26231f', boots:'#1a1a1a', hat:HAT2.topHat(), rightArm:'raised', face:mustache('#8a8780') + ln('M44 30.3 H49 M51 30.3 H56','#00000000',0),
          torso: pth('M44 39.5 H56 L54.5 52 H45.5 Z','#efe9d8',0.8) + pth('M46 44 H54 V66 H46 Z','#8a2f3a',0.8) + ln('M50 48 V66','#d4af37',0.8) + ln('M53 54 Q58 58 56 66','#d4af37',0.9) + cir(56,67,1.4,'#d4af37',0.5),
          front: ln('M75 26 L79 84','#3a2a18',1.8) + cir(75,24.5,2.6,'#d4af37',0.7), back: moneyBag()}),
    Q: () => figure({scale:.95, longCoat:true, coat:'#1d1b19', sleeve:'#1d1b19', boots:'#1a1a1a', hat:HAT2.bob('#17110e'), rightArm:'chest',
          face:ln('M44.5 28.4 Q47 27.4 49.6 28.4 M50.4 28.4 Q53 27.4 55.5 28.4','#17110e',1.1) + pth('M47.3 34.8 Q50 36.4 52.7 34.8 Q50 35.7 47.3 34.8 Z','#a02a2a',0.5),
          torso: pth('M44 39.5 H56 L54.5 46 H45.5 Z','#efe9d8',0.8) + `<text x="50" y="57" text-anchor="middle" font-size="9" font-weight="800" fill="#d4af37" font-family="Georgia,serif">$</text>` + ln('M38.5 66 H61.5','#3a3733',1.2),
          front: ln('M57 49 L66 44','#17130f',1.3) + ln('M66 44 L72 41.5','#e8dfc8',1.2) + dot(72.6,41.2,1,'#e0603a')}),
    K: () => figure({scale:1, coat:'#2d2a28', sleeve:'#2d2a28', trousers:'#3a3733', boots:'#1a1a1a', bootTop:78, rightArm:'chest',
          hat:pth('M41.5 26 Q41 14.5 50 14 Q59 14.5 58.5 26 Q57 20.5 50 20 Q43 20.5 41.5 26 Z','#8a8780',1),
          face:mustache('#8a8780') + pth('M45 31.8 Q50 34.5 55 31.8 Q52 34 50 33.6 Q48 34 45 31.8 Z','#00000000',0),
          torso: pth('M44 39 H56 L54.5 52 H45.5 Z','#efe9d8',0.8) + pth('M45 42 L50 62 L55 42 L55 64 H45 Z','#5a4a35',0.8) + ln('M50 44 V62','#3a2f20',0.6)
                 + ln('M44 52 Q50 56 56 52','#d4af37',1.1) + dot(50,57,0.9,'#d4af37') + ln('M38.5 64 H61.5','#26231f',1),
          front: pth('M72 24 L80.5 23.5 L80 36 L72.5 36.5 Z','#efe9d8',0.8) + ln('M74 28 H78.6 M74 31.5 H78.6','#7a6a4a',0.7)}),
    N: () => horseman({horse:'#4e3b2a', horseDark:'#3a2b1d', mane:'#17110e', cloth:'#1f4d3a', clothTrim:'#d4af37',
          coat:'#2d2a28', trousers:'#efe9d8', boots:'#1a1a1a', hat:HAT2.topHat(), weapon:'carbine',
          torso: pth('M52 33 H60 L59 44 H53 Z','#efe9d8',0.7)}),
    R: () => rascacielos()
  }
};

FACTIONS.eeuu = {
  name:'Estados Unidos', era:'Guerra de Vietnam, 1968',
  blurb:'El ejército estadounidense en Vietnam: infantes, caballería aérea con helicópteros Huey y corresponsales que llevaron la guerra a las pantallas del mundo.',
  fill:'#2a4a8a', base:'#2a4a8a', baseDark:'#182d57', rim:'#f2f2f2', badgeFill:'#b3202a',
  names:{K:'General Westmoreland',Q:'Corresponsal de guerra',R:'Helicóptero Huey',B:'Capellán militar',N:'Jinete de la 1.ª de Caballería',P:'Infante GI'},
  draw:{
    P: () => figure({scale:.8, coat:'#5b6540', sleeve:'#5b6540', trousers:'#5b6540', boots:'#1d1b19', bootTop:76, hat:HAT2.helmetM1(),
          back: m16(70.5),
          torso: pth('M40 42 H60 V58 H40 Z','#4b5435',0.9) + ln('M40 47 H60 M40 52 H60','#3b4329',0.8) + rect(44,45,4,6,'#3b4329',0.6) + rect(52,45,4,6,'#3b4329',0.6) + rect(46,55,8,4,'#3b4329',0.6)
                 + pth('M38.6 58.5 H61.4 V62 H38.6 Z','#3b4329',0.8)}),
    B: () => figure({scale:.9, coat:'#5b6540', sleeve:'#5b6540', trousers:'#5b6540', boots:'#1d1b19', bootTop:76, hat:HAT2.helmetM1(), rightArm:'chest',
          torso: pth('M40 42 H60 V60 H40 Z','#4b5435',0.8) + rect(49,44,2,10,'#efe9d8',0) + pth('M47 44 H53 V47 H47 Z','#efe9d8',0) + ln('M50 42.5 V54 M46.6 46 H53.4','#e8e8e0',1.7) + cir(50,46,5,'none',0),
          front: pth('M28 50 L40 48 L41 60 L29 62 Z','#2b2a26',1) + ln('M32 56 H38','#e0b040',0.9) + ln('M35 52 V60','#e0b040',0.9)}),
    Q: () => figure({scale:.95, coat:'#6b7050', sleeve:'#6b7050', trousers:'#5b6540', boots:'#2a2622', bootTop:78, hat:HAT2.helmetM1() , rightArm:'chest',
          face:pth('M44.5 33 Q50 38 55.5 33 Q50 35.5 44.5 33 Z','#00000000',0) + pth('M41 30 Q40 36 42.5 40 L44 31 Z','#8a5a2a',1) + pth('M59 30 Q60 36 57.5 40 L56 31 Z','#8a5a2a',1),
          torso: pth('M40 42 H60 V58 H40 Z','#566045',0.8) + ln('M40 62 H60','#3b4329',1),
          front: pth('M52 46 H66 V55 H52 Z','#2b2a26',1) + cir(59,50.5,3.2,'#6c7076',0.9) + cir(59,50.5,1.6,'#9fc6e0',0.5) + rect(54,44.6,4,2,'#2b2a26',0.6)}),
    K: () => figure({scale:1, coat:'#5b6540', sleeve:'#5b6540', trousers:'#4f5a37', boots:'#1d1b19', bootTop:74, rightArm:'raised',
          hat:pth('M39.5 26 Q41 13 50 12.5 Q59 13 60.5 26 Q50 23 39.5 26 Z','#4a5433',1.1) + pth('M39.5 24 Q50 20.5 60.5 24 L60 26.4 Q50 23.4 40 26.4 Z','#1d1b19',0.8) + star(50,18,2.6,'#f2f2f2','#17130f',0.3) + ln('M42 24 H58','#d4af37',1),
          face:ln('M46 36.2 Q50 38.2 54 36.2','#17130f',1),
          torso: pth('M44 39 H56 L54.5 52 H45.5 Z','#efe9d8',0.8) + pth('M49 41 H51 L52 54 L50 56 L48 54 Z','#2d3f66',0.7) + [[43,45],[46,45],[49,45]].map(([x,y]) => rect(x,y,2.4,1.6,'#c4161c',0.3)+rect(x,y+1.6,2.4,1.6,'#2a4a8a',0.3)).join('')
                 + star(40.8,41.5,1.6,'#f2f2f2','#17130f',0.2) + star(59.2,41.5,1.6,'#f2f2f2','#17130f',0.2) + ln('M38.5 62 H61.5','#2d3a24',1) + pth('M47 59 H53 V63 H47 Z','#d4af37',0.6),
          front: pth('M72 17 L84 15 L84.6 26.4 L72.6 28 Z','#2a4a8a',1) + pth('M72 17 L84 15 L83.6 20 L72.2 21.8 Z','#b3202a',0.6) + star(78,22.5,2.2,'#f2f2f2','#17130f',0.2)}),
    N: () => horseman({horse:'#8a5a34', horseDark:'#6e4527', mane:'#2a1c10', cloth:'#f2c200', clothTrim:'#2a4a8a',
          coat:'#5b6540', trousers:'#4f5a37', boots:'#1d1b19', hat:HAT2.stetson(), weapon:'carbine', wood:'#2f3236',
          torso: pth('M52 33 H60 L59 44 H53 Z','#f2c200',0.7) + ln('M54.5 36 L57.5 36 L56 40.4 Z','#7a5a00',0.6)}),
    R: () => huey()
  }
};

FACTIONS.vietnam = {
  name:'Vietnam', era:'Ho Chi Minh, 1946–1975',
  blurb:'Las fuerzas de la resistencia vietnamita bajo Ho Chi Minh, con guerrilleros del Viet Cong, bicicletas de carga por la senda de Ho Chi Minh y defensas antiaéreas, frente a la mayor potencia militar.',
  fill:'#b3202a', base:'#b3202a', baseDark:'#6e1118', rim:'#f2c200', badgeFill:'#b3202a',
  names:{K:'Ho Chi Minh',Q:'Trưng Trắc',R:'Cañón antiaéreo',B:'Monje budista',N:'Guerrillero en bicicleta',P:'Guerrillero'},
  draw:{
    P: () => figure({scale:.8, coat:'#2a2d2f', sleeve:'#2a2d2f', trousers:'#2a2d2f', boots:'#6a4a2a', bootTop:82, hat:HAT2.nonLa(),
          back: ak47(70.5),
          torso: ln('M44 40 L50 56 L56 40','#3a3d40',0.9) + ln('M44 56 L56 62 M56 56 L44 62','#c9b27a',1.4) + dot(50,50,0.9,'#c9b27a'),
          front: ln('M39 43 L61 60','#7a2f2f',1.6)}),
    B: () => figure({scale:.9, longCoat:true, coat:'#e0902a', sleeve:'#e0902a', boots:'#6a4a2a', hat:'', rightArm:'chest',
          face:ln('M44.8 27 Q50 24.6 55.2 27','#17130f',0) + ln('M45 36 Q50 37.5 55 36','#17130f',0),
          torso: pth('M38 40 Q50 36.5 62 40 L60 78 Q50 82 40 78 Z','#c97a1c',0.9) + pth('M38 40 L62 70 L58 76 L36 50 Z','#e0902a',0.9) + ln('M37 54 L58 76','#a85e12',0.8)
                 + [[43,48],[45,52],[47.5,55],[51,56.5],[55,55]].map(([x,y]) => cir(x,y,1.5,'#6b3a1a',0.6)).join(''),
          front: ln('M76 20 V84','#6b4a2a',1.6) + cir(76,18,3.2,'none',1.3) + ln('M76 14.5 V21.5','#d4af37',0.9)}),
    Q: () => figure({scale:.95, longCoat:true, skin:SKIN, coat:'#f2c200', sleeve:'#f2c200', boots:'#6a4a2a', hat:pth('M41 29 Q39.5 14 50 13.5 Q60.5 14 59 29 Q57 21 50 20.5 Q43 21 41 29 Z','#17130f',1) + pth('M43 14.5 L50 4 L57 14.5 Q50 11.5 43 14.5 Z','#c4161c',1) + star(50,9.3,2.2,'#f2c200','#7a5a00',0.3), rightArm:'raised',
          torso: pth('M38.5 41 Q50 37.5 61.5 41 L60.5 56 Q50 60 39.5 56 Z','#b3202a',1) + star(50,48,4,'#f2c200','#7a5a00',0.3) + ln('M38 66 Q50 70 62 66','#b3202a',2.2),
          front: ln('M74 27 L82 6','#d9dce0',1.8) + ln('M71.3 25.7 L77 28','#d4af37',1.6)}),
    K: () => figure({scale:1, coat:'#8a7a58', sleeve:'#8a7a58', trousers:'#7a6c4e', boots:'#3b2a1e', bootTop:84, rightArm:'down',
          hat:hairCap('#b9b4aa'), face:goatee('#cfcac0') + ln('M44.8 33.6 Q50 31.6 55.2 33.6','#cfcac0',0.8) + ln('M44 28.4 Q47 27.4 49.6 28.4 M50.4 28.4 Q53 27.4 56 28.4','#8a857a',0.8),
          torso: pth('M44.5 38.5 H55.5 V42 H44.5 Z','#8a7a58',0.7) + ln('M50 42 V60','#6b5d40',0.9) + rect(42,50,5.4,5.6,'#7a6c4e',0.6) + rect(52.6,50,5.4,5.6,'#7a6c4e',0.6)
                 + dot(50,46,0.8,'#d4af37') + dot(50,52,0.8,'#d4af37') + dot(50,58,0.8,'#d4af37') + ln('M38.5 63 H61.5','#6b5d40',1),
          back: ln('M70.5 85 V16','#6b4a2a',1.8) + pth('M71 17 H92 V34 H71 Z','#b3202a',1) + star(81.5,25.5,5.4,'#f2c200','#7a5a00',0.4)}),
    N: () => bicycleRider(),
    R: () => aaGun()
  }
};

// ---------- Reinas propias de cada ejército ----------
const lips = () => pth('M47.3 34.8 Q50 36.6 52.7 34.8 Q50 35.7 47.3 34.8 Z','#a02a2a',0.5);
const lashes = () => ln('M44.5 28.5 Q47 27.2 49.6 28.5 M50.4 28.5 Q53 27.2 55.5 28.5','#17110e',1);
const longHair = c => hairCap(c) + pth('M40.8 29 Q37.5 44 42.5 54 L45 38 Z',c,1) + pth('M59.2 29 Q62.5 44 57.5 54 L55 38 Z',c,1);
const diadem = (c='#e0b040') => pth('M42 22.5 L44 15.5 L47 20 L50 13.5 L53 20 L56 15.5 L58 22.5 Q50 20 42 22.5 Z',c,1) + [44,50,56].map((x,i) => dot(x,i===1?15.5:17.8,1,'#c62828')).join('');
const muralCrown = () => pth('M41.5 24 L41.5 14 H44.5 V16.6 H47.2 V14 H52.8 V16.6 H55.5 V14 H58.5 V24 Q50 21 41.5 24 Z','#d4af37',1.1) + ln('M41.8 19.5 H58.2','#8a6a1a',0.8);
const quetzal = () => pth('M43 24 Q36 8 42 -2 Q44 8 47 13 Z','#2f8f5a',1) + pth('M57 24 Q64 8 58 -2 Q56 8 53 13 Z','#2f8f5a',1) + pth('M45 22 Q43 4 50 -4 Q57 4 55 22 Q50 19 45 22 Z','#2aa6a0',1.1) + ln('M50 -2 V18','#e0b040',1)
   + rect(42.4,21,15.2,2.6,'#e0b040',0.7);
const boqtaq = () => pth('M43 24 L45 6 Q50 1 55 6 L57 24 Q50 21 43 24 Z','#b3402c',1.2) + ln('M44.4 15 H55.6 M44 20 H56','#e0b040',1.2) + ln('M50 1.5 V -3.5','#e0b040',1.4) + pth('M48 -3 L50 -6.5 L52 -3 Z','#2f8f5a',0.8)
   + ln('M41.6 27 Q39 37 41.6 46 M58.4 27 Q61 37 58.4 46','#17130f',2.2);
const libertyCrown = () => [[-38,-6],[-26,-10],[-13,-12],[0,-13],[13,-12],[26,-10],[38,-6]].map(([a,h]) => `<path d="M${50+a*0.18} 22.5 L${50+a*0.42} ${22.5+h*1.1}" stroke="#d9c970" stroke-width="2.1" stroke-linecap="round"/>`).join('') + pth('M41.5 26 Q41 14.5 50 14 Q59 14.5 58.5 26 Q56 21 50 20.6 Q44 21 41.5 26 Z','#4f9e8a',1.1) + rect(41.5,21,17,2,'#d9c970',0.5);
const bonnet = () => pth('M41 28 Q39.5 14 50 13 Q60.5 14 59 28 Q57 21 50 20.5 Q43 21 41 28 Z','#e8e4da',1) + ln('M43 15 Q50 10 57 15','#c9c4b8',0.8) + diadem('#d4af37').replace(/M42 22.5/,'M42 20');

FACTIONS.napoleon.names.Q = 'Emperatriz Josefina';
FACTIONS.napoleon.draw.Q = () => figure({scale:.95, longCoat:true, coat:'#f1ece0', sleeve:'#f1ece0', boots:'#8a6a3d', hat:longHair('#4a3220').replace('M40.8 29','M40.8 29') + diadem(), face:lips()+lashes(), rightArm:'chest',
    torso: pth('M39 41 Q50 37 61 41 L60 50 Q50 54 40 50 Z','#f1ece0',0.9) + ln('M40 51 Q50 55 60 51','#1f6b3f',2.6) + ln('M36 78 Q50 82 64 78','#c9a24a',1.4)
           + [43,46,50,54,57].map(x => dot(x,44.8,0.8,'#efe6cf')).join('') + ln('M41 54 L37 80 M59 54 L63 80','#d6cdb4',0.8),
    front: pth('M29 52 H38 V62 H29 Z','#6b4423',0.9) + ln('M31 55 H36','#e0b040',0.8)});

FACTIONS.mongol.names.Q = 'Börte, gran jatún';
FACTIONS.mongol.draw.Q = () => figure({scale:.95, longCoat:true, coat:'#b3402c', sleeve:'#b3402c', boots:'#3b2a1e', hat:boqtaq(), face:lips()+lashes(), rightArm:'chest',
    torso: pth('M38 40 Q50 36.5 62 40 L66 81 Q50 84 34 81 Z','#b3402c',0.9) + pth('M38 40 L62 66 L58 72 L36 50 Z','#2f6db3',0.9) + ln('M36 66 Q50 70 64 66','#e0b040',2) + ln('M36 74 Q50 78 64 74','#e0b040',1.2)
           + ln('M38.5 42 L40 80','#e0b040',1), front: cir(33,52,3.2,'#e0b040',0.8) + ln('M33 55 V64','#e0b040',1.2)});

FACTIONS.soviet.names.Q = 'Madre Patria';
FACTIONS.soviet.draw.Q = () => figure({scale:.95, longCoat:true, coat:'#d9dde2', sleeve:'#d9dde2', boots:'#8a8d92', hat:longHair('#2a1f18'), face:lips()+lashes(), rightArm:'raised',
    torso: pth('M38 40 Q50 36.5 62 40 L60 52 Q50 56 40 52 Z','#c4161c',0.9) + star(50,46,3.4,'#f2c200','#7a5a00',0.3) + ln('M37 66 Q50 70 63 66','#c4161c',2.4) + ln('M40 52 L36 80 M60 52 L64 80','#b9bdc3',0.8),
    front: ln('M74 27 L88 -2','#c9ccd0',2.2) + ln('M71.6 25.8 L77 28.5','#8a8d92',2.2)});

FACTIONS.wehrmacht.names.Q = 'Germania';
FACTIONS.wehrmacht.draw.Q = () => figure({scale:.95, longCoat:true, coat:'#4a5044', sleeve:'#4a5044', boots:'#151515', hat:longHair('#d6b36a') + muralCrown(), face:lips()+lashes(), rightArm:'chest',
    torso: pth('M39 41 Q50 37 61 41 L60 53 Q50 57 40 53 Z','#a9afb7',1.1) + ln('M44 44 L56 50 M56 44 L44 50','#8d939b',0.8) + ln('M37 66 Q50 70 63 66','#c9ccd0',2) + ln('M40 53 L36 80 M60 53 L64 80','#3a3f37',0.8),
    front: pth('M26 50 H40 V66 Q33 72 26 66 Z','#17130f',1) + pth('M26 55 H40 V60 H26 Z','#c62828',0.6) + pth('M26 60 H40 V64.5 Q33 69 26 64.5 Z','#e0b040',0.6)});

FACTIONS.azteca.names.Q = 'Reina Tecuichpo';
FACTIONS.azteca.draw.Q = () => figure({scale:.95, longCoat:true, skin:AZ_SKIN, coat:'#f3efe2', sleeve:'#f3efe2', boots:'#6a4a2a', hat:longHair('#17110e') + quetzal(), face:lips()+lashes(), rightArm:'chest',
    torso: pth('M38.5 41 Q50 37.5 61.5 41 L60.5 57 Q50 61 39.5 57 Z','#f3efe2',0.9) + ln('M40 46 H60 M40.5 51 H59.5 M41 56 H59','#c8102e',1.4) + [[44,44],[50,44],[56,44]].map(([x,y]) => dot(x,y,1,'#2aa6a0')).join('')
           + ln('M36 70 Q50 74 64 70','#c8102e',2) + ln('M36 77 Q50 81 64 77','#2aa6a0',1.6),
    front: cir(33,57,3.4,'#e0b040',0.8) + ln('M33 60.5 V66','#2f8f5a',1.6)});

FACTIONS.britanicos.names.Q = 'Reina Carlota';
FACTIONS.britanicos.draw.Q = () => figure({scale:.95, longCoat:true, coat:'#2f4f9a', sleeve:'#2f4f9a', boots:'#1a1a1a', hat:bonnet(), face:lips()+lashes(), rightArm:'raised',
    torso: pth('M38.5 41 Q50 36 61.5 41 L60.5 50 Q50 54 39.5 50 Z','#f3efe2',0.9) + [[42,43.5],[46,45.5],[50,46.5],[54,45.5],[58,43.5]].map(([x,y]) => cir(x,y,1.1,'#17130f',0.3)).join('')
           + pth('M36 66 Q50 74 64 66 L66 82 Q50 86 34 82 Z','#243f7f',0.8) + ln('M36 62 Q50 66 64 62','#e0b040',1.8) + cir(50,52,1.6,'#c62828',0.5),
    front: ln('M74 30 L77 84','#e0b040',1.8) + cir(74,28,3.4,'#e0b040',0.8) + dot(74,28,1.3,'#c62828')});

FACTIONS.eeuu.names.Q = 'Dama Libertad';
FACTIONS.eeuu.draw.Q = () => figure({scale:.95, longCoat:true, coat:'#6fb3a0', sleeve:'#6fb3a0', boots:'#4f7d70', hat:longHair('#5f9a88') + libertyCrown(), face:lips()+lashes(), rightArm:'raised',
    torso: pth('M38.5 41 Q50 37 61.5 41 L60.5 55 Q50 59 39.5 55 Z','#7fc3b0',0.9) + ln('M41 44 Q50 52 59 44 M42 52 L58 52','#4f9e8a',1) + ln('M36 72 Q50 76 64 72','#4f9e8a',1.6),
    front: ln('M74 27 L77 6','#6b4a2a',1.8) + pth('M72 6.5 Q75 -2 78 6.5 Z','#f2c200',0.8) + pth('M72.6 6 H77.4 L76.6 12 H73.4 Z','#c9a24a',0.8) + pth('M74.5 3 Q75.5 -1 76.6 3 Q75.6 5 74.5 3 Z','#e8742a',0.4)
           + pth('M26 50 H38 V62 H26 Z','#d9c970',1) + ln('M28 54 H36 M28 57 H36','#8a7a30',0.7)});

for (const [k, col, shade, accent, nm, blurb] of [
  ['blancas', '#f4efe3', '#b9ae92', '#8a7a52', 'Piezas blancas', 'El juego clásico: piezas de ajedrez tipo Staunton, talladas en marfil.'],
  ['negras',  '#2a2623', '#0d0b0a', '#d4af37', 'Piezas negras', 'El juego clásico: piezas de ajedrez tipo Staunton, talladas en ébano.']
]){
  FACTIONS[k] = {
    name:nm, era:'Ajedrez clásico', blurb,
    fill:col, base:col, baseDark:shade, rim:accent, badgeFill: k==='blancas' ? '#8a7a52' : '#5a5148',
    names:{K:'Rey',Q:'Reina',R:'Torre',B:'Alfil',N:'Caballo',P:'Peón'},
    draw:{}
  };
  for (const t of 'KQRBNP') FACTIONS[k].draw[t] = () => stauntonPiece(t, col, k==='blancas' ? '#a89c7e' : '#6c635a', accent);
}

// Parejas históricas sugeridas en la pantalla de preparativos
const DUELS = [
  ['atenas','persia'], ['proletariado','burguesia'], ['eeuu','vietnam'], ['azteca','conquistadores'],
  ['mongol','samurai'], ['napoleon','britanicos'], ['soviet','wehrmacht'], ['blancas','negras']
];
