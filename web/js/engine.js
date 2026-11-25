const FILES = 'abcdefgh';
const sqName = s => FILES[s&7] + (8-(s>>3));
// ===================== MOTOR DE AJEDREZ =====================
// Tablero: array de 64, índice = fila*8 + columna; fila 0 = octava fila (arriba).
// Pieza: string de 2 letras, color (w/b) + tipo (K Q R B N P). null = vacío.
const DIRS = {
  N: [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]],
  B: [[-1,-1],[-1,1],[1,-1],[1,1]],
  R: [[-1,0],[1,0],[0,-1],[0,1]]
};
DIRS.Q = DIRS.B.concat(DIRS.R);
DIRS.K = DIRS.Q;
const inB = (r,c) => r>=0 && r<8 && c>=0 && c<8;
const other = col => col==='w' ? 'b' : 'w';

function initState(){
  const b = Array(64).fill(null);
  const back = 'RNBQKBNR';
  for (let c=0;c<8;c++){
    b[c]='b'+back[c]; b[8+c]='bP'; b[48+c]='wP'; b[56+c]='w'+back[c];
  }
  return { b, turn:'w', castle:{wK:true,wQ:true,bK:true,bQ:true}, ep:-1, half:0, full:1 };
}

function stateFromFEN(fen){
  const [pos,turn,cas,ep,half,full] = fen.split(' ');
  const b = Array(64).fill(null); let s=0;
  for (const ch of pos){
    if (ch==='/') continue;
    if (/\d/.test(ch)) { s += +ch; continue; }
    const col = ch===ch.toUpperCase() ? 'w' : 'b';
    b[s++] = col + ch.toUpperCase();
  }
  const epSq = ep==='-' ? -1 : (8-(+ep[1]))*8 + (ep.charCodeAt(0)-97);
  return { b, turn, castle:{wK:cas.includes('K'),wQ:cas.includes('Q'),bK:cas.includes('k'),bQ:cas.includes('q')},
           ep:epSq, half:+(half||0), full:+(full||1) };
}

function attacked(b, s, by){
  const r = s>>3, c = s&7;
  const pr = by==='w' ? r+1 : r-1;           // casilla desde donde atacaría un peón
  for (const dc of [-1,1]) if (inB(pr,c+dc) && b[pr*8+c+dc]===by+'P') return true;
  for (const [dr,dc] of DIRS.N) if (inB(r+dr,c+dc) && b[(r+dr)*8+c+dc]===by+'N') return true;
  for (const [dr,dc] of DIRS.K) if (inB(r+dr,c+dc) && b[(r+dr)*8+c+dc]===by+'K') return true;
  for (const [dr,dc] of DIRS.B){
    let rr=r+dr, cc=c+dc;
    while (inB(rr,cc)){ const p=b[rr*8+cc]; if (p){ if (p[0]===by && (p[1]==='B'||p[1]==='Q')) return true; break; } rr+=dr; cc+=dc; }
  }
  for (const [dr,dc] of DIRS.R){
    let rr=r+dr, cc=c+dc;
    while (inB(rr,cc)){ const p=b[rr*8+cc]; if (p){ if (p[0]===by && (p[1]==='R'||p[1]==='Q')) return true; break; } rr+=dr; cc+=dc; }
  }
  return false;
}

