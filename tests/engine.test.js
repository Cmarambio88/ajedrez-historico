// Pruebas del motor de ajedrez (reglas e IA). Uso: node tests/engine.test.js
const fs = require('fs'), vm = require('vm'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, '../web/js/engine.js'), 'utf8');
const ctx = vm.createContext({ console, Math, Date, Map, Set, Uint32Array, Int32Array, Int16Array, Uint8Array, Float64Array, BigInt });
vm.runInContext(src + '\n;this.api={initState,stateFromFEN,perft,legalMoves,applyMove,inCheck,bestMove,chooseMove,LEVELS,sqName,insufficient};', ctx);
const A = ctx.api;
let fails = 0;
const ok = (c, msg) => { if (!c){ fails++; console.log('FALLA:', msg); } else console.log('ok   ', msg); };

// Conteo de jugadas (perft): referencia estándar de la comunidad
const start = A.initState();
ok(A.perft(start, 1)===20 && A.perft(start, 2)===400 && A.perft(start, 3)===8902, 'perft posición inicial d1-d3');
ok(A.perft(start, 4)===197281, 'perft posición inicial d4 = 197281');
const kiwi = A.stateFromFEN('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1');
ok(A.perft(kiwi, 3)===97862, 'perft Kiwipete d3 = 97862 (enroques, al paso, clavadas)');
const pos3 = A.stateFromFEN('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1');
ok(A.perft(pos3, 4)===43238, 'perft posición 3 d4 = 43238 (final con jaques descubiertos)');

// Mate y ahogado
const mate = A.stateFromFEN('rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3');
ok(A.inCheck(mate) && A.legalMoves(mate).length===0, 'mate del tonto detectado');
const stale = A.stateFromFEN('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1');
ok(!A.inCheck(stale) && A.legalMoves(stale).length===0, 'ahogado detectado');
ok(A.insufficient(A.stateFromFEN('8/8/8/4k3/8/8/3K4/8 w - - 0 1').b), 'rey contra rey es material insuficiente');

// IA: todos los niveles devuelven una jugada legal; los fuertes encuentran mate en 1
const m1 = A.stateFromFEN('6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1');
for (const lv of [1,2,3,4,5,6,7]){
  if (lv>=5) ctx.TIME_SCALE = 0.1;
  const mv = A.bestMove(m1, lv);
  const legal = A.legalMoves(m1).some(m => m.f===mv.f && m.t===mv.t);
  ok(legal, `nivel ${lv} (${A.LEVELS[lv].name}) devuelve jugada legal`);
}
for (const lv of [4,5,6,7]){
  const mv = A.bestMove(m1, lv);
  ok(A.sqName(mv.f)+A.sqName(mv.t)==='d1d8', `nivel ${lv} encuentra el mate en 1 (Td8#)`);
}
console.log(fails ? `\n${fails} prueba(s) fallaron` : '\nTodas las pruebas pasaron');
process.exit(fails ? 1 : 0);
