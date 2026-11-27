/* Ajedrez Histórico — interfaz. El motor (engine.js) y las figuras (pieces.js) son globales. */
(() => {
'use strict';
const $ = id => document.getElementById(id);
const store = {
  get(k, d){ try { const v = localStorage.getItem(k); return v===null ? d : JSON.parse(v); } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} },
  del(k){ try { localStorage.removeItem(k); } catch(e){} }
};
const native = window.AjhNative || null;

// ============================== Textos y ajustes ==============================
const LEVEL_INFO = {
  1:'Juega casi al azar y comete errores graves.',
  2:'Ve capturas simples, pero se equivoca seguido.',
  3:'Planea 2 jugadas. Ideal para empezar.',
  4:'Planea 3 jugadas y comete pocos errores.',
  5:'Piensa hasta ~0,6 s por jugada.',
  6:'Piensa hasta ~1,8 s por jugada.',
  7:'Piensa hasta ~5,5 s por jugada. El más fuerte.'
};
const THEMES = {
  wood:{ name:'Madera', l:'#e9dcbc', d:'#9b7a52' }, classic:{ name:'Clásico', l:'#ececec', d:'#484848' },
  blue:{ name:'Azul', l:'#cfe7f7', d:'#26558a' },    green:{ name:'Verde', l:'#dcebd0', d:'#2f6a3d' }
};
const levelInfo = n => t(LEVEL_INFO[n]);
const settings = Object.assign({ board:'wood', glyph:true, hints:true, coords:true, classic:false }, store.get('ajh-set', {}));
const draft = Object.assign({ mode:'ai', w:'napoleon', b:'mongol', human:'w', lvl:3 }, store.get('ajh-draft', {}));
if (!FACTIONS[draft.w] || !FACTIONS[draft.b] || draft.w===draft.b){ draft.w = 'napoleon'; draft.b = 'mongol'; }
if (!LEVELS[draft.lvl]) draft.lvl = 3;

function applySettings(){
  if (!THEMES[settings.board]) settings.board = 'wood';
  document.body.dataset.board = settings.board;
  document.body.classList.toggle('nocoords', !settings.coords);
  showGlyph = !!settings.glyph; classicShapes = !!settings.classic;
  store.set('ajh-set', settings);
}

// ============================== Navegación ==============================
const VIEWS = ['home','setup','online','game'];
let cur = 'home';
function go(v){
  cur = v;
  for (const n of VIEWS) $('v-'+n).classList.toggle('on', n===v);
  if (v==='home') renderHome();
}
let openSheetId = null, dlgResolve = null;
function openSheet(id){
  closeSheet();
  openSheetId = id; $('ov').hidden = false; $(id).hidden = false;
}
function closeSheet(){
  if (!openSheetId) return false;
  $(openSheetId).hidden = true; $('ov').hidden = true; openSheetId = null; return true;
}
$('ov').onclick = closeSheet;
document.querySelectorAll('[data-close]').forEach(b => b.onclick = closeSheet);

function dialog({ title, text='', opts=null, buttons }){
  return new Promise(res => {
    $('dlgTitle').textContent = title; $('dlgText').textContent = text; $('dlgText').hidden = !text;
    const o = $('dlgOpts'); o.innerHTML = ''; o.hidden = !opts;
    const done = v => { $('dlg').hidden = true; dlgResolve = null; res(v); };
    dlgResolve = done;
    if (opts) for (const op of opts){
      const b = document.createElement('button'); b.innerHTML = op.html; b.onclick = () => done(op.value); o.appendChild(b);
    }
    const bt = $('dlgBtns'); bt.innerHTML = '';
    for (const b of (buttons||[])){
      const e = document.createElement('button'); e.className = 'btn' + (b.primary ? ' primary' : '') + (b.danger ? ' danger' : '');
      e.textContent = b.label; e.onclick = () => done(b.value); bt.appendChild(e);
    }
    $('dlg').hidden = false;
  });
}
const confirmBox = (title, text, ok, danger) => dialog({ title, text, buttons:[{label:t('Cancelar'), value:false},{label:ok, value:true, primary:!danger, danger}] });
let toastT = null;
function toast(msg){
  let t = $('toast');
  if (!t){ t = document.createElement('div'); t.id = 'toast';
    t.style.cssText = 'position:fixed;left:50%;bottom:calc(90px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:#2b231a;border:1px solid #c9a24a;color:#f1e8d4;padding:10px 16px;border-radius:12px;z-index:60;font-size:14px;max-width:90vw;text-align:center';
    document.body.appendChild(t); }
  t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 2600);
}

// Botón «atrás» del teléfono (lo llama la app Android)
window.__back = () => {
  if (!$('dlg').hidden){ if (dlgResolve) dlgResolve(false); return true; }
  if (closeSheet()) return true;
  if (cur==='game'){ leaveGame(); return true; }
  if (cur==='setup'){ go(draft.mode==='online' ? 'online' : 'home'); return true; }
  if (cur==='online'){ go('home'); return true; }
  return false;
};
document.querySelectorAll('[data-back]').forEach(b => b.onclick = () => window.__back());

