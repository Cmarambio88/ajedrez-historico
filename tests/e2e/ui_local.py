import os
from playwright.sync_api import sync_playwright
import time
URL='http://localhost:8766/index.html'; INIT="localStorage.setItem('ajh-server','http://localhost:8767');"
def S(n): return (8-int(n[1]))*8+'abcdefgh'.index(n[0])
def tap(pg,sq):
    b=pg.query_selector(f'#board .sq[data-s="{S(sq)}"]').bounding_box(); pg.mouse.click(b['x']+b['width']/2,b['y']+b['height']/2); pg.wait_for_timeout(60)
def mv(pg,a,b): tap(pg,a); tap(pg,b); pg.wait_for_timeout(250)
def nmoves(pg): return pg.evaluate("document.querySelectorAll('#moves .mv').length")  # filas
def logtxt(pg): return pg.inner_text('#moves').replace('\n',' ')
with sync_playwright() as p:
    br=p.chromium.launch(**({'executable_path':os.environ['CHROME']} if os.environ.get('CHROME') else {}),args=['--no-sandbox'])
    ctx=br.new_context(viewport={'width':390,'height':844},device_scale_factor=2); ctx.add_init_script(INIT)
    errs=[]
    A=ctx.new_page(); A.on('pageerror',lambda e:errs.append('A '+str(e))); A.on('console',lambda m: errs.append('A '+m.text) if m.type=='error' and '404' not in m.text else None)
    A.goto(URL); A.wait_for_timeout(400)
    # ---- máquina nivel 1
    A.click('[data-go=ai]'); A.click('#levels button[data-n="1"]'); A.click('#btnStart'); A.wait_for_timeout(300)
    mv(A,'e2','e4'); A.wait_for_function("document.querySelectorAll('.sq svg').length>=32 && !document.getElementById('status').classList.contains('think')",timeout=15000)
    A.wait_for_timeout(500); print('IA respondió, filas bitácora:', A.evaluate("document.querySelectorAll('#moves .mv').length"), '| log:', A.evaluate("document.getElementById('moves').innerText.replace(/\\n/g,' ')"))
    # jugada ilegal / turno
    mv(A,'e4','e6'); print('ilegal ignorada -> status:',A.inner_text('#status'))
    # deshacer
    A.click('#tUndo'); A.wait_for_timeout(300); print('tras deshacer, bitácora:',A.inner_text('#moves').replace('\n',' '))
    # girar
    A.click('#tFlip'); A.wait_for_timeout(100); print('flipped primer sq data-s:',A.evaluate("document.querySelector('#board .sq').dataset.s"))
    A.click('#tFlip')
    # reanudar tras recarga
    A.reload(); A.wait_for_timeout(500); print('botón continuar visible:', A.is_visible('#btnResume'), '|', A.inner_text('#btnResume').replace('\n',' '))
    A.click('#btnResume'); A.wait_for_timeout(400); print('reanudada, vista juego:', A.is_visible('#v-game'))
    A.screenshot(path='/tmp/t/f_resume.png')
    # ajustes: tema
    A.click('#btnMenu'); A.click('#mSettings'); A.click('#themes button[data-k="blue"]'); A.wait_for_timeout(200); print('tema:',A.evaluate("document.body.dataset.board"))
    A.screenshot(path='/tmp/t/f_settings.png'); A.click('#sh-settings [data-close]')
    A.click('#btnMenu'); A.click('#mArmies'); A.wait_for_timeout(200); A.screenshot(path='/tmp/t/f_armies.png'); A.click('#sh-armies [data-close]')
    # atrás con el botón del teléfono
    print('__back en juego ->', A.evaluate("window.__back()"), '| vista home:', A.is_visible('#v-home'), '| __back en home ->', A.evaluate("window.__back()"))
    # ---- nivel 7: no bloquea
    A.click('[data-go=ai]'); A.click('#levels button[data-n="7"]'); A.click('#btnStart'); A.wait_for_timeout(300)
    A.evaluate("window.__t=0;setInterval(()=>window.__t++,50)")
    mv(A,'e2','e4'); t0=time.time(); A.wait_for_function("(document.getElementById('moves').textContent.match(/[–×]/g)||[]).length>=2",timeout=30000)
    dt=time.time()-t0; tk=A.evaluate("window.__t"); print(f'nivel 7 pensó {dt:.1f}s, ticks {tk} (≈{int(dt*20)})')
    # cambiar de pantalla mientras piensa y volver: no se cuela jugada
    mv(A,'d2','d4'); A.wait_for_timeout(300); A.evaluate("window.__back()"); A.wait_for_timeout(300)
    print('en home tras salir pensando; vista home:',A.is_visible('#v-home'))
    A.click('[data-go=pvp]'); A.click('#btnStart'); A.wait_for_timeout(300)
    mv(A,'e2','e4'); mv(A,'e7','e5'); mv(A,'g1','f3'); print('pvp:',logtxt(A))
    # promoción
    A.evaluate("window.__back()")
    print('errores:',errs); br.close()
