# Prueba: 16 ejércitos dibujan 6 piezas, duelos, tabla SAN, exportación CSV/PGN y desambiguación.
import os, json
from playwright.sync_api import sync_playwright
CH=os.environ.get('CHROME','/usr/bin/google-chrome'); URL='http://localhost:8766/index.html'
INIT="localStorage.setItem('ajh-server','http://localhost:8767');localStorage.setItem('ajh-lang','\"es\"');"
def S(n): return (8-int(n[1]))*8+'abcdefgh'.index(n[0])
def tap(pg,sq):
    b=pg.query_selector(f'#board .sq[data-s="{S(sq)}"]').bounding_box(); pg.mouse.click(b['x']+b['width']/2,b['y']+b['height']/2); pg.wait_for_timeout(60)
def mv(pg,a,b): tap(pg,a); tap(pg,b); pg.wait_for_timeout(260)
ok=[]
def check(name,cond,extra=''):
    ok.append(bool(cond)); print(('OK   ' if cond else 'FALLA'),name,extra)
SANQ="[...document.querySelectorAll('#moves tbody tr td:nth-child(4)')].map(t=>t.textContent)"
with sync_playwright() as p:
    br=p.chromium.launch(executable_path=CH,args=['--no-sandbox'])
    ctx=br.new_context(viewport={'width':390,'height':844},accept_downloads=True); ctx.add_init_script(INIT)
    errs=[]; A=ctx.new_page(); A.on('pageerror',lambda e:errs.append(str(e))); A.on('console',lambda m: errs.append(m.text) if m.type=='error' and '404' not in m.text else None)
    A.goto(URL); A.wait_for_timeout(400)
    # 1) ejércitos
    n=A.evaluate("""()=>{const r={};for(const k in FACTIONS){let c=0;for(const t of 'KQRBNP'){const s=pieceSVG(t,k,{});if(s&&s.includes('<svg')&&s.length>400)c++;}r[k]=c;}return r}""")
    check('16 ejércitos con 6 piezas cada uno', len(n)==16 and all(v==6 for v in n.values()), json.dumps(n))
    # 2) duelos
    A.click('[data-go=pvp]'); A.wait_for_timeout(200)
    chips=A.evaluate("document.querySelectorAll('#duels .chip').length"); check('chips de duelos',chips==8,str(chips))
    A.click('#duels .chip:nth-child(2)'); A.wait_for_timeout(150)
    sel=A.evaluate("[...document.querySelectorAll('.army.on b')].map(b=>b.textContent)"); check('duelo Proletariado vs Burguesía',sel==['Proletariado','Burguesía'],str(sel))
    A.screenshot(path='/tmp/t/n_setup.png')
    A.click('#btnStart'); A.wait_for_timeout(300)
    # 3) mate del pastor
    for a,b in [('e2','e4'),('e7','e5'),('f1','c4'),('b8','c6'),('d1','h5'),('g8','f6'),('h5','f7')]: mv(A,a,b)
    A.wait_for_timeout(900)
    check('aparece diálogo de fin de partida', A.is_visible('#dlg') and 'Fin de la partida' in A.inner_text('#dlg'))
    A.click('#dlg button:has-text("Ver tablero")'); A.wait_for_timeout(300)
    A.click('#tLog'); A.wait_for_timeout(300)
    san=A.evaluate(SANQ); check('SAN mate del pastor (letras en español; PGN en inglés)',san==['e4','e5','Ac4','Cc6','Dh5','Cf6','Dxf7#'],str(san))
    txt=A.inner_text('#moves'); check('resumen con resultado 1-0','1-0' in txt, txt[:120].replace('\n',' '))
    A.screenshot(path='/tmp/t/n_tabla.png')
    # 4) exportar
    with A.expect_download() as d: A.click('#xCsv')
    dl=d.value; csv=open(dl.path(),encoding='utf-8-sig',newline='').read(); rows=csv.strip().split('\r\n')
    check('CSV: cabecera + 7 filas',len(rows)==8 and rows[0].startswith('"N.º jugada";"Bando"') and '"Dxf7#"' in rows[7] and 'Burguesía' in rows[2],str(rows[-1:])+' | '+dl.suggested_filename)
    with A.expect_download() as d: A.click('#xPgn')
    pgn=open(d.value.path(),encoding='utf-8').read()
    check('PGN válido',all(s in pgn for s in ['[White "Proletariado"]','[Black "Burguesía"]','[Result "1-0"]','1. e4 e5 2. Bc4 Nc6 3. Qh5 Nf6 4. Qxf7# 1-0']),pgn.replace('\n',' | '))
    # 5) puente nativo (Android): se invoca shareFile con el contenido
    A.evaluate("window.__sf=null")
    A.reload(); A.wait_for_timeout(400)
    check('recarga sin errores',not errs,str(errs))
    br.close()

    # 6) desambiguación y enroque, partida nueva con puente nativo simulado
    br=p.chromium.launch(executable_path=CH,args=['--no-sandbox'])
    ctx=br.new_context(viewport={'width':390,'height':844}); ctx.add_init_script(INIT+"window.AjhNative={share(){},copy(){},shareFile(n,m,c){window.__sf=[n,m,c]}};")
    B=ctx.new_page(); errs2=[]; B.on('pageerror',lambda e:errs2.append(str(e)))
    B.goto(URL); B.wait_for_timeout(400); B.click('[data-go=pvp]'); B.click('#btnStart'); B.wait_for_timeout(300)
    for a,b in [('g1','f3'),('a7','a6'),('d2','d3'),('a6','a5'),('b1','d2'),('a5','a4'),('e2','e4'),('a4','a3'),('f1','e2'),('h7','h6'),('e1','g1')]: mv(B,a,b)
    B.click('#tLog'); B.wait_for_timeout(300)
    san=B.evaluate(SANQ); check('SAN: Nf3, Nbd2 desambiguado y O-O',san[0]=='Cf3' and san[4]=='Cbd2' and san[-1]=='O-O',str(san))
    B.click('#xCsv'); B.wait_for_timeout(200)
    sf=B.evaluate("window.__sf"); check('puente nativo shareFile recibe csv',sf and sf[0].endswith('.csv') and sf[1]=='text/csv' and 'O-O' in sf[2],str(sf[:2]) if sf else 'nada')
    B.click('#xPgn'); B.wait_for_timeout(200)
    sf=B.evaluate("window.__sf"); check('puente nativo shareFile recibe pgn',sf and sf[0].endswith('.pgn') and '1. Nf3 a6' in sf[2],sf[2][-80:] if sf else 'nada')
    check('sin errores de página',not errs2,str(errs2))
    br.close()
print('RESULTADO:', 'TODO OK' if all(ok) else 'HAY FALLAS', f'({sum(ok)}/{len(ok)})')
