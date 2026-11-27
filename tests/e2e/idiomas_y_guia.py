# Prueba: idiomas (es/en/fr/pt), cambio en caliente, nombres de ejércitos, ficha de pieza, guía, formas clásicas, SAN localizado.
import os, re, json
from playwright.sync_api import sync_playwright
CH=os.environ.get('CHROME','/usr/bin/google-chrome'); URL='http://localhost:8766/index.html'
SHOTS=os.environ.get('SHOTS','/tmp/t')
def S(n): return (8-int(n[1]))*8+'abcdefgh'.index(n[0])
def tap(pg,sq):
    b=pg.query_selector(f'#board .sq[data-s="{S(sq)}"]').bounding_box(); pg.mouse.click(b['x']+b['width']/2,b['y']+b['height']/2); pg.wait_for_timeout(80)
def mv(pg,a,b): tap(pg,a); tap(pg,b); pg.wait_for_timeout(260)
ok=[]
def check(name,cond,extra=''):
    ok.append(bool(cond)); print(('OK   ' if cond else 'FALLA'),name,extra)
EXPECT={ # texto en la portada, rol de la reina, nombre de la reina Proletariado, SAN del mate
 'es':dict(h='Contra la máquina', q='Reina', army='Proletariado', san='Dxf7#', start='Comenzar'),
 'en':dict(h='Against the computer', q='Queen', army='Proletariat', san='Qxf7#', start='Start'),
 'fr':dict(h='Contre l’ordinateur', q='Dame', army='Prolétariat', san='Dxf7#', start='Commencer'),
 'pt':dict(h='Contra o computador', q='Rainha', army='Proletariado', san='Dxf7#', start='Começar'),
}
with sync_playwright() as p:
    br=p.chromium.launch(executable_path=CH,args=['--no-sandbox'])
    # 0) detección automática por idioma del navegador
    for loc,exp in [('fr-FR','fr'),('pt-BR','pt'),('en-GB','en'),('es-CL','es'),('de-DE','en')]:
        c=br.new_context(locale=loc,viewport={'width':390,'height':844}); pg=c.new_page(); pg.goto(URL); pg.wait_for_timeout(250)
        got=pg.evaluate("LANG"); check(f'idioma automático {loc} → {exp}',got==exp,got); c.close()
    # 1) cada idioma: portada, setup, partida, tabla
    for lang,e in EXPECT.items():
        ctx=br.new_context(viewport={'width':390,'height':844},accept_downloads=True)
        ctx.add_init_script("localStorage.setItem('ajh-lang',JSON.stringify('%s'));localStorage.setItem('ajh-server','http://localhost:8767');"%lang)
        pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda x:errs.append(str(x)))
        pg.goto(URL); pg.wait_for_timeout(300)
        check(f'[{lang}] portada traducida',e['h'] in pg.inner_text('.menu'),pg.inner_text('.menu').replace('\n',' | ')[:90])
        check(f'[{lang}] <html lang>',pg.evaluate("document.documentElement.lang")==lang)
        pg.screenshot(path=f'{SHOTS}/i_{lang}_home.png')
        pg.click('[data-go=pvp]'); pg.wait_for_timeout(200)
        pg.click('#duels .chip:nth-child(2)'); pg.wait_for_timeout(150)
        check(f'[{lang}] ejército traducido en preparativos',e['army'] in pg.inner_text('#rowW'),pg.inner_text('#duels').replace('\n',' ')[:80])
        check(f'[{lang}] botón comenzar',pg.inner_text('#btnStart')==e['start'])
        pg.screenshot(path=f'{SHOTS}/i_{lang}_setup.png')
        pg.click('#btnStart'); pg.wait_for_timeout(300)
        # ficha de pieza: tocar la reina blanca (d1) → rol
        tap(pg,'d1'); info=pg.inner_text('#pinfo'); check(f'[{lang}] ficha de la reina muestra rol {e["q"]}',e['q'] in info,info.replace('\n',' | ')[:120])
        pg.screenshot(path=f'{SHOTS}/i_{lang}_game.png')
        # tocar pieza rival muestra ficha sin mover
        tap(pg,'e7'); check(f'[{lang}] ficha de pieza rival',pg.is_visible('#pinfo') and pg.inner_text('#pinfo')!=info)
        tap(pg,'d1')  # deselecciona/selecciona
        pg.reload(); pg.wait_for_timeout(300)
        pg.click('#btnResume'); pg.wait_for_timeout(300)
        # mate del pastor
        for a,b in [('e2','e4'),('e7','e5'),('f1','c4'),('b8','c6'),('d1','h5'),('g8','f6'),('h5','f7')]: mv(pg,a,b)
        pg.wait_for_timeout(900)
        pg.click('#dlg .btn.primary,#dlg button >> nth=0'); pg.wait_for_timeout(300)
        pg.click('#tLog'); pg.wait_for_timeout(300)
        san=pg.evaluate("[...document.querySelectorAll('#moves tbody tr td:nth-child(4)')].map(t=>t.textContent)")
        check(f'[{lang}] SAN localizado termina en {e["san"]}',san and san[-1]==e['san'],str(san))
        pg.screenshot(path=f'{SHOTS}/i_{lang}_tabla.png')
        pg.click('#sh-log [data-close]'); pg.wait_for_timeout(150)
        # guía
        pg.click('#tGuide'); pg.wait_for_timeout(250)
        g=pg.inner_text('#guideList'); check(f'[{lang}] guía lista 12 piezas con rol',g.count(e['q'])>=2 and len(pg.query_selector_all('#guideList .gd'))==12,str(len(pg.query_selector_all('#guideList .gd'))))
        pg.screenshot(path=f'{SHOTS}/i_{lang}_guia.png')
        check(f'[{lang}] sin errores de página',not errs,str(errs)); ctx.close()
    # 2) cambio de idioma en caliente desde Ajustes
    ctx=br.new_context(viewport={'width':390,'height':844}); ctx.add_init_script("if(!localStorage.getItem('ajh-lang'))localStorage.setItem('ajh-lang',JSON.stringify('es'));")
    pg=ctx.new_page(); pg.goto(URL); pg.wait_for_timeout(300)
    pg.click('#btnSettings'); pg.wait_for_timeout(200)
    for lang in ['en','fr','pt','es']:
        pg.click(f'#langs button[data-k={lang}]'); pg.wait_for_timeout(200)
        check(f'cambio en caliente → {lang}',EXPECT[lang]['h'] in pg.inner_text('.menu') and pg.evaluate("LANG")==lang)
    pg.click('#langs button[data-k=en]'); pg.wait_for_timeout(150); pg.click('#sh-settings [data-close]')
    pg.reload(); pg.wait_for_timeout(300); check('el idioma elegido se recuerda',EXPECT['en']['h'] in pg.inner_text('.menu'))
    # 2b) botón de idioma visible en la portada y en el menú de partida
    pg.goto(URL); pg.wait_for_timeout(300)
    check('botón de idioma en portada muestra 🌐 EN', pg.inner_text('#btnLang')=='🌐 EN' and pg.is_visible('#btnLang'), pg.inner_text('#btnLang'))
    pg.click('#btnLang'); pg.wait_for_timeout(200)
    opts=pg.evaluate("[...document.querySelectorAll('#dlgOpts button')].map(b=>b.textContent)"); check('el selector ofrece los 4 idiomas',opts==['Español','English','Français','Português'],str(opts))
    pg.click('#dlgOpts button:has-text("Français")'); pg.wait_for_timeout(250)
    check('botón de idioma cambia a FR y traduce',pg.inner_text('#btnLang')=='🌐 FR' and 'Contre l’ordinateur' in pg.inner_text('.menu'))
    pg.click('[data-go=pvp]'); pg.click('#btnStart'); pg.wait_for_timeout(300); pg.click('#btnMenu'); pg.wait_for_timeout(150)
    check('menú de partida tiene botón Langue',pg.is_visible('#mLang') and pg.inner_text('#mLang')=='Langue')
    pg.click('#mLang'); pg.wait_for_timeout(200); pg.click('#dlgOpts button:has-text("English")'); pg.wait_for_timeout(250)
    check('cambiar idioma en plena partida conserva la partida',pg.is_visible('#board') and pg.inner_text('#gameTitle')=='Two players',pg.inner_text('#gameTitle'))
    pg.click('#btnMenu'); pg.click('#mSettings'); pg.wait_for_timeout(100); pg.evaluate("document.getElementById('optClassic').checked&&0")
    pg.click('#sh-settings [data-close]'); pg.goto(URL); pg.wait_for_timeout(300)
    # 3) formas clásicas
    pg.click('#btnSettings'); pg.click('#optClassic'); pg.wait_for_timeout(150); pg.click('#sh-settings [data-close]')
    pg.click('[data-go=pvp]'); pg.click('#btnStart'); pg.wait_for_timeout(300)
    check('formas clásicas: piezas dibujadas',pg.evaluate("document.querySelectorAll('#board svg').length")==32)
    pg.screenshot(path=f'{SHOTS}/i_classic.png'); ctx.close()
    # 4) todas las traducciones de ejércitos tienen 9 campos y los textos de la UI no quedan en español
    c=br.new_context(); pg=c.new_page(); pg.goto(URL); pg.wait_for_timeout(200)
    r=pg.evaluate("""()=>{const bad=[];for(const l of ['en','fr','pt']){for(const k in FACTIONS){const x=FACTION_TXT[l][k];if(!x||x.length!==9||x.some(v=>!v))bad.push(l+':'+k)}}
      const es=Object.keys(I18N.en);const miss=[];for(const l of ['fr','pt'])for(const k of es)if(I18N[l][k]===undefined)miss.push(l+':'+k);
      const extra=[];for(const l of ['fr','pt'])for(const k in I18N[l])if(I18N.en[k]===undefined)extra.push(l+':'+k);return {bad,miss,extra}}""")
    check('16 ejércitos × 3 idiomas completos; diccionarios simétricos',not r['bad'] and not r['miss'] and not r['extra'],json.dumps(r,ensure_ascii=False))
    # 5) cada ejército tiene una reina de verdad (nombre propio de mujer/alegoría femenina)
    q=pg.evaluate("Object.fromEntries(Object.entries(FACTIONS).map(([k,f])=>[k,f.names.Q]))")
    want={'napoleon':'Emperatriz Josefina','mongol':'Börte, gran jatún','soviet':'Madre Patria','wehrmacht':'Germania','azteca':'Reina Tecuichpo','britanicos':'Reina Carlota','eeuu':'Dama Libertad','conquistadores':'La Malinche','samurai':'Tomoe Gozen','atenas':'Atenea','persia':'Artemisia de Caria','proletariado':'Nadezhda Krúpskaya','burguesia':'Ayn Rand','vietnam':'Trưng Trắc'}
    bad={k:q[k] for k in want if q.get(k)!=want[k]}
    check('14 ejércitos históricos con reina propia (+2 juegos clásicos)',not bad and len(q)==16,str(bad))
    sv=pg.evaluate("Object.keys(FACTIONS).map(k=>pieceSVG('Q',k,{noBadge:true}))"); check('las 16 reinas se dibujan distintas',len(set(sv))==16,str(len(set(sv))))
    br.close()
print('RESULTADO:', 'TODO OK' if all(ok) else 'HAY FALLAS', f'({sum(ok)}/{len(ok)})')