function pseudoMoves(st){
  const { b, turn } = st, opp = other(turn), mv = [];
  const lastRank = turn==='w' ? 0 : 7;
  const addP = (f,t) => {
    if ((t>>3)===lastRank) for (const q of 'QRBN') mv.push({f,t,promo:q});
    else mv.push({f,t});
  };
  for (let s=0;s<64;s++){
    const p = b[s]; if (!p || p[0]!==turn) continue;
    const t = p[1], r = s>>3, c = s&7;
    if (t==='P'){
      const d = turn==='w' ? -1 : 1, start = turn==='w' ? 6 : 1, r1 = r+d;
      if (!inB(r1,c)) continue;
      if (!b[r1*8+c]){
        addP(s, r1*8+c);
        if (r===start && !b[(r+2*d)*8+c]) mv.push({f:s,t:(r+2*d)*8+c,dbl:true});
      }
      for (const dc of [-1,1]){
        if (!inB(r1,c+dc)) continue;
        const ts = r1*8+c+dc;
        if (b[ts] && b[ts][0]===opp) addP(s,ts);
        else if (ts===st.ep) mv.push({f:s,t:ts,ep:true});
      }
    } else if (t==='N' || t==='K'){
      for (const [dr,dc] of DIRS[t]){
        const rr=r+dr, cc=c+dc; if (!inB(rr,cc)) continue;
        const q = b[rr*8+cc]; if (!q || q[0]===opp) mv.push({f:s,t:rr*8+cc});
      }
      if (t==='K'){
        const home = turn==='w' ? 60 : 4;
        if (s===home && !attacked(b,home,opp)){
          if (st.castle[turn+'K'] && !b[home+1] && !b[home+2] && b[home+3]===turn+'R'
              && !attacked(b,home+1,opp) && !attacked(b,home+2,opp)) mv.push({f:s,t:home+2,castle:true});
          if (st.castle[turn+'Q'] && !b[home-1] && !b[home-2] && !b[home-3] && b[home-4]===turn+'R'
              && !attacked(b,home-1,opp) && !attacked(b,home-2,opp)) mv.push({f:s,t:home-2,castle:true});
        }
      }
    } else {
      for (const [dr,dc] of DIRS[t]){
        let rr=r+dr, cc=c+dc;
        while (inB(rr,cc)){
          const q = b[rr*8+cc];
          if (!q) mv.push({f:s,t:rr*8+cc});
          else { if (q[0]===opp) mv.push({f:s,t:rr*8+cc}); break; }
          rr+=dr; cc+=dc;
        }
      }
    }
  }
  return mv;
}

function applyMove(st, m){
  const b = st.b.slice(), p = b[m.f], col = p[0];
  let captured = b[m.t];
  b[m.t] = m.promo ? col+m.promo : p; b[m.f] = null;
  if (m.ep){ const cs = m.t + (col==='w' ? 8 : -8); captured = b[cs]; b[cs] = null; }
  if (m.castle){
    const rook = { 62:[63,61], 58:[56,59], 6:[7,5], 2:[0,3] }[m.t];
    b[rook[1]] = b[rook[0]]; b[rook[0]] = null;
  }
  const castle = { ...st.castle };
  if (p[1]==='K'){ castle[col+'K']=false; castle[col+'Q']=false; }
  for (const s of [m.f, m.t]){
    if (s===63) castle.wK=false; if (s===56) castle.wQ=false;
    if (s===7)  castle.bK=false; if (s===0)  castle.bQ=false;
  }
  return {
    b, turn: other(col), castle,
    ep: m.dbl ? (m.f+m.t)/2 : -1,
    half: (p[1]==='P' || captured) ? 0 : st.half+1,
    full: st.full + (col==='b' ? 1 : 0),
    captured
  };
}

const kingSq = (b,col) => b.indexOf(col+'K');
const inCheck = st => attacked(st.b, kingSq(st.b, st.turn), other(st.turn));

// Cada jugada legal guarda en m.next la posición resultante (evita recalcularla en la búsqueda)
function legalMoves(st, capsOnly){
  const out = [];
  for (const m of pseudoMoves(st)){
    if (capsOnly && !(st.b[m.t] || m.ep || m.promo==='Q')) continue;
    const n = applyMove(st, m);
    if (!attacked(n.b, kingSq(n.b, st.turn), n.turn)){ m.next = n; out.push(m); }
  }
  return out;
}

function posKey(st){
  const c = st.castle;
  // La casilla al paso sólo cuenta si de verdad se puede capturar (regla de repetición FIDE)
  let ep = -1;
  if (st.ep >= 0) ep = legalMoves(st).some(m => m.ep) ? st.ep : -1;
  return st.b.map(p => p||'.').join('') + st.turn + (c.wK?'K':'') + (c.wQ?'Q':'') + (c.bK?'k':'') + (c.bQ?'q':'') + ep;
}