// ============================== Inicio ==============================
const savedLabel = l => typeof l === 'string' ? l : (l.mode==='ai' ? t('Contra la máquina') + ' · ' + lvlName(l.lvl) : t('Dos jugadores'));
async function pickLang(){
  const v = await dialog({ title:t('Idioma'), opts:Object.entries(LANGS).map(([k,n]) => ({ value:k, html:`<span style="font-size:17px;${k===LANG?'color:var(--gold);font-weight:700':''}">${n}</span>` })), buttons:[{label:t('Cancelar'), value:false}] });
  if (v && LANGS[v]){ setLang(v); applyLang(); }
}
function renderHome(){
  $('btnLang').textContent = '🌐 ' + LANG.toUpperCase();
  $('crest').innerHTML = pieceSVG('K', draft.w, { noBadge:true }) + pieceSVG('K', draft.b, { noBadge:true });
  const r = store.get('ajh-resume', null), b = $('btnResume');
  if (r && r.type==='local' && store.get('ajh-local', null)){
    b.hidden = false; b.innerHTML = `<b>${t('Continuar partida')}</b><small>${r.label ? savedLabel(r.label) : ''}</small>`;
  } else if (r && r.type==='online' && Net.validCode(r.code)){
    b.hidden = false; b.innerHTML = `<b>${t('Volver a la partida en línea')}</b><small>${t('Código {c}', { c:r.code.toUpperCase() })}</small>`;
  } else b.hidden = true;
}
document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
  const m = b.dataset.go;
  if (m==='online'){ draft.mode = 'online'; $('joinErr').hidden = true; go('online'); return; }
  draft.mode = m; openSetup();
});
$('btnLang').onclick = pickLang;
$('mLang').onclick = () => { closeSheet(); pickLang(); };
$('btnArmies').onclick = () => { fillArmiesSheet(); openSheet('sh-armies'); };
$('btnSettings').onclick = () => { fillSettings(); openSheet('sh-settings'); };
$('btnResume').onclick = async () => {
  const r = store.get('ajh-resume', null); if (!r) return;
  if (r.type==='local') resumeLocal(); else joinOnline(r.code);
};

// ============================== Preparativos ==============================
function openSetup(){
  $('setupTitle').textContent = draft.mode==='ai' ? t('Contra la máquina') : draft.mode==='pvp' ? t('Dos jugadores') : t('Crear partida');
  $('blkSide').hidden = draft.mode==='pvp';
  $('blkLevel').hidden = draft.mode!=='ai';
  $('btnStart').textContent = draft.mode==='online' ? t('Crear y obtener código') : t('Comenzar');
  renderSetup(); go('setup');
}
function renderDuels(){
  $('duels').innerHTML = DUELS.map(([a,b],i) => `<button type="button" class="chip ${draft.w===a&&draft.b===b?'on':''}" data-i="${i}">${fName(a)} <i>${t('vs')}</i> ${fName(b)}</button>`).join('');
  $('duels').querySelectorAll('.chip').forEach(c => c.onclick = () => { const [a,b] = DUELS[+c.dataset.i]; draft.w = a; draft.b = b; store.set('ajh-draft', draft); renderSetup(); });
}
function renderSetup(){
  renderDuels();
  for (const [col,id] of [['w','rowW'],['b','rowB']]){
    $(id).innerHTML = Object.entries(FACTIONS).map(([k,f]) =>
      `<button type="button" class="army ${draft[col]===k?'on':''} ${draft[other(col)]===k?'taken':''}" data-k="${k}" aria-pressed="${draft[col]===k}">`
      + `${pieceSVG('K',k,{noBadge:true})}<b>${fName(k)}</b><small>${fEra(k)}</small></button>`).join('');
    $(id).querySelectorAll('.army').forEach(btn => btn.onclick = () => {
      const k = btn.dataset.k; if (draft[col]===k) return;
      if (draft[other(col)]===k) draft[other(col)] = draft[col];
      draft[col] = k; store.set('ajh-draft', draft); renderSetup();
    });
    const on = $(id).querySelector('.army.on'); if (on && !renderSetup.once) on.scrollIntoView({ inline:'center', block:'nearest' });
  }
  renderSetup.once = true;
  $('segSide').querySelectorAll('button').forEach(b => {
    b.classList.toggle('on', b.dataset.v === (draft.humanPick || draft.human));
    b.onclick = () => { draft.humanPick = b.dataset.v; if (b.dataset.v!=='r') draft.human = b.dataset.v; store.set('ajh-draft', draft); renderSetup(); };
  });
  $('levels').innerHTML = [1,2,3,4,5,6,7].map(n => `<button type="button" data-n="${n}" class="${draft.lvl===n?'on':''}" aria-label="${t('Nivel {n}', { n })}">${n}</button>`).join('');
  $('levels').querySelectorAll('button').forEach(b => b.onclick = () => { draft.lvl = +b.dataset.n; store.set('ajh-draft', draft); renderSetup(); });
  $('lvlName').textContent = `${draft.lvl} · ${lvlName(draft.lvl)}`;
  $('lvlHint').textContent = levelInfo(draft.lvl);
}
$('btnStart').onclick = () => {
  const pickSide = draft.humanPick==='r' ? (Math.random()<.5 ? 'w' : 'b') : draft.human;
  if (draft.mode==='online') return createOnline(pickSide);
  startLocal({ mode:draft.mode, w:draft.w, b:draft.b, human:pickSide, lvl:draft.lvl });
};

// ============================== Estado de la partida ==============================
let game, history, positions, log, sel = null, hints = [], flipped = false, cfg = null, busy = false, over = null, aiToken = 0, anim = null, overShown = false;
let net = null;   // partida en línea

