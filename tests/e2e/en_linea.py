import os
from playwright.sync_api import sync_playwright
import urllib.request
URL='http://localhost:8766/index.html'; INIT="localStorage.setItem('ajh-server','http://localhost:8767');"
def S(n): return (8-int(n[1]))*8+'abcdefgh'.index(n[0])
def tap(pg,sq):
    b=pg.query_selector(f'#board .sq[data-s="{S(sq)}"]').bounding_box(); pg.mouse.click(b['x']+b['width']/2,b['y']+b['height']/2); pg.wait_for_timeout(60)
def mv(pg,a,b): tap(pg,a); tap(pg,b); pg.wait_for_timeout(500)
def log(pg): return pg.evaluate("document.getElementById('moves').textContent")
def st(pg): return pg.inner_text('#status').replace('\n',' ')
with sync_playwright() as p:
    br=p.chromium.launch(**({'executable_path':os.environ['CHROME']} if os.environ.get('CHROME') else {}),args=['--no-sandbox'])
    errs=[]
    def newpage(name):
        c=br.new_context(viewport={'width':390,'height':844},device_scale_factor=2); c.add_init_script(INIT)
        pg=c.new_page(); pg.on('pageerror',lambda e:errs.append(name+' '+str(e))); pg.on('console',lambda m: errs.append(name+' '+m.text) if m.type=='error' and '404' not in m.text else None)
        pg.goto(URL); pg.wait_for_timeout(300); return pg
    A=newpage('A'); B=newpage('B')
    # A crea (Bando 1, Napoleón vs Samuráis)
    A.click('[data-go=online]'); A.click('#btnCreate')
    A.click('#rowB .army[data-k="samurai"]'); A.click('#btnStart'); A.wait_for_timeout(800)
    code=A.inner_text('#codeShow'); print('código:',code,'| estado A:',st(A),'| invitación visible:',A.is_visible('#invite'))
    mv(A,'e2','e4'); print('A mueve sin amigo -> bitácora:',repr(log(A)))
    A.screenshot(path='/tmp/t/o_wait.png')
    # B se une
    B.click('[data-go=online]'); B.fill('#codeIn',code.lower()); B.click('#btnJoin'); B.wait_for_timeout(3000)
    print('estado B:',st(B),'| tablero girado (negras):',B.evaluate("document.querySelector('#board .sq').dataset.s")=='63')
    print('B roles:',B.inner_text('#pTop .role'),'/',B.inner_text('#pBot .role'),'| A roles:',A.inner_text('#pTop .role'),'/',A.inner_text('#pBot .role'))
    print('A invitación oculta tras unirse:',not A.is_visible('#invite'),'| A estado:',st(A))
    # movimientos
    mv(B,'e7','e5'); print('B fuera de turno ignorado, A ve:',repr(log(A)))
    mv(A,'e2','e4'); print('B ve:',repr(log(B)))
    mv(B,'e7','e5'); mv(A,'g1','f3'); mv(B,'b8','c6'); print('A:',repr(log(A)),'\nB:',repr(log(B)))
    # B recarga y reanuda
    B.reload(); B.wait_for_timeout(500); print('B botón reanudar:',B.inner_text('#btnResume').replace('\n',' ')); B.click('#btnResume'); B.wait_for_timeout(2500)
    print('B tras reanudar:',repr(log(B)),'| lado:',B.inner_text('#pBot .role'),'| estado:',st(B))
    mv(A,'f1','c4'); print('B recibe:',repr(log(B)[-12:]))
    # pérdida de envío: 2 POST fallan, la jugada se reenvía
    urllib.request.urlopen('http://localhost:8767/__drop/6').read()
    mv(B,'g8','f6'); B.wait_for_timeout(300)
    urllib.request.urlopen('http://localhost:8767/__drop/0').read()
    A.wait_for_timeout(9000); print('tras fallos de red, A ve:',repr(log(A)[-14:]))
    # tercero = espectador
    C=newpage('C'); C.click('[data-go=online]'); C.fill('#codeIn',code.lower()); C.click('#btnJoin'); C.wait_for_timeout(3300)
    print('C (3.ª persona):',st(C),'| jugadas vistas:',len(__import__('re').findall('[–×]',log(C))))
    # mate del pastor para probar fin y rendición
    A.screenshot(path='/tmp/t/o_game.png')
    A.click('#btnMenu'); A.click('#mResign'); A.wait_for_timeout(200); A.click('#dlgBtns .btn.danger'); A.wait_for_timeout(1200)
    print('rendición -> A:',st(A),'| B:',st(B),'| C:',st(C))
    # código inexistente
    D=newpage('D'); D.click('[data-go=online]'); D.fill('#codeIn','zzzzz'); D.click('#btnJoin'); D.wait_for_timeout(10500); print('código inexistente ->',st(D))
    D.evaluate("window.__back()"); D.click('[data-go=online]'); D.fill('#codeIn','a!'); D.click('#btnJoin'); print('código inválido ->',D.inner_text('#joinErr'))
    print('errores:',errs); br.close()