function insufficient(b){
  const pcs = b.filter(p => p && p[1]!=='K');
  if (pcs.length===0) return true;
  if (pcs.length===1 && (pcs[0][1]==='B' || pcs[0][1]==='N')) return true;
  // Sólo alfiles, todos en casillas del mismo color
  const colours = new Set();
  for (let s=0;s<64;s++){ const p=b[s]; if (!p || p[1]==='K') continue; if (p[1]!=='B') return false; colours.add(((s>>3)+(s&7))%2); }
  return colours.size===1;
}

function perft(st, d){
  if (d===0) return 1;
  let n = 0;
  for (const m of legalMoves(st)) n += perft(applyMove(st,m), d-1);
  return n;
}

// ===================== INTELIGENCIA ARTIFICIAL =====================
// Búsqueda alpha-beta con profundización iterativa, tabla de transposición (Zobrist de 64 bits),
// jugadas "asesinas", historial, poda por jugada nula, reducciones y búsqueda de quietud.
const VAL = { P:100, N:320, B:330, R:500, Q:900, K:0 };
const MATE = 100000, INF = 1e9;
function centre(s){ const r=s>>3, c=s&7; return 7 - (Math.abs(3.5-r) + Math.abs(3.5-c)); }

// Niveles: depth/q = profundidad fija y de quietud; time = ms por jugada; noise = error aleatorio (centipeones)
const LEVELS = {
  1: { name:'Very easy',   depth:1, q:0, noise:380 },
  2: { name:'Easy',        depth:1, q:4, noise:140 },
  3: { name:'Normal',      depth:2, q:4, noise:55  },
  4: { name:'Hard',        depth:3, q:6, noise:18  },
  5: { name:'Expert',      time:600,  max:9,  q:8, noise:0 },
  6: { name:'Master',      time:1800, max:14, q:8, noise:0 },
  7: { name:'Grand Master',time:5500, max:24, q:8, noise:0 }
};
let TIME_SCALE = 1;   // sólo para pruebas automáticas

// ---------- Hash Zobrist (dos claves de 32 bits) ----------
let _seed = 0x9e3779b9|0;
function rnd32(){ _seed ^= _seed << 13; _seed ^= _seed >>> 17; _seed ^= _seed << 5; return _seed|0; }
const PIDX = { wP:0,wN:1,wB:2,wR:3,wQ:4,wK:5, bP:6,bN:7,bB:8,bR:9,bQ:10,bK:11 };
const Z1 = new Int32Array(768), Z2 = new Int32Array(768);
for (let i=0;i<768;i++){ Z1[i]=rnd32(); Z2[i]=rnd32(); }
const ZT1 = rnd32(), ZT2 = rnd32();
const ZC1 = [rnd32(),rnd32(),rnd32(),rnd32()], ZC2 = [rnd32(),rnd32(),rnd32(),rnd32()];
const ZE1 = Array.from({length:8}, rnd32), ZE2 = Array.from({length:8}, rnd32);
let H1 = 0, H2 = 0;
function computeHash(st){
  let a=0, b=0; const bd = st.b;
  for (let s=0;s<64;s++){ const p = bd[s]; if (p){ const k = PIDX[p]*64+s; a ^= Z1[k]; b ^= Z2[k]; } }
  if (st.turn==='b'){ a ^= ZT1; b ^= ZT2; }
  const c = st.castle;
  if (c.wK){ a ^= ZC1[0]; b ^= ZC2[0]; } if (c.wQ){ a ^= ZC1[1]; b ^= ZC2[1]; }
  if (c.bK){ a ^= ZC1[2]; b ^= ZC2[2]; } if (c.bQ){ a ^= ZC1[3]; b ^= ZC2[3]; }
  if (st.ep>=0){ a ^= ZE1[st.ep&7]; b ^= ZE2[st.ep&7]; }
  H1 = a|0; H2 = b|0;
}