const uci = m => sqName(m.f) + sqName(m.t) + (m.promo ? m.promo.toLowerCase() : '');
const findMove = (st, u) => legalMoves(st).find(m => uci(m)===u) || null;

function resetBoard(){
  aiToken++; busy = false; stopAI();
  game = initState(); history = []; positions = [posKey(game)]; log = []; sel = null; hints = []; infoSq = null; over = null; anim = null; overShown = false;
}
function describe(st, m, next){
  const p = st.b[m.f];
  const icon = { K:'♚', Q:'♛', R:'♜', B:'♝', N:'♞', P:'' }[p[1]];
  let txt;
  if (m.castle) txt = m.t > m.f ? 'O-O' : 'O-O-O';
  else txt = `${icon}${sqName(m.f)}${next.captured ? '×' : '–'}${sqName(m.t)}${m.promo ? '=' + { Q:'♛', R:'♜', B:'♝', N:'♞' }[m.promo] : ''}`;
  if (inCheck(next)) txt += legalMoves(next).length ? '+' : '#';
  return txt;
}
function pushMove(m){
  const next = applyMove(game, m);
  log.push({ m, txt: describe(game, m, next), cap: next.captured || null });
  history.push(game); game = next; positions.push(posKey(game));
  sel = null; hints = []; infoSq = null;
}
const facName = col => fName(cfg[col]);
const pieceName = p => fPiece(cfg[p[0]], p[1]);

function checkEnd(){
  over = null;
  if (net && net.res){
    const loser = net.res.slice(-1);
    over = t('{a} se rinde. Victoria de {b}.', { a:`<b>${facName(loser)}</b>`, b:`<b>${facName(other(loser))}</b>` }); return;
  }
  const moves = legalMoves(game);
  const reps = positions.filter(k => k===positions[positions.length-1]).length;
  if (!moves.length) over = inCheck(game) ? t('¡Jaque mate! Victoria de {a}.', { a:`<b>${facName(other(game.turn))}</b>` }) : t('Tablas por ahogado.');
  else if (game.half >= 100) over = t('Tablas por la regla de los 50 movimientos.');
  else if (reps >= 3) over = t('Tablas por triple repetición.');
  else if (insufficient(game.b)) over = t('Tablas por material insuficiente.');
}

// ============================== Máquina (en un Worker) ==============================
let aiWorker = null, engineSrc = null;
const stopAI = () => { if (aiWorker){ try { aiWorker.terminate(); } catch(e){} aiWorker = null; } };
const slimMove = m => ({ f:m.f, t:m.t, promo:m.promo, ep:m.ep, castle:m.castle, dbl:m.dbl });
// El Worker se crea desde un Blob con el código del motor: funciona igual en navegador y en el WebView de Android.
async function getEngineSrc(){
  if (engineSrc===null) engineSrc = await (await fetch('js/engine.js')).text();
  return engineSrc;
}
function maybeAI(){
  if (over || !cfg || cfg.mode!=='ai' || game.turn===cfg.human) return;
  busy = true; render();
  const tok = aiToken, moves = log.map(e => slimMove(e.m)), lvl = cfg.lvl;
  let finished = false;
  const done = m => {
    if (finished || tok!==aiToken) return;
    finished = true; stopAI(); busy = false;
    if (m){
      const real = legalMoves(game).find(x => x.f===m.f && x.t===m.t && x.promo===m.promo);
      if (real){ anim = real; pushMove(real); checkEnd(); saveLocal(); }
    }
    render();
  };
  const onMain = () => setTimeout(() => { if (!finished && tok===aiToken) done(chooseMove(moves, lvl)); }, 40);
  getEngineSrc().then(src => {
    if (finished || tok!==aiToken) return;
    const url = URL.createObjectURL(new Blob([src + '\nself.onmessage=e=>{self.postMessage(chooseMove(e.data.moves,e.data.level));};'], { type:'text/javascript' }));
    const w = new Worker(url); aiWorker = w;
    w.onmessage = e => { try { URL.revokeObjectURL(url); } catch(x){} done(e.data); };
    w.onerror = () => { if (tok===aiToken && !finished){ stopAI(); onMain(); } };
    w.postMessage({ moves, level:lvl });
    setTimeout(() => { if (tok===aiToken && !finished){ stopAI(); onMain(); } }, 20000);
  }).catch(onMain);
}

