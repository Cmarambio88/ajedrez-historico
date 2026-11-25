// Imita lo esencial de ntfy.sh: POST /<tema> y GET /<tema>/json?since=all (flujo NDJSON).
const http = require('http'); const topics = {}; let seq = 0;
http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS'){ res.writeHead(204); return res.end(); }
  const u = new URL(req.url, 'http://x');
  if (u.pathname.startsWith('/__drop/')){ global.dropN = +u.pathname.split('/')[2]; res.writeHead(200); return res.end('ok'); } const parts = u.pathname.split('/').filter(Boolean); const t = topics[parts[0]] ||= { msgs: [], subs: new Set() };
  if (req.method === 'POST'){
    let b = ''; req.on('data', d => b += d); req.on('end', () => {
      const ev = { id: 'm' + (++seq), time: Math.floor(Date.now()/1000), event: 'message', topic: parts[0], message: b };
      if (global.dropN > 0){ global.dropN--; res.writeHead(500); return res.end('drop'); }
      t.msgs.push(ev); for (const s of t.subs) s.write(JSON.stringify(ev) + '\n');
      res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(ev));
    }); return;
  }
  res.writeHead(200, { 'Content-Type': 'application/x-ndjson' });
  res.write(JSON.stringify({ id: 'o' + (++seq), event: 'open', topic: parts[0] }) + '\n');
  for (const m of t.msgs) res.write(JSON.stringify(m) + '\n');
  t.subs.add(res); const ka = setInterval(() => res.write(JSON.stringify({ event: 'keepalive' }) + '\n'), 15000);
  req.on('close', () => { t.subs.delete(res); clearInterval(ka); });
}).listen(8767, () => console.log('ntfy mock :8767'));
