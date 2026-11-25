/* Juego en línea sin cuentas ni servidor propio.
 *
 * Las jugadas viajan como mensajes cortos por un canal público de ntfy.sh (servicio libre de
 * publicación/suscripción). El canal se llama "ajh-" + código de la partida; quien conoce el código
 * puede jugar. ntfy guarda los mensajes unas horas, así que al reconectar se reconstruye la partida
 * leyéndolos de nuevo en orden. Se puede apuntar a un servidor ntfy propio (localStorage 'ajh-server').
 *
 * Mensajes (JSON):
 *   {k:'host', id, side, fw, fb}   crea la partida: bando del anfitrión y ejércitos
 *   {k:'guest', id}                el invitado se sienta (gana el primero que llega)
 *   {k:'mv', id, n, u}             jugada número n (0, 1, 2…) en notación e2e4 / e7e8q
 *   {k:'res', id}                  el remitente se rinde
 */
const Net = (() => {
  const DEFAULT_SERVER = 'https://ntfy.sh';
  const server = () => { try { return localStorage.getItem('ajh-server') || DEFAULT_SERVER; } catch(e){ return DEFAULT_SERVER; } };
  const CODE_CHARS = 'abcdefghjkmnpqrstuvwxyz23456789';
  const validCode = c => /^[a-z0-9]{4,8}$/.test(c || '');
  const newCode = () => { const a = new Uint32Array(5); crypto.getRandomValues(a); return [...a].map(x => CODE_CHARS[x % CODE_CHARS.length]).join(''); };
  const newId = () => { const a = new Uint32Array(3); crypto.getRandomValues(a); return [...a].map(x => x.toString(36)).join(''); };

  let ctl = null;   // conexión activa

  function open(code, handlers){
    close();
    const c = ctl = { code, stop:false, seen:new Set(), retry:0, abort:null, handlers };
    const topic = 'ajh-' + code;
    async function loop(){
      while (!c.stop){
        const ab = c.abort = new AbortController();
        try {
          const r = await fetch(`${server()}/${topic}/json?since=all`, { signal: ab.signal, cache:'no-store' });
          if (!r.ok) throw new Error('HTTP ' + r.status);
          c.retry = 0;
          const reader = r.body.getReader(), dec = new TextDecoder();
          let buf = '';
          for (;;){
            const { value, done } = await reader.read();
            if (done) break;
            buf += dec.decode(value, { stream:true });
            let i;
            while ((i = buf.indexOf('\n')) >= 0){
              const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
              if (!line) continue;
              let ev; try { ev = JSON.parse(line); } catch(e){ continue; }
              if (ev.event === 'open' || ev.event === 'keepalive'){ c.handlers.onState && c.handlers.onState(true); continue; }
              if (ev.event !== 'message' || c.seen.has(ev.id)) continue;
              c.seen.add(ev.id);
              let m; try { m = JSON.parse(ev.message); } catch(e){ continue; }
              if (m && typeof m === 'object') c.handlers.onMsg(m);
            }
          }
        } catch(e){ if (c.stop) return; }
        if (c.stop) return;
        c.handlers.onState && c.handlers.onState(false);
        c.retry++;
        await new Promise(res => setTimeout(res, Math.min(8000, 800 * c.retry)));
      }
    }
    loop();
    return c;
  }

  async function send(code, msg){
    // Reintenta unas veces: una jugada no debe perderse por un corte breve de señal.
    for (let i = 0; i < 4; i++){
      try {
        const r = await fetch(`${server()}/ajh-${code}`, { method:'POST', body: JSON.stringify(msg) });
        if (r.ok) return true;
      } catch(e){}
      await new Promise(res => setTimeout(res, 700 * (i + 1)));
    }
    return false;
  }

  function close(){
    if (!ctl) return;
    ctl.stop = true; try { ctl.abort && ctl.abort.abort(); } catch(e){}
    ctl = null;
  }

  const reconnect = () => { if (ctl && ctl.abort) try { ctl.abort.abort(); } catch(e){} };

  return { open, send, close, reconnect, validCode, newCode, newId, server };
})();