// ---------- Evaluación ----------
const PWf = new Int8Array(8), PBf = new Int8Array(8);
const PFB = [-6,-2,2,10,10,2,-2,-6];   // los peones centrales valen más al avanzar; los de borde, menos
function evaluate(st){
  const b = st.b; let score = 0, queens = 0, wB = 0, bB = 0, wK = -1, bK = -1;
  PWf.fill(0); PBf.fill(0);
  for (let s=0;s<64;s++){ const p = b[s]; if (p){ const t = p[1]; if (t==='Q') queens++; else if (t==='P'){ if (p[0]==='w') PWf[s&7]++; else PBf[s&7]++; } } }
  for (let s=0;s<64;s++){
    const p = b[s]; if (!p) continue;
    const t = p[1], white = p[0]==='w', sign = white ? 1 : -1, r = s>>3, f = s&7;
    let v = VAL[t];
    const ctr = centre(s);
    if (t==='N') v += ctr*4;
    else if (t==='B'){ v += ctr*2; if (white) wB++; else bB++; }
    else if (t==='Q') v += ctr;
    else if (t==='P'){
      const adv = white ? 6-r : r-1;
      v += adv*adv*2 + (f>=2 && f<=5 ? ctr*2 : 0) + PFB[f]*Math.min(adv,3);
      const mine = white ? PWf : PBf, theirs = white ? PBf : PWf;
      if (mine[f]>1) v -= 10;                                          // peón doblado
      if ((f===0 || !mine[f-1]) && (f===7 || !mine[f+1])) v -= 9;       // aislado
      if (!theirs[f] && (f===0 || !theirs[f-1]) && (f===7 || !theirs[f+1])) v += 8 + adv*adv*3;   // pasado (aprox.)
    }
    else if (t==='R'){
      const mine = white ? PWf : PBf, theirs = white ? PBf : PWf;
      if (!mine[f]) v += theirs[f] ? 8 : 16;                           // columna semiabierta / abierta
      if ((white && r===1) || (!white && r===6)) v += 14;              // torre en séptima
    }
    else if (t==='K'){ if (white) wK = s; else bK = s; v += queens ? -ctr*4 : ctr*3; }
    score += sign*v;
  }
  if (wB>=2) score += 28; if (bB>=2) score -= 28;
  if (queens){                                                         // refugio de peones del rey
    for (const [k, col, dir] of [[wK,'w',-1],[bK,'b',1]]){
      if (k<0) continue; const kr = k>>3, kf = k&7; let sh = 0;
      for (let df=-1; df<=1; df++){ const ff = kf+df; if (ff<0||ff>7) continue;
        for (let dr=1; dr<=2; dr++){ const rr = kr+dir*dr; if (rr<0||rr>7) break; if (b[rr*8+ff]===col+'P'){ sh += 3 - dr; break; } } }
      score += (col==='w' ? 1 : -1) * sh * 6;
    }
  }
  return st.turn==='w' ? score : -score;
}

// ---------- Tablas de búsqueda ----------
let nodes = 0, deadline = 0, stopped = false, allowStop = false, qLimit = 4;
const pathH = new Int32Array(256);
let histCount = new Map();
let TTMASK = 0, ttK2, ttScore, ttDepth, ttFlag, ttMove;
let killers, histTab;
const PROMO_CODE = { Q:1, R:2, B:3, N:4 }, PROMO_LET = ['', 'Q', 'R', 'B', 'N'];
const encMove = m => m.f | (m.t<<6) | ((m.promo ? PROMO_CODE[m.promo] : 0) << 12);

function allocTables(bits){
  const n = 1<<bits; TTMASK = n-1;
  ttK2 = new Int32Array(n); ttScore = new Int32Array(n); ttDepth = new Int8Array(n).fill(-1);
  ttFlag = new Uint8Array(n); ttMove = new Int32Array(n);
  killers = Array.from({length:130}, () => [0,0]); histTab = new Int32Array(4096);
}

function scoreMoves(st, moves, ply, tt){
  const bd = st.b, k1 = killers[ply][0], k2 = killers[ply][1];
  for (const m of moves){
    let k;
    const e = encMove(m);
    if (tt && e===tt) k = 1e7;
    else if (bd[m.t] || m.ep){ const vic = m.ep ? 100 : VAL[bd[m.t][1]]; k = 1e6 + 10*vic - VAL[bd[m.f][1]] + (m.promo ? VAL[m.promo] : 0); }
    else if (m.promo) k = 9e5 + VAL[m.promo];
    else if (e===k1) k = 8e5;
    else if (e===k2) k = 7e5;
    else k = histTab[m.f*64+m.t];
    m.k = k;
  }
  moves.sort((a,b) => b.k - a.k);
}

