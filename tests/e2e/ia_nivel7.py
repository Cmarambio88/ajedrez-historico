import os
from playwright.sync_api import sync_playwright
import time
URL='http://localhost:8766/index.html'
def S(n): return (8-int(n[1]))*8+'abcdefgh'.index(n[0])
def tap(pg,sq):
    b=pg.query_selector(f'#board .sq[data-s="{S(sq)}"]').bounding_box(); pg.mouse.click(b['x']+b['width']/2,b['y']+b['height']/2); pg.wait_for_timeout(60)
def plies(pg): return pg.evaluate("document.querySelectorAll('#moves tbody tr').length")
def wait_plies(pg,n,to=30000): pg.wait_for_function(f"document.querySelectorAll('#moves tbody tr').length>={n}",timeout=to)
with sync_playwright() as p:
    br=p.chromium.launch(**({'executable_path':os.environ['CHROME']} if os.environ.get('CHROME') else {}),args=['--no-sandbox'])
    pg=br.new_context(viewport={'width':390,'height':844}).new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(URL); pg.wait_for_timeout(300)
    pg.click('[data-go=ai]'); pg.click('#levels button[data-n="7"]'); pg.click('#btnStart'); pg.wait_for_timeout(300)
    pg.evaluate("window.__t=0;setInterval(()=>window.__t++,50)")
    n=0
    for a,b in [('e2','e4'),('g1','f3'),('f1','c4')]:
        tap(pg,a); tap(pg,b); n+=2; t0=time.time(); t0t=pg.evaluate("window.__t")
        wait_plies(pg,n); dt=time.time()-t0; tk=pg.evaluate("window.__t")-t0t
        print(f'{a}{b}: respuesta en {dt:.1f}s; ticks {tk} (esperado ≈{int(dt*20)})')
    # salir mientras piensa y abrir otra partida: no debe colarse ninguna jugada
    tap(pg,'d2'); tap(pg,'d3'); pg.wait_for_timeout(600)
    print('pensando:', pg.evaluate("document.getElementById('status').classList.contains('think')"))
    print('back ->',pg.evaluate("window.__back()")); pg.wait_for_timeout(300)
    pg.click('[data-go=pvp]'); pg.click('#btnStart'); pg.wait_for_timeout(7000)
    print('tras 7 s en nueva partida pvp, jugadas:',plies(pg),'(esperado 0)')
    print('errores',errs); br.close()