// ============================== Partidas locales ==============================
function startLocal(c){
  cfg = c; net = null;
  resetBoard();
  flipped = c.mode==='ai' && c.human==='b';
  store.set('ajh-resume', { type:'local', label:{ mode:c.mode, lvl:c.lvl } });
  saveLocal(); enterGame(); maybeAI();
}
function saveLocal(){
  if (!cfg || cfg.mode==='online') return;
  if (over){ store.del('ajh-local'); store.del('ajh-resume'); return; }
  store.set('ajh-local', { cfg, moves: log.map(e => uci(e.m)), flipped });
}
function resumeLocal(){
  const s = store.get('ajh-local', null);
  if (!s || !s.cfg || !FACTIONS[s.cfg.w] || !FACTIONS[s.cfg.b]){ store.del('ajh-resume'); renderHome(); return; }
  cfg = s.cfg; net = null; resetBoard();
  for (const u of s.moves){ const m = findMove(game, u); if (!m) break; pushMove(m); }
  checkEnd(); flipped = !!s.flipped; enterGame(); maybeAI();
}
function enterGame(){
  $('gameTitle').textContent = cfg.mode==='ai' ? t('Contra la máquina') : cfg.mode==='pvp' ? t('Dos jugadores') : t('En línea');
  $('conn').hidden = cfg.mode!=='online';
  go('game'); render();
  if (!store.get('ajh-tip', false)){ store.set('ajh-tip', true); setTimeout(() => toast(t('Toca una pieza para ver su nombre, su papel en el ajedrez y cómo se mueve.')), 700); }
}
function leaveGame(){
  aiToken++; busy = false; stopAI();
  if (net){ Net.close(); clearTimeout(net.seatT); clearTimeout(net.findT); net = null; }
  go('home');
}
function undo(){
  if (busy || !history.length || cfg.mode==='online') return;
  let n = 1;
  if (cfg.mode==='ai' && history.length>=2 && game.turn===cfg.human) n = 2;
  for (let i=0;i<n && history.length;i++){ game = history.pop(); log.pop(); positions.pop(); }
  over = null; sel = null; hints = []; infoSq = null; anim = null; overShown = false;
  saveLocal(); render(); maybeAI();
}
async function newLocal(){
  if (!cfg || cfg.mode==='online') return;
  if (log.length && !over && !(await confirmBox(t('¿Nueva partida?'), t('Se perderá la partida actual.'), t('Empezar de nuevo')))) return;
  startLocal(Object.assign({}, cfg));
}

// ============================== Turnos y toques ==============================
function humanTurn(){
  if (over || busy || !cfg) return false;
  if (cfg.mode==='pvp') return true;
  if (cfg.mode==='ai') return game.turn===cfg.human;
  return !!(net && net.side && net.side!=='s' && net.side===game.turn && net.guestId && !net.res);
}
let infoSq = null;   // pieza cuya ficha (nombre, papel y movimiento) se muestra bajo el tablero
function onSquare(s){
  const p = game.b[s], can = humanTurn(), h = hints.filter(m => m.t===s);
  if (can && sel!==null && h.length){ if (h[0].promo) return askPromo(h); return playerMove(h[0]); }
  if (p){
    infoSq = s;
    if (can && p[0]===game.turn){ sel = s; hints = legalMoves(game).filter(m => m.f===s); }
    else { sel = null; hints = []; }
  } else { infoSq = null; sel = null; hints = []; }
  render();
}
function renderInfo(){
  const el = $('pinfo'); if (!el) return;
  const p = infoSq!==null && !over ? game.b[infoSq] : null;
  if (!p){ el.hidden = true; return; }
  el.hidden = false;
  el.innerHTML = `<span class="pi-fig">${pieceSVG(p[1], cfg[p[0]], { noBadge:true })}</span>`
    + `<span class="pi-txt"><b>${pieceName(p)}</b> <em>${roleName(p[1])}</em><small>${roleHelp(p[1])}</small></span>`;
}
async function askPromo(opts){
  const col = game.turn;
  const v = await dialog({ title:t('Ascenso del peón'), opts:[...'QRBN'].map(q => ({ value:q, html: pieceSVG(q, cfg[col], {noBadge:true}) + `<span>${fPiece(cfg[col], q)}</span><small>${roleName(q)}</small>` })), buttons:[] });
  const m = v && opts.find(x => x.promo===v);
  if (m) playerMove(m);
}
function playerMove(m){
  if (!m || !humanTurn()) return;
  anim = m; pushMove(m); checkEnd();
  if (cfg.mode==='online') sendMove(m);
  else saveLocal();
  render(); maybeAI();
}
// Los toques se resuelven por coordenadas: el tablero se redibuja con frecuencia y un clic podría perderse.
(() => {
  const b = $('board'); let dn = null;
  b.addEventListener('pointerdown', e => { dn = e.isPrimary ? { x:e.clientX, y:e.clientY } : null; });
  b.addEventListener('pointerup', e => {
    if (!dn || !e.isPrimary) return;
    const moved = Math.hypot(e.clientX-dn.x, e.clientY-dn.y); dn = null;
    if (moved > 12) return;
    const el = document.elementFromPoint(e.clientX, e.clientY), q = el && el.closest && el.closest('.sq');
    if (q && q.dataset.s!==undefined) onSquare(+q.dataset.s);
  });
  b.addEventListener('pointercancel', () => { dn = null; });
})();

// ============================== Dibujo ==============================
let rafId = 0;
const scheduleRender = () => { if (!rafId) rafId = requestAnimationFrame(() => { rafId = 0; render(); }); };