function quiesce(st, alpha, beta, depth){
  nodes++;
  const stand = evaluate(st);
  if (stand >= beta) return stand;
  if (stand > alpha) alpha = stand;
  if (depth<=0) return alpha;
  const caps = legalMoves(st, true);
  scoreMoves(st, caps, 0, 0);
  for (const m of caps){
    const v = -quiesce(m.next, -beta, -alpha, depth-1);
    if (v >= beta) return v;
    if (v > alpha) alpha = v;
  }
  return alpha;
}

function hasPieces(st){
  const p = st.turn;
  for (let s=0;s<64;s++){ const x = st.b[s]; if (x && x[0]===p && x[1]!=='P' && x[1]!=='K') return true; }
  return false;
}

function search(st, depth, alpha, beta, ply, nullOk){
  if ((++nodes & 2047)===0 && allowStop && Date.now() > deadline) stopped = true;
  if (stopped) return 0;
  computeHash(st);
  const h1 = H1, h2 = H2;
  pathH[ply] = h1;
  if (ply > 0){
    if (st.half >= 100) return 0;
    for (let i=ply-2; i>=0; i-=2) if (pathH[i]===h1) return 0;       // repetición dentro de la línea buscada
    if (histCount.has(h1)) return 0;                                  // repetición de una posición ya jugada
  }
  const inChk = inCheck(st);
  if (inChk && ply < 60) depth++;
  if (depth <= 0) return quiesce(st, alpha, beta, qLimit);
  const alpha0 = alpha;
  const idx = h1 & TTMASK; let tt = 0;
  if (ttDepth[idx]>=0 && ttK2[idx]===h2){
    tt = ttMove[idx];
    if (ttDepth[idx] >= depth){
      let sc = ttScore[idx];
      if (sc > MATE-1000) sc -= ply; else if (sc < -MATE+1000) sc += ply;
      const fl = ttFlag[idx];
      if (fl===0) return sc;
      if (fl===1){ if (sc > alpha) alpha = sc; } else if (sc < beta) beta = sc;
      if (alpha >= beta) return sc;
    }
  }
  if (nullOk && !inChk && depth>=3 && beta < MATE-1000 && hasPieces(st)){
    const ns = { b:st.b, turn:other(st.turn), castle:st.castle, ep:-1, half:st.half+1, full:st.full };
    const sc = -search(ns, depth-3, -beta, -beta+1, ply+1, false);
    if (stopped) return 0;
    if (sc >= beta) return sc >= MATE-1000 ? beta : sc;
  }
  const moves = legalMoves(st);
  if (!moves.length) return inChk ? -MATE+ply : 0;
  scoreMoves(st, moves, ply, tt);
  let best = -INF, bestM = 0, i = 0;
  for (const m of moves){
    const child = m.next;
    const quiet = !st.b[m.t] && !m.ep && !m.promo;
    let sc;
    if (i===0) sc = -search(child, depth-1, -beta, -alpha, ply+1, true);
    else {
      let red = 0;
      if (depth>=3 && i>=4 && quiet && !inChk) red = (i>=10 && depth>=5) ? 2 : 1;
      sc = -search(child, depth-1-red, -alpha-1, -alpha, ply+1, true);
      if (sc > alpha && red>0) sc = -search(child, depth-1, -alpha-1, -alpha, ply+1, true);
      if (sc > alpha && sc < beta) sc = -search(child, depth-1, -beta, -alpha, ply+1, true);
    }
    if (stopped) return 0;
    if (sc > best){ best = sc; bestM = encMove(m); }
    if (sc > alpha){
      alpha = sc;
      if (alpha >= beta){
        if (quiet){
          const e = encMove(m);
          if (killers[ply][0]!==e){ killers[ply][1] = killers[ply][0]; killers[ply][0] = e; }
          histTab[m.f*64+m.t] += depth*depth;
        }
        break;
      }
    }
    i++;
  }
  let st2 = best;
  if (st2 > MATE-1000) st2 += ply; else if (st2 < -MATE+1000) st2 -= ply;
  ttK2[idx] = h2; ttScore[idx] = st2; ttDepth[idx] = Math.min(depth, 100); ttMove[idx] = bestM;
  ttFlag[idx] = best <= alpha0 ? 2 : best >= beta ? 1 : 0;
  return best;
}

// Puntúa todas las jugadas de la raíz con ventana completa (niveles con error aleatorio)
function rootScores(st, moves, depth){
  allowStop = false; stopped = false;
  return moves.map(m => {
    pathH[0] = 0; computeHash(st); pathH[0] = H1;
    return { m, s: -search(m.next, depth-1, -INF, INF, 1, true) };
  });
}
const gauss = a => a * ((Math.random()+Math.random()+Math.random())/1.5 - 1);

function think(st, hc, level){
  const cfg = LEVELS[level] || LEVELS[3];
  nodes = 0; histCount = hc; qLimit = cfg.q; stopped = false;
  allocTables(cfg.time ? 18 : 16);
  const moves = legalMoves(st);
  if (!moves.length) return null;
  if (moves.length===1) return moves[0];
  computeHash(st); const rootH = H1;
  const ply = (st.full-1)*2 + (st.turn==='b' ? 1 : 0);
  // Niveles con profundidad fija: puntuar todas las jugadas, añadir error, elegir la mejor
  if (!cfg.time || (ply < 8 && level >= 5 && moves.length <= 24)){
    const depth = cfg.time ? 3 : cfg.depth;
    const sc = rootScores(st, moves, depth);
    let bestS = -INF, bestM = null;
    for (const x of sc){
      const real = Math.abs(x.s) < MATE-1000;
      const noisy = x.s + ((real || level===1) ? gauss(cfg.noise || 0) : 0);
      if (cfg.time){ x.n = x.s; } else { x.n = noisy; }
      if (x.n > bestS){ bestS = x.n; bestM = x.m; }
    }
    if (cfg.time){                    // apertura variada para los niveles fuertes
      const top = sc.filter(x => x.n >= bestS - 8);
      return top[Math.floor(Math.random()*top.length)].m;
    }
    return bestM;
  }
  // Niveles con tiempo: profundización iterativa
  const budget = cfg.time * TIME_SCALE;
  deadline = Date.now() + budget; allowStop = false;
  let bestM = moves[0], ordered = moves.slice();
  scoreMoves(st, ordered, 0, 0);
  for (let d=1; d<=cfg.max; d++){
    let alpha = -INF, iterBest = null, iterScore = -INF;
    stopped = false; allowStop = d>1;
    for (let i=0;i<ordered.length;i++){
      const m = ordered[i];
      pathH[0] = rootH;
      const child = m.next;
      let sc;
      if (i===0) sc = -search(child, d-1, -INF, -alpha, 1, true);
      else {
        sc = -search(child, d-1, -alpha-1, -alpha, 1, true);
        if (!stopped && sc > alpha) sc = -search(child, d-1, -INF, -alpha, 1, true);
      }
      if (stopped) break;
      if (sc > iterScore){ iterScore = sc; iterBest = m; }
      if (sc > alpha) alpha = sc;
    }
    if (stopped) break;                        // iteración incompleta: se descarta
    bestM = iterBest;
    ordered = [iterBest].concat(ordered.filter(m => m!==iterBest));
    if (Math.abs(iterScore) > MATE-200) break; // mate encontrado
    if (Date.now() > deadline) break;
  }
  return bestM;
}

// Reconstruye la posición desde la lista de jugadas y elige la mejor según el nivel
function chooseMove(moves, level){
  let st = initState(); const hc = new Map();
  for (const m of moves){ computeHash(st); hc.set(H1, (hc.get(H1)||0)+1); st = applyMove(st, m); }
  return think(st, hc, level);
}
// Compatibilidad: elegir desde un estado suelto (sin historial)
function bestMove(st, level){ return think(st, new Map(), level); }