function roleOf(col){
  if (cfg.mode==='ai') return col===cfg.human ? t('Tú') : t('Máquina · {l}', { l:lvlName(cfg.lvl) });
  if (cfg.mode==='pvp') return col==='w' ? t('Jugador 1') : t('Jugador 2');
  if (!net || !net.side) return col==='w' ? t('Bando 1') : t('Bando 2');
  if (net.side==='s') return col==='w' ? t('Bando 1') : t('Bando 2');
  if (col===net.side) return t('Tú');
  return net.guestId || net.isHost===false ? t('Tu amigo') : t('Esperando a tu amigo…');
}
function render(){
  if (!cfg) return;
  const board = $('board'); board.innerHTML = '';
  const last = log.length ? log[log.length-1].m : null;
  const chk = !over && inCheck(game) ? kingSq(game.b, game.turn) : -1;
  for (let i=0;i<64;i++){
    const s = flipped ? 63-i : i, r = s>>3, c = s&7;
    const d = document.createElement('div');
    d.className = 'sq ' + ((r+c)%2 ? 'd' : 'l'); d.dataset.s = s;
    if (last && (s===last.f || s===last.t)) d.classList.add('last');
    if (s===sel) d.classList.add('sel');
    else if (s===infoSq) d.classList.add('info');
    if (s===chk) d.classList.add('check');
    const p = game.b[s];
    if (p){ d.innerHTML = pieceSVG(p[1], cfg[p[0]]); d.title = `${pieceName(p)} · ${roleName(p[1])} (${facName(p[0])})`; }
    if (settings.hints){
      const h = hints.find(m => m.t===s);
      if (h){ const x = document.createElement('span'); x.className = 'hintdot' + (p||h.ep ? ' cap' : ''); d.appendChild(x); }
    }
    if ((flipped ? r===0 : r===7)){ const x = document.createElement('span'); x.className = 'coord f'; x.textContent = FILES[c]; d.appendChild(x); }
    if ((flipped ? c===7 : c===0)){ const x = document.createElement('span'); x.className = 'coord r'; x.textContent = 8-r; d.appendChild(x); }
    d.setAttribute('role','gridcell'); d.setAttribute('aria-label', sqName(s) + (p ? ' ' + pieceName(p) + ', ' + roleName(p[1]) : ''));
    board.appendChild(d);
  }
  if (anim){
    const m = anim; anim = null;
    const to = board.querySelector(`.sq[data-s="${m.t}"]`), sv = to && to.querySelector('svg');
    if (sv && sv.animate){
      const sz = to.getBoundingClientRect().width, k = flipped ? -1 : 1;
      const dx = ((m.f&7) - (m.t&7)) * sz * k, dy = ((m.f>>3) - (m.t>>3)) * sz * k;
      to.style.overflow = 'visible'; to.style.zIndex = 5;
      const a = sv.animate([{ transform:`translate(${dx}px,${dy}px)` }, { transform:'none' }], { duration:190, easing:'ease-out' });
      a.onfinish = a.oncancel = () => { to.style.overflow = ''; to.style.zIndex = ''; };
    }
  }
  const top = flipped ? 'w' : 'b', bot = other(top);
  for (const [el, col] of [[$('pTop'), top], [$('pBot'), bot]]){
    const f = FACTIONS[cfg[col]];
    el.querySelector('.dot').style.background = f.fill;
    el.querySelector('.lbl').textContent = fName(cfg[col]);
    el.querySelector('.role').textContent = roleOf(col);
    el.classList.toggle('active', !over && game.turn===col);
    const caps = log.filter(e => e.cap && e.cap[0]!==col).map(e => e.cap);
    caps.sort((a,b) => VAL[b[1]]-VAL[a[1]]);
    el.querySelector('.caps').innerHTML = caps.map(p => pieceSVG(p[1], cfg[p[0]], { noBadge:true })).join('');
  }
  let st = '', think = false;
  if (over) st = over;
  else if (cfg.mode==='online' && (!net || !net.hostId)) st = net && net.notFound ? t('No encontré esa partida.') : t('Buscando la partida…');
  else if (busy){ st = t('{a} está pensando', { a:`<b>${facName(game.turn)}</b>` }); think = true; }
  else if (cfg.mode==='online' && net.side && net.side!=='s' && !net.guestId) st = t('Esperando a que tu amigo se una…');
  else {
    st = t('Turno de {a}', { a:`<b>${facName(game.turn)}</b>` }) + (chk>=0 ? t(' — ¡{j}!', { j:`<b>${t('jaque')}</b>` }) : '');
    if (cfg.mode==='online' && net.side===game.turn) st += t(' (tú)');
    if (cfg.mode==='online' && net.side==='s') st += t(' · espectador');
  }
  $('status').innerHTML = st; $('status').classList.toggle('think', think);
  $('moves').innerHTML = log.length ? movesHTML() : `<div class="empty">${t('Aún no hay jugadas.')}</div>`;
  renderInfo();
  const on = cfg.mode==='online';
  $('tUndo').disabled = on; $('tNew').disabled = on;
  $('mResign').hidden = !(on && net && net.side && net.side!=='s' && net.guestId && !over);
  $('invite').hidden = !(on && net && net.isHost && !net.guestId);
  if (on && net){ $('codeShow').textContent = net.code.toUpperCase(); const cn = $('conn'); cn.classList.toggle('ok', !!net.connected); cn.title = net.connected ? t('Conectado') : t('Reconectando…'); }
  if (over && !overShown){ overShown = true; saveLocal(); setTimeout(showOver, 450); }
}
// ---- Notación algebraica estándar (SAN) y tabla de jugadas ----
const locSan = (san, lang) => san.replace(/[KQRBN]/g, c => SAN_LETTERS[lang][c]);
function sanRows(loc){
  let st = initState(); const rows = [];
  for (const e of log){
    const m = e.m, p = st.b[m.f], pt = p[1], next = applyMove(st, m);
    let san;
    if (m.castle) san = m.t > m.f ? 'O-O' : 'O-O-O';
    else {
      const cap = !!next.captured;
      if (pt==='P') san = (cap ? FILES[m.f%8] + 'x' : '') + sqName(m.t) + (m.promo ? '=' + m.promo : '');
      else {
        const rivals = legalMoves(st).filter(o => o.t===m.t && o.f!==m.f && st.b[o.f]===p);
        let dis = '';
        if (rivals.length){
          const sameFile = rivals.some(o => o.f%8===m.f%8), sameRank = rivals.some(o => (o.f>>3)===(m.f>>3));
          dis = !sameFile ? FILES[m.f%8] : !sameRank ? String(8-(m.f>>3)) : sqName(m.f);
        }
        san = pt + dis + (cap ? 'x' : '') + sqName(m.t);
      }
    }
    const chk = inCheck(next); const mate = chk && !legalMoves(next).length;
    if (chk) san += mate ? '#' : '+';
    rows.push({ n: Math.floor(rows.length/2)+1, col: p[0], side: p[0]==='w' ? t('Blancas') : t('Negras'), army: fName(cfg[p[0]]),
      piece: fPiece(cfg[p[0]], pt), san: loc ? locSan(san, LANG) : san, from: sqName(m.f), to: sqName(m.t),
      cap: next.captured ? fPiece(cfg[next.captured[0]], next.captured[1]) : '', chk: mate ? t('Mate') : chk ? t('Jaque') : '' });
    st = next;
  }
  return rows;
}
function gameResult(){
  if (!log.length) return '*';
  const moves = legalMoves(game);
  if (!moves.length) return inCheck(game) ? (game.turn==='w' ? '0-1' : '1-0') : '1/2-1/2';
  return /Victoria de <b>([^<]+)/.test(over||'') ? (RegExp.$1===facName('w') ? '1-0' : '0-1') : (over ? '1/2-1/2' : '*');
}
const esc = t => String(t).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function movesHTML(){
  const rows = sanRows(true);
  const caps = c => rows.filter(r => r.col===c && r.cap).length;
  let h = `<div class="msum"><span>${t('{n} jugadas', { n:`<b>${rows.length}</b>` })}</span><span>${t('Capturas: {a} {x} · {b} {y}', { a:facName('w'), x:`<b>${caps('w')}</b>`, b:facName('b'), y:`<b>${caps('b')}</b>` })}</span><span>${t('Resultado: {r}', { r:`<b>${gameResult()}</b>` })}</span></div>`;
  h += `<div class="mt"><table><thead><tr><th>${t('N.º')}</th><th>${t('Bando')}</th><th>${t('Pieza')}</th><th>${t('Jugada')}</th><th>${t('Desde→Hasta')}</th><th>${t('Captura')}</th><th>${t('Estado')}</th></tr></thead><tbody>`;
  rows.forEach((r,i) => { h += `<tr class="${r.col}"><td>${i%2===0 ? r.n : ''}</td><td>${esc(r.army)}</td><td>${esc(r.piece)}</td><td><b>${esc(r.san)}</b></td><td>${r.from}→${r.to}</td><td>${esc(r.cap)}</td><td>${r.chk}</td></tr>`; });
  return h + '</tbody></table></div>';
}
function exportName(ext){ return 'ajedrez-historico-' + new Date().toISOString().slice(0,10) + '.' + ext; }
function buildCSV(){
  const rows = sanRows(true), q = v => '"' + String(v).replace(/"/g,'""') + '"';
  const head = [t('N.º jugada'),t('Bando'),t('Ejército'),t('Pieza'),t('Jugada (SAN)'),t('Desde'),t('Hasta'),t('Captura'),t('Estado')];
  return '\ufeff' + [head, ...rows.map((r,i) => [i+1, r.side, r.army, r.piece, r.san, r.from, r.to, r.cap, r.chk])].map(r => r.map(q).join(';')).join('\r\n') + '\r\n';
}
function buildPGN(){
  const rows = sanRows(false), res = gameResult(), d = new Date().toISOString().slice(0,10).replace(/-/g,'.');
  let hd = `[Event "Ajedrez Histórico"]\n[Date "${d}"]\n[White "${facName('w')}"]\n[Black "${facName('b')}"]\n[Result "${res}"]\n\n`, line = '';
  rows.forEach((r,i) => { line += (i%2===0 ? (r.n + '. ') : '') + r.san + ' '; });
  line += res;
  const out = []; let cur = '';
  for (const w of line.split(' ')){ if ((cur + ' ' + w).trim().length > 78){ out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }
  out.push(cur);
  return hd + out.join('\n') + '\n';
}
function exportFile(kind){
  if (!log.length) return toast(t('Aún no hay jugadas que exportar.'));
  const csv = kind==='csv', name = exportName(csv ? 'csv' : 'pgn'), data = csv ? buildCSV() : buildPGN(), mime = csv ? 'text/csv' : 'application/x-chess-pgn';
  if (native && native.shareFile){ native.shareFile(name, mime, data, t('Exportar jugadas')); return; }
  const url = URL.createObjectURL(new Blob([data], { type: mime + ';charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 1500); toast(t('Archivo {n} generado', { n:name }));
}
$('xCsv').onclick = () => exportFile('csv');
$('xPgn').onclick = () => exportFile('pgn');
$('xCopy').onclick = () => {
  if (!log.length) return toast(t('Aún no hay jugadas.'));
  const txt = buildPGN();
  if (native && native.copy){ native.copy(txt); toast(t('Jugadas copiadas')); return; }
  try { navigator.clipboard.writeText(txt).then(() => toast(t('Jugadas copiadas')), () => toast(t('No se pudo copiar'))); } catch(e){ toast(t('No se pudo copiar')); }
};
async function showOver(){
  if (!over) return;
  const text = over.replace(/<[^>]+>/g, '');
  const on = cfg.mode==='online';
  const v = await dialog({ title:t('Fin de la partida'), text, buttons:[{label:t('Ver tablero'), value:'see'}, {label: on ? t('Salir') : t('Nueva partida'), value:'go', primary:true}] });
  if (v==='go'){ if (on) leaveGame(); else startLocal(Object.assign({}, cfg)); }
}

// ============================== Barra de herramientas ==============================
$('tUndo').onclick = undo;
$('tFlip').onclick = () => { flipped = !flipped; render(); };
$('tLog').onclick = () => { openSheet('sh-log'); const m = $('moves'); m.scrollTop = 1e6; };
$('tNew').onclick = newLocal;
$('btnMenu').onclick = () => openSheet('sh-menu');
$('mArmies').onclick = () => { fillArmiesSheet(); openSheet('sh-armies'); };
$('mSettings').onclick = () => { fillSettings(); openSheet('sh-settings'); };
$('mResign').onclick = async () => {
  closeSheet();
  if (await confirmBox(t('¿Rendirte?'), t('Tu amigo ganará la partida.'), t('Rendirme'), true) && net && net.side && net.side!=='s' && !over){
    net.res = 'resign-' + net.side; Net.send(net.code, { k:'res', id:net.id }); checkEnd(); render();
  }
};

// ============================== Ajustes y ejércitos ==============================
function fillSettings(){
  $('themes').innerHTML = Object.entries(THEMES).map(([k,th]) =>
    `<button type="button" data-k="${k}" class="${k===settings.board?'on':''}"><span class="sw"><i style="background:${th.l}"></i><i style="background:${th.d}"></i><i style="background:${th.d}"></i><i style="background:${th.l}"></i></span>${t(th.name)}</button>`).join('');
  $('themes').querySelectorAll('button').forEach(b => b.onclick = () => { settings.board = b.dataset.k; applySettings(); fillSettings(); });
  for (const [id,key] of [['optGlyph','glyph'],['optClassic','classic'],['optHints','hints'],['optCoords','coords']]){
    $(id).checked = !!settings[key];
    $(id).onchange = () => { settings[key] = $(id).checked; applySettings(); if (cfg && cur==='game') render(); if (cur==='home') renderHome(); };
  }
  $('langs').innerHTML = Object.entries(LANGS).map(([k,n]) => `<button type="button" data-k="${k}" class="${k===LANG?'on':''}">${n}</button>`).join('');
  $('langs').querySelectorAll('button').forEach(b => b.onclick = () => { setLang(b.dataset.k); applyLang(); });
}
function fillArmiesSheet(){
  $('armiesList').innerHTML = Object.entries(FACTIONS).map(([k]) =>
    `<div class="army-info"><h4>${fName(k)} · <span style="color:var(--muted);font-size:13px;font-weight:400">${fEra(k)}</span></h4><p>${fBlurb(k)}</p>`
    + `<div class="legend">${'KQRBNP'.split('').map(ty => `<div>${pieceSVG(ty,k,{noBadge:true})}<span>${fPiece(k,ty)}<small>${roleName(ty)}</small></span></div>`).join('')}</div></div>`).join('');
}

function fillGuide(){
  const sides = cfg ? ['w','b'] : [];
  $('guideList').innerHTML = sides.map(col => {
    const k = cfg[col];
    return `<div class="army-info"><h4>${fName(k)}</h4>` + 'KQRBNP'.split('').map(ty =>
      `<div class="gd"><span class="gd-fig">${pieceSVG(ty,k,{noBadge:true})}</span><span class="gd-txt"><b>${fPiece(k,ty)}</b> <em>${roleName(ty)}</em><small>${roleHelp(ty)}</small></span></div>`).join('') + '</div>';
  }).join('');
}
$('tGuide').onclick = () => { fillGuide(); openSheet('sh-guide'); };

// ============================== En línea ==============================
$('btnCreate').onclick = () => { draft.mode = 'online'; openSetup(); };
$('btnJoin').onclick = () => {
  const code = ($('codeIn').value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!Net.validCode(code)){ $('joinErr').textContent = t('Ese código no es válido (4 a 8 letras o números).'); $('joinErr').hidden = false; return; }
  $('joinErr').hidden = true; joinOnline(code);
};
$('codeIn').onkeydown = e => { if (e.key==='Enter') $('btnJoin').click(); };

function newNet(code, host){
  const key = 'ajh-id-' + code;
  let id = store.get(key, null); if (!id){ id = Net.newId(); store.set(key, id); }
  return { code, id, isHost:host, side:null, hostId:null, hostSide:null, guestId:null, res:null, connected:false, unsent:{}, sentGuest:false, notFound:false, seatT:0, findT:0 };
}
function connect(){
  Net.open(net.code, {
    onMsg: handleMsg,
    onState: ok => {
      if (!net) return;
      net.connected = ok;
      if (ok){
        for (const n in net.unsent) Net.send(net.code, net.unsent[n]);
        if (!net.findT && !net.hostId) net.findT = setTimeout(() => { if (net && !net.hostId){ net.notFound = true; render(); } }, 9000);
      }
      scheduleRender();
    }
  });
}
async function createOnline(side){
  net = newNet(Net.newCode(), true);
  net.hostSide = side; net.side = side; net.hostId = net.id; net.fw = draft.w; net.fb = draft.b;
  cfg = { mode:'online', w:draft.w, b:draft.b, human:side, lvl:2 };
  resetBoard(); flipped = side==='b';
  store.set('ajh-resume', { type:'online', code:net.code });
  enterGame(); connect();
  const ok = await Net.send(net.code, { k:'host', id:net.id, side, fw:draft.w, fb:draft.b });
  if (!ok) toast(t('Sin conexión: no se pudo crear la partida. Revisa tu internet.'));
}
function joinOnline(code){
  net = newNet(code, false);
  cfg = { mode:'online', w:draft.w, b:draft.b, human:'w', lvl:2 };
  resetBoard(); flipped = false;
  store.set('ajh-resume', { type:'online', code });
  enterGame(); connect();
  render();
}
function seatCfg(){
  cfg = { mode:'online', w:net.fw, b:net.fb, human: net.side==='s' ? 'w' : net.side, lvl:2 };
  flipped = net.side==='b';
}
function handleMsg(m){
  if (!net) return;
  const okId = typeof m.id === 'string' && m.id.length > 0 && m.id.length < 40;
  if (m.k==='host' && okId && !net.hostId){
    if ((m.side!=='w' && m.side!=='b') || !FACTIONS[m.fw] || !FACTIONS[m.fb] || m.fw===m.fb) return;
    net.hostId = m.id; net.hostSide = m.side; net.fw = m.fw; net.fb = m.fb;
    net.isHost = m.id===net.id;
    if (net.isHost) net.side = m.side;
    resetBoard(); seatCfg(); queueSeat();
  } else if (m.k==='host' && okId && net.hostId===m.id && m.id===net.id && !net.fw){
    net.fw = m.fw; net.fb = m.fb;
  } else if (m.k==='guest' && okId && net.hostId && !net.guestId && m.id!==net.hostId){
    net.guestId = m.id;
    if (m.id===net.id){ net.side = other(net.hostSide); seatCfg(); }
    else if (!net.isHost){ net.side = 's'; seatCfg(); }
  } else if (m.k==='mv' && okId && net.hostId){
    const seat = m.id===net.hostId ? net.hostSide : (net.guestId && m.id===net.guestId ? other(net.hostSide) : null);
    if (!seat || !Number.isInteger(m.n) || typeof m.u !== 'string') return;
    if (m.id===net.id) delete net.unsent[m.n];
    if (m.n !== log.length || seat !== game.turn || over) return;
    const mv = findMove(game, m.u); if (!mv) return;
    if (m.id!==net.id) anim = mv;
    pushMove(mv); checkEnd();
  } else if (m.k==='res' && okId && net.hostId && !net.res){
    const seat = m.id===net.hostId ? net.hostSide : (net.guestId && m.id===net.guestId ? other(net.hostSide) : null);
    if (seat){ net.res = 'resign-' + seat; checkEnd(); }
  } else return;
  scheduleRender();
}
function queueSeat(){
  clearTimeout(net.seatT);
  // El invitado espera un instante a leer todo el historial antes de sentarse.
  net.seatT = setTimeout(() => {
    if (!net || net.isHost || !net.hostId || net.guestId || net.sentGuest) return;
    net.sentGuest = true; Net.send(net.code, { k:'guest', id:net.id });
  }, 1400);
}
function sendMove(m){
  const msg = { k:'mv', id:net.id, n:log.length-1, u:uci(m) };
  net.unsent[msg.n] = msg;
  Net.send(net.code, msg).then(ok => { if (!ok && net) toast(t('Sin conexión: la jugada se enviará al reconectar.')); });
}
$('btnShare').onclick = () => {
  const code = net ? net.code.toUpperCase() : '';
  const text = t('Juguemos Ajedrez Histórico. En la app elige «En línea con un amigo» → «Unirse» y escribe el código {c}.', { c:code });
  if (native && native.share) return native.share(text, t('Invitar a un amigo'));
  if (navigator.share) return navigator.share({ text }).catch(() => {});
  copyText(text);
};
function copyText(txt){
  if (native && native.copy){ native.copy(txt); toast(t('Invitación copiada')); return; }
  try { navigator.clipboard.writeText(txt).then(() => toast(t('Invitación copiada')), () => toast(t('Copia el código a mano: {c}', { c: net ? net.code.toUpperCase() : '' }))); }
  catch(e){ toast(t('Copia el código a mano.')); }
}
document.addEventListener('visibilitychange', () => { if (!document.hidden && net) Net.reconnect(); });

// ============================== Idioma y arranque ==============================
function applyLang(){
  translateDOM(document.body);
  renderHome(); fillSettings();
  if (!$('sh-armies').hidden) fillArmiesSheet();
  if (!$('sh-guide').hidden) fillGuide();
  if (cur==='setup') openSetup();
  if (cfg && cur==='game'){ $('gameTitle').textContent = cfg.mode==='ai' ? t('Contra la máquina') : cfg.mode==='pvp' ? t('Dos jugadores') : t('En línea'); render(); }
}
translateDOM(document.body);
applySettings();
renderHome();
go('home');
})();
