/* Ajedrez Histórico — idiomas: es (base), en, fr, pt.
   Las claves son los textos en español; t('texto', {a:..}) devuelve la traducción y reemplaza {a}. */
const LANGS = { es:'Español', en:'English', fr:'Français', pt:'Português' };
let LANG = 'es';
(() => {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem('ajh-lang')); } catch(e){}
  const nav = ((navigator.languages && navigator.languages[0]) || navigator.language || 'en').slice(0,2).toLowerCase();
  LANG = LANGS[saved] ? saved : (LANGS[nav] ? nav : 'en');
})();
function setLang(l){
  if (!LANGS[l]) return; LANG = l;
  try { localStorage.setItem('ajh-lang', JSON.stringify(l)); } catch(e){}
}

// ---------------- Textos de la interfaz ----------------
const I18N = {
en: {
'Ajustes':'Settings','Ajedrez':'Historic','Histórico':'Chess','Ejércitos de la historia sobre el tablero':'Armies of history on the board',
'Contra la máquina':'Against the computer','7 niveles de dificultad':'7 difficulty levels','Dos jugadores':'Two players','En el mismo teléfono':'On the same phone',
'En línea con un amigo':'Online with a friend','Con un código, sin cuentas':'With a code, no accounts','Conocer los ejércitos':'Meet the armies','Software libre · Licencia MIT':'Free software · MIT License',
'Volver':'Back','Nueva partida':'New game','Duelos históricos':'Historic duels','Bando 1':'Side 1','mueve primero':'moves first','Bando 2':'Side 2','Tú juegas con':'You play as','Al azar':'Random',
'Dificultad':'Difficulty','Comenzar':'Start','En línea':'Online','Crear una partida':'Create a game','Eliges los ejércitos y recibes un código para pasárselo a tu amigo.':'Pick the armies and get a code to send to your friend.',
'Crear partida':'Create game','Unirse con un código':'Join with a code','Escribe el código que te envió tu amigo.':'Type the code your friend sent you.','CÓDIGO':'CODE','Unirse':'Join',
'Las jugadas viajan por internet; ambos necesitan conexión.':'Moves travel over the internet; both players need a connection.',
'Salir':'Leave','Partida':'Game','Menú':'Menu','Conexión':'Connection','Código de la partida':'Game code','Compartir':'Share','Tablero de ajedrez':'Chessboard',
'Deshacer':'Undo','Girar':'Flip','Bitácora':'Moves','Nueva':'New','Guía':'Guide',
'Tablero':'Board','Símbolo clásico en cada pieza':'Classic chess symbol on every piece','Mostrar jugadas posibles':'Show possible moves','Mostrar coordenadas':'Show coordinates',
'Listo':'Done','Idioma':'Language','Formas de piezas clásicas':'Classic piece shapes','Usa las formas del ajedrez de siempre, con los colores de cada ejército.':'Use traditional chess shapes in each army’s colours.',
'Los ejércitos':'The armies','Cerrar':'Close','Bitácora de campaña':'Campaign log','Exportar CSV (Excel)':'Export CSV (Excel)','Exportar PGN':'Export PGN','Copiar PGN':'Copy PGN',
'Ver los ejércitos':'See the armies','Rendirme':'Resign','Guía de piezas':'Piece guide','Cómo se mueve cada pieza':'How each piece moves',
'Madera':'Wood','Clásico':'Classic','Azul':'Blue','Verde':'Green',
'Juega casi al azar y comete errores graves.':'Plays almost at random and makes serious mistakes.',
'Ve capturas simples, pero se equivoca seguido.':'Sees simple captures but often slips up.',
'Planea 2 jugadas. Ideal para empezar.':'Plans 2 moves ahead. Ideal to start with.',
'Planea 3 jugadas y comete pocos errores.':'Plans 3 moves ahead and rarely blunders.',
'Piensa hasta ~0,6 s por jugada.':'Thinks up to ~0.6 s per move.','Piensa hasta ~1,8 s por jugada.':'Thinks up to ~1.8 s per move.','Piensa hasta ~5,5 s por jugada. El más fuerte.':'Thinks up to ~5.5 s per move. The strongest.',
'Crear y obtener código':'Create and get code','Continuar partida':'Resume game','Volver a la partida en línea':'Back to the online game','Código {c}':'Code {c}','Nivel {n}':'Level {n}',
'Cancelar':'Cancel','Tú':'You','Máquina · {l}':'Computer · {l}','Jugador 1':'Player 1','Jugador 2':'Player 2','Tu amigo':'Your friend','Esperando a tu amigo…':'Waiting for your friend…',
'Ascenso del peón':'Pawn promotion','Fin de la partida':'Game over','Ver tablero':'View board','Empezar de nuevo':'Start over','¿Nueva partida?':'New game?','Se perderá la partida actual.':'The current game will be lost.',
'¿Rendirte?':'Resign?','Tu amigo ganará la partida.':'Your friend will win the game.',
'{a} se rinde. Victoria de {b}.':'{a} resigns. {b} wins.','¡Jaque mate! Victoria de {a}.':'Checkmate! {a} wins.','Tablas por ahogado.':'Draw by stalemate.',
'Tablas por la regla de los 50 movimientos.':'Draw by the 50-move rule.','Tablas por triple repetición.':'Draw by threefold repetition.','Tablas por material insuficiente.':'Draw by insufficient material.',
'No encontré esa partida.':'I couldn’t find that game.','Buscando la partida…':'Looking for the game…','{a} está pensando':'{a} is thinking','Turno de {a}':'{a} to move',' — ¡{j}!':' — {j}!','jaque':'check',' (tú)':' (you)',' · espectador':' · spectator',
'Esperando a que tu amigo se una…':'Waiting for your friend to join…',
'Aún no hay jugadas.':'No moves yet.','N.º':'No.','Bando':'Side','Pieza':'Piece','Jugada':'Move','Desde→Hasta':'From→To','Captura':'Capture','Estado':'Status','Jaque':'Check','Mate':'Mate',
'{n} jugadas':'{n} moves','Capturas: {a} {x} · {b} {y}':'Captures: {a} {x} · {b} {y}','Resultado: {r}':'Result: {r}',
'Blancas':'White','Negras':'Black','N.º jugada':'Move no.','Ejército':'Army','Jugada (SAN)':'Move (SAN)','Desde':'From','Hasta':'To',
'Aún no hay jugadas que exportar.':'There are no moves to export yet.','Archivo {n} generado':'File {n} created','Jugadas copiadas':'Moves copied','No se pudo copiar':'Could not copy',
'Sin conexión: la jugada se enviará al reconectar.':'Offline: the move will be sent when you reconnect.','Sin conexión: no se pudo crear la partida. Revisa tu internet.':'Offline: the game could not be created. Check your internet.',
'Ese código no es válido (4 a 8 letras o números).':'That code is not valid (4 to 8 letters or digits).',
'Juguemos Ajedrez Histórico. En la app elige «En línea con un amigo» → «Unirse» y escribe el código {c}.':'Let’s play Historic Chess. In the app choose “Online with a friend” → “Join” and enter the code {c}.',
'Invitar a un amigo':'Invite a friend','Exportar jugadas':'Export moves','Invitación copiada':'Invitation copied','Copia el código a mano: {c}':'Copy the code by hand: {c}','Copia el código a mano.':'Copy the code by hand.',
'Conectado':'Connected','Reconectando…':'Reconnecting…','vs':'vs',
'Toca una pieza para ver su nombre, su papel en el ajedrez y cómo se mueve.':'Tap a piece to see its name, its chess role and how it moves.',
'Rol: {r}':'Role: {r}','Se mueve así':'How it moves',
'Rey':'King','Reina':'Queen','Torre':'Rook','Alfil':'Bishop','Caballo':'Knight','Peón':'Pawn',
'Una casilla en cualquier dirección. Si lo atacan (jaque) debes protegerlo; si lo atrapan, pierdes.':'One square in any direction. If it is attacked (check) you must protect it; if it is trapped, you lose.',
'Cuantas casillas quieras en línea recta o en diagonal. Es la pieza más poderosa.':'Any number of squares in a straight line or diagonally. The most powerful piece.',
'Cuantas casillas quieras en línea recta, horizontal o vertical.':'Any number of squares in a straight line, horizontally or vertically.',
'Cuantas casillas quieras en diagonal.':'Any number of squares diagonally.',
'Salta en «L»: dos casillas y una al costado. Es la única que salta sobre otras piezas.':'Jumps in an “L”: two squares and one to the side. The only piece that jumps over others.',
'Avanza una casilla (dos la primera vez) y captura en diagonal. Al llegar al final se convierte en otra pieza.':'Moves forward one square (two the first time) and captures diagonally. At the far end it becomes another piece.'
},
fr: {
'Ajustes':'Réglages','Ajedrez':'Échecs','Histórico':'Historiques','Ejércitos de la historia sobre el tablero':'Les armées de l’Histoire sur l’échiquier',
'Contra la máquina':'Contre l’ordinateur','7 niveles de dificultad':'7 niveaux de difficulté','Dos jugadores':'Deux joueurs','En el mismo teléfono':'Sur le même téléphone',
'En línea con un amigo':'En ligne avec un ami','Con un código, sin cuentas':'Avec un code, sans compte','Conocer los ejércitos':'Découvrir les armées','Software libre · Licencia MIT':'Logiciel libre · Licence MIT',
'Volver':'Retour','Nueva partida':'Nouvelle partie','Duelos históricos':'Duels historiques','Bando 1':'Camp 1','mueve primero':'joue en premier','Bando 2':'Camp 2','Tú juegas con':'Vous jouez avec','Al azar':'Au hasard',
'Dificultad':'Difficulté','Comenzar':'Commencer','En línea':'En ligne','Crear una partida':'Créer une partie','Eliges los ejércitos y recibes un código para pasárselo a tu amigo.':'Choisissez les armées et recevez un code à envoyer à votre ami.',
'Crear partida':'Créer la partie','Unirse con un código':'Rejoindre avec un code','Escribe el código que te envió tu amigo.':'Saisissez le code envoyé par votre ami.','CÓDIGO':'CODE','Unirse':'Rejoindre',
'Las jugadas viajan por internet; ambos necesitan conexión.':'Les coups passent par Internet ; les deux joueurs doivent être connectés.',
'Salir':'Quitter','Partida':'Partie','Menú':'Menu','Conexión':'Connexion','Código de la partida':'Code de la partie','Compartir':'Partager','Tablero de ajedrez':'Échiquier',
'Deshacer':'Annuler','Girar':'Pivoter','Bitácora':'Coups','Nueva':'Nouvelle','Guía':'Guide',
'Tablero':'Échiquier','Símbolo clásico en cada pieza':'Symbole d’échecs classique sur chaque pièce','Mostrar jugadas posibles':'Afficher les coups possibles','Mostrar coordenadas':'Afficher les coordonnées',
'Listo':'Terminé','Idioma':'Langue','Formas de piezas clásicas':'Formes de pièces classiques','Usa las formas del ajedrez de siempre, con los colores de cada ejército.':'Utilise les formes traditionnelles des échecs aux couleurs de chaque armée.',
'Los ejércitos':'Les armées','Cerrar':'Fermer','Bitácora de campaña':'Journal de campagne','Exportar CSV (Excel)':'Exporter en CSV (Excel)','Exportar PGN':'Exporter en PGN','Copiar PGN':'Copier le PGN',
'Ver los ejércitos':'Voir les armées','Rendirme':'Abandonner','Guía de piezas':'Guide des pièces','Cómo se mueve cada pieza':'Comment se déplace chaque pièce',
'Madera':'Bois','Clásico':'Classique','Azul':'Bleu','Verde':'Vert',
'Juega casi al azar y comete errores graves.':'Joue presque au hasard et fait de grosses erreurs.',
'Ve capturas simples, pero se equivoca seguido.':'Voit les prises simples mais se trompe souvent.',
'Planea 2 jugadas. Ideal para empezar.':'Anticipe 2 coups. Idéal pour débuter.',
'Planea 3 jugadas y comete pocos errores.':'Anticipe 3 coups et fait peu d’erreurs.',
'Piensa hasta ~0,6 s por jugada.':'Réfléchit jusqu’à ~0,6 s par coup.','Piensa hasta ~1,8 s por jugada.':'Réfléchit jusqu’à ~1,8 s par coup.','Piensa hasta ~5,5 s por jugada. El más fuerte.':'Réfléchit jusqu’à ~5,5 s par coup. Le plus fort.',
'Crear y obtener código':'Créer et obtenir le code','Continuar partida':'Reprendre la partie','Volver a la partida en línea':'Retour à la partie en ligne','Código {c}':'Code {c}','Nivel {n}':'Niveau {n}',
'Cancelar':'Annuler','Tú':'Vous','Máquina · {l}':'Ordinateur · {l}','Jugador 1':'Joueur 1','Jugador 2':'Joueur 2','Tu amigo':'Votre ami','Esperando a tu amigo…':'En attente de votre ami…',
'Ascenso del peón':'Promotion du pion','Fin de la partida':'Fin de la partie','Ver tablero':'Voir l’échiquier','Empezar de nuevo':'Recommencer','¿Nueva partida?':'Nouvelle partie ?','Se perderá la partida actual.':'La partie en cours sera perdue.',
'¿Rendirte?':'Abandonner ?','Tu amigo ganará la partida.':'Votre ami gagnera la partie.',
'{a} se rinde. Victoria de {b}.':'{a} abandonne. Victoire de {b}.','¡Jaque mate! Victoria de {a}.':'Échec et mat ! Victoire de {a}.','Tablas por ahogado.':'Nulle par pat.',
'Tablas por la regla de los 50 movimientos.':'Nulle par la règle des 50 coups.','Tablas por triple repetición.':'Nulle par triple répétition.','Tablas por material insuficiente.':'Nulle par matériel insuffisant.',
'No encontré esa partida.':'Partie introuvable.','Buscando la partida…':'Recherche de la partie…','{a} está pensando':'{a} réfléchit','Turno de {a}':'Au tour de {a}',' — ¡{j}!':' — {j} !','jaque':'échec',' (tú)':' (vous)',' · espectador':' · spectateur',
'Esperando a que tu amigo se una…':'En attente que votre ami rejoigne…',
'Aún no hay jugadas.':'Aucun coup pour l’instant.','N.º':'N°','Bando':'Camp','Pieza':'Pièce','Jugada':'Coup','Desde→Hasta':'De→À','Captura':'Prise','Estado':'État','Jaque':'Échec','Mate':'Mat',
'{n} jugadas':'{n} coups','Capturas: {a} {x} · {b} {y}':'Prises : {a} {x} · {b} {y}','Resultado: {r}':'Résultat : {r}',
'Blancas':'Blancs','Negras':'Noirs','N.º jugada':'N° du coup','Ejército':'Armée','Jugada (SAN)':'Coup (SAN)','Desde':'De','Hasta':'À',
'Aún no hay jugadas que exportar.':'Aucun coup à exporter pour l’instant.','Archivo {n} generado':'Fichier {n} créé','Jugadas copiadas':'Coups copiés','No se pudo copiar':'Copie impossible',
'Sin conexión: la jugada se enviará al reconectar.':'Hors ligne : le coup sera envoyé à la reconnexion.','Sin conexión: no se pudo crear la partida. Revisa tu internet.':'Hors ligne : impossible de créer la partie. Vérifiez votre connexion.',
'Ese código no es válido (4 a 8 letras o números).':'Ce code n’est pas valide (4 à 8 lettres ou chiffres).',
'Juguemos Ajedrez Histórico. En la app elige «En línea con un amigo» → «Unirse» y escribe el código {c}.':'Jouons aux Échecs Historiques. Dans l’appli, choisissez « En ligne avec un ami » → « Rejoindre » et saisissez le code {c}.',
'Invitar a un amigo':'Inviter un ami','Exportar jugadas':'Exporter les coups','Invitación copiada':'Invitation copiée','Copia el código a mano: {c}':'Copiez le code à la main : {c}','Copia el código a mano.':'Copiez le code à la main.',
'Conectado':'Connecté','Reconectando…':'Reconnexion…','vs':'contre',
'Toca una pieza para ver su nombre, su papel en el ajedrez y cómo se mueve.':'Touchez une pièce pour voir son nom, son rôle aux échecs et comment elle se déplace.',
'Rol: {r}':'Rôle : {r}','Se mueve así':'Déplacement',
'Rey':'Roi','Reina':'Dame','Torre':'Tour','Alfil':'Fou','Caballo':'Cavalier','Peón':'Pion',
'Una casilla en cualquier dirección. Si lo atacan (jaque) debes protegerlo; si lo atrapan, pierdes.':'D’une case dans toutes les directions. S’il est attaqué (échec) il faut le protéger ; s’il est pris au piège, vous perdez.',
'Cuantas casillas quieras en línea recta o en diagonal. Es la pieza más poderosa.':'D’autant de cases que l’on veut en ligne droite ou en diagonale. La pièce la plus puissante.',
'Cuantas casillas quieras en línea recta, horizontal o vertical.':'D’autant de cases que l’on veut en ligne droite, horizontalement ou verticalement.',
'Cuantas casillas quieras en diagonal.':'D’autant de cases que l’on veut en diagonale.',
'Salta en «L»: dos casillas y una al costado. Es la única que salta sobre otras piezas.':'Saute en « L » : deux cases puis une sur le côté. La seule pièce qui saute par-dessus les autres.',
'Avanza una casilla (dos la primera vez) y captura en diagonal. Al llegar al final se convierte en otra pieza.':'Avance d’une case (deux la première fois) et prend en diagonale. Arrivé au bout, il devient une autre pièce.'
},
pt: {
'Ajustes':'Configurações','Ajedrez':'Xadrez','Histórico':'Histórico','Ejércitos de la historia sobre el tablero':'Os exércitos da história no tabuleiro',
'Contra la máquina':'Contra o computador','7 niveles de dificultad':'7 níveis de dificuldade','Dos jugadores':'Dois jogadores','En el mismo teléfono':'No mesmo celular',
'En línea con un amigo':'Online com um amigo','Con un código, sin cuentas':'Com um código, sem contas','Conocer los ejércitos':'Conhecer os exércitos','Software libre · Licencia MIT':'Software livre · Licença MIT',
'Volver':'Voltar','Nueva partida':'Nova partida','Duelos históricos':'Duelos históricos','Bando 1':'Lado 1','mueve primero':'joga primeiro','Bando 2':'Lado 2','Tú juegas con':'Você joga com','Al azar':'Aleatório',
'Dificultad':'Dificuldade','Comenzar':'Começar','En línea':'Online','Crear una partida':'Criar uma partida','Eliges los ejércitos y recibes un código para pasárselo a tu amigo.':'Escolha os exércitos e receba um código para enviar ao seu amigo.',
'Crear partida':'Criar partida','Unirse con un código':'Entrar com um código','Escribe el código que te envió tu amigo.':'Digite o código que seu amigo enviou.','CÓDIGO':'CÓDIGO','Unirse':'Entrar',
'Las jugadas viajan por internet; ambos necesitan conexión.':'As jogadas viajam pela internet; os dois precisam de conexão.',
'Salir':'Sair','Partida':'Partida','Menú':'Menu','Conexión':'Conexão','Código de la partida':'Código da partida','Compartir':'Compartilhar','Tablero de ajedrez':'Tabuleiro de xadrez',
'Deshacer':'Desfazer','Girar':'Girar','Bitácora':'Lances','Nueva':'Nova','Guía':'Guia',
'Tablero':'Tabuleiro','Símbolo clásico en cada pieza':'Símbolo clássico em cada peça','Mostrar jugadas posibles':'Mostrar jogadas possíveis','Mostrar coordenadas':'Mostrar coordenadas',
'Listo':'Pronto','Idioma':'Idioma','Formas de piezas clásicas':'Formas de peças clássicas','Usa las formas del ajedrez de siempre, con los colores de cada ejército.':'Usa as formas tradicionais do xadrez nas cores de cada exército.',
'Los ejércitos':'Os exércitos','Cerrar':'Fechar','Bitácora de campaña':'Diário de campanha','Exportar CSV (Excel)':'Exportar CSV (Excel)','Exportar PGN':'Exportar PGN','Copiar PGN':'Copiar PGN',
'Ver los ejércitos':'Ver os exércitos','Rendirme':'Desistir','Guía de piezas':'Guia das peças','Cómo se mueve cada pieza':'Como cada peça se move',
'Madera':'Madeira','Clásico':'Clássico','Azul':'Azul','Verde':'Verde',
'Juega casi al azar y comete errores graves.':'Joga quase ao acaso e comete erros graves.',
'Ve capturas simples, pero se equivoca seguido.':'Vê capturas simples, mas erra com frequência.',
'Planea 2 jugadas. Ideal para empezar.':'Planeja 2 jogadas. Ideal para começar.',
'Planea 3 jugadas y comete pocos errores.':'Planeja 3 jogadas e erra pouco.',
'Piensa hasta ~0,6 s por jugada.':'Pensa até ~0,6 s por jogada.','Piensa hasta ~1,8 s por jugada.':'Pensa até ~1,8 s por jogada.','Piensa hasta ~5,5 s por jugada. El más fuerte.':'Pensa até ~5,5 s por jogada. O mais forte.',
'Crear y obtener código':'Criar e obter código','Continuar partida':'Continuar partida','Volver a la partida en línea':'Voltar à partida online','Código {c}':'Código {c}','Nivel {n}':'Nível {n}',
'Cancelar':'Cancelar','Tú':'Você','Máquina · {l}':'Computador · {l}','Jugador 1':'Jogador 1','Jugador 2':'Jogador 2','Tu amigo':'Seu amigo','Esperando a tu amigo…':'Aguardando seu amigo…',
'Ascenso del peón':'Promoção do peão','Fin de la partida':'Fim da partida','Ver tablero':'Ver tabuleiro','Empezar de nuevo':'Recomeçar','¿Nueva partida?':'Nova partida?','Se perderá la partida actual.':'A partida atual será perdida.',
'¿Rendirte?':'Desistir?','Tu amigo ganará la partida.':'Seu amigo ganhará a partida.',
'{a} se rinde. Victoria de {b}.':'{a} desiste. Vitória de {b}.','¡Jaque mate! Victoria de {a}.':'Xeque-mate! Vitória de {a}.','Tablas por ahogado.':'Empate por afogamento.',
'Tablas por la regla de los 50 movimientos.':'Empate pela regra dos 50 lances.','Tablas por triple repetición.':'Empate por tripla repetição.','Tablas por material insuficiente.':'Empate por material insuficiente.',
'No encontré esa partida.':'Não encontrei essa partida.','Buscando la partida…':'Procurando a partida…','{a} está pensando':'{a} está pensando','Turno de {a}':'Vez de {a}',' — ¡{j}!':' — {j}!','jaque':'xeque',' (tú)':' (você)',' · espectador':' · espectador',
'Esperando a que tu amigo se una…':'Aguardando seu amigo entrar…',
'Aún no hay jugadas.':'Ainda não há jogadas.','N.º':'N.º','Bando':'Lado','Pieza':'Peça','Jugada':'Jogada','Desde→Hasta':'De→Para','Captura':'Captura','Estado':'Estado','Jaque':'Xeque','Mate':'Mate',
'{n} jugadas':'{n} jogadas','Capturas: {a} {x} · {b} {y}':'Capturas: {a} {x} · {b} {y}','Resultado: {r}':'Resultado: {r}',
'Blancas':'Brancas','Negras':'Pretas','N.º jugada':'N.º da jogada','Ejército':'Exército','Jugada (SAN)':'Jogada (SAN)','Desde':'De','Hasta':'Para',
'Aún no hay jugadas que exportar.':'Ainda não há jogadas para exportar.','Archivo {n} generado':'Arquivo {n} gerado','Jugadas copiadas':'Jogadas copiadas','No se pudo copiar':'Não foi possível copiar',
'Sin conexión: la jugada se enviará al reconectar.':'Sem conexão: a jogada será enviada ao reconectar.','Sin conexión: no se pudo crear la partida. Revisa tu internet.':'Sem conexão: não foi possível criar a partida. Verifique sua internet.',
'Ese código no es válido (4 a 8 letras o números).':'Esse código não é válido (4 a 8 letras ou números).',
'Juguemos Ajedrez Histórico. En la app elige «En línea con un amigo» → «Unirse» y escribe el código {c}.':'Vamos jogar Xadrez Histórico. No app escolha “Online com um amigo” → “Entrar” e digite o código {c}.',
'Invitar a un amigo':'Convidar um amigo','Exportar jugadas':'Exportar jogadas','Invitación copiada':'Convite copiado','Copia el código a mano: {c}':'Copie o código à mão: {c}','Copia el código a mano.':'Copie o código à mão.',
'Conectado':'Conectado','Reconectando…':'Reconectando…','vs':'vs',
'Toca una pieza para ver su nombre, su papel en el ajedrez y cómo se mueve.':'Toque numa peça para ver o nome, o papel dela no xadrez e como ela se move.',
'Rol: {r}':'Papel: {r}','Se mueve así':'Como se move',
'Rey':'Rei','Reina':'Rainha','Torre':'Torre','Alfil':'Bispo','Caballo':'Cavalo','Peón':'Peão',
'Una casilla en cualquier dirección. Si lo atacan (jaque) debes protegerlo; si lo atrapan, pierdes.':'Uma casa em qualquer direção. Se for atacado (xeque) você deve protegê-lo; se for encurralado, você perde.',
'Cuantas casillas quieras en línea recta o en diagonal. Es la pieza más poderosa.':'Quantas casas quiser em linha reta ou na diagonal. É a peça mais poderosa.',
'Cuantas casillas quieras en línea recta, horizontal o vertical.':'Quantas casas quiser em linha reta, na horizontal ou na vertical.',
'Cuantas casillas quieras en diagonal.':'Quantas casas quiser na diagonal.',
'Salta en «L»: dos casillas y una al costado. Es la única que salta sobre otras piezas.':'Salta em “L”: duas casas e uma para o lado. É a única que salta sobre outras peças.',
'Avanza una casilla (dos la primera vez) y captura en diagonal. Al llegar al final se convierte en otra pieza.':'Avança uma casa (duas na primeira vez) e captura na diagonal. Ao chegar ao fim vira outra peça.'
}
};

// Nombres de los niveles (el motor los tiene en inglés).
const LVL_NAMES = {
  es:['Muy fácil','Fácil','Normal','Difícil','Experto','Maestro','Gran Maestro'],
  en:['Very easy','Easy','Normal','Hard','Expert','Master','Grand Master'],
  fr:['Très facile','Facile','Normal','Difficile','Expert','Maître','Grand maître'],
  pt:['Muito fácil','Fácil','Normal','Difícil','Especialista','Mestre','Grande Mestre']
};

// Letras de las piezas en la notación mostrada (el PGN siempre usa las inglesas K Q R B N).
const SAN_LETTERS = {
  es:{K:'R',Q:'D',R:'T',B:'A',N:'C'}, en:{K:'K',Q:'Q',R:'R',B:'B',N:'N'},
  fr:{K:'R',Q:'D',R:'T',B:'F',N:'C'}, pt:{K:'R',Q:'D',R:'T',B:'B',N:'C'}
};

function t(s, v){
  let r = (LANG!=='es' && I18N[LANG] && I18N[LANG][s] !== undefined) ? I18N[LANG][s] : s;
  if (v) r = r.replace(/\{(\w+)\}/g, (m, k) => v[k] !== undefined ? v[k] : m);
  return r;
}
const roleName = type => t({ K:'Rey', Q:'Reina', R:'Torre', B:'Alfil', N:'Caballo', P:'Peón' }[type]);
const roleHelp = type => t({
  K:'Una casilla en cualquier dirección. Si lo atacan (jaque) debes protegerlo; si lo atrapan, pierdes.',
  Q:'Cuantas casillas quieras en línea recta o en diagonal. Es la pieza más poderosa.',
  R:'Cuantas casillas quieras en línea recta, horizontal o vertical.',
  B:'Cuantas casillas quieras en diagonal.',
  N:'Salta en «L»: dos casillas y una al costado. Es la única que salta sobre otras piezas.',
  P:'Avanza una casilla (dos la primera vez) y captura en diagonal. Al llegar al final se convierte en otra pieza.'
}[type]);
const lvlName = n => LVL_NAMES[LANG][n-1];

// ---------------- Textos de los ejércitos ----------------
// [nombre, época, descripción, Rey, Reina, Torre, Alfil, Caballo, Peón]
const FACTION_TXT = {
en: {
 napoleon:['Grande Armée','Napoleonic France, c. 1805','Napoleon’s Grande Armée dominated Europe from Austerlitz to Wagram thanks to its mobile army corps and massed artillery.','Emperor Napoleon','Empress Joséphine','12-pounder cannon','Guard standard-bearer','Cuirassier','Line fusilier'],
 mongol:['Mongol Empire','Genghis Khan, c. 1220','Genghis Khan’s tumens combined horse archers, iron discipline and siege engineers captured in China and Persia.','Genghis Khan','Börte, Great Khatun','Siege trebuchet','Shaman','Horse archer','Lancer'],
 soviet:['Red Army','Soviet Union, 1943','The Red Army held at Stalingrad and Kursk and advanced to Berlin with waves of T-34s and concentrated artillery.','Marshal of the Soviet Union','Mother Motherland','T-34 tank','Political commissar','Cossack rider','Rifleman'],
 wehrmacht:['Wehrmacht','Germany, 1941','The armed forces of the Third Reich: a blitzkrieg of armour and aircraft, stalled on the Eastern Front and defeated in 1945.','Field marshal','Germania','Panzer IV tank','Staff officer','Cavalry rider','Rifleman'],
 azteca:['Aztec Empire','Tenochtitlan, c. 1519','From Tenochtitlan, the Mexica Triple Alliance dominated central Mexico with its eagle and jaguar warrior orders until Cortés arrived in 1519.','Huey tlatoani Moctezuma','Queen Tecuichpo','Great Temple','High priest','Eagle warrior','Mexica warrior'],
 britanicos:['British Army','United Kingdom, 1815','Wellington’s redcoats, with Highlanders and the Scots Greys, stood firm at Waterloo and ended Napoleon’s empire.','Duke of Wellington','Queen Charlotte','Ship of the line','Highland piper','Scots Greys dragoon','Redcoat'],
 conquistadores:['Conquistadors','Hernán Cortés, 1519','Hernán Cortés’s expedition landed in 1519 and, with thousands of Tlaxcalan allies and the interpreter Malinche, took Tenochtitlan in 1521 after besieging it with brigantines on the lake.','Hernán Cortés','La Malinche','Brigantine','Friar Bartolomé de Olmedo','Lancer on horseback','Arquebusier'],
 samurai:['Samurai','Japan, 1274–1281','The samurai of the Kamakura shogunate repelled Kublai Khan’s two Mongol invasions, helped by the typhoons the Japanese called kamikaze, “divine wind”.','Regent Hōjō Tokimune','Tomoe Gozen','Pagoda','Warrior monk','Mounted samurai','Ashigaru'],
 atenas:['Athens','Pericles, 431 BC','Pericles’ Athens, with its unbeaten fleet, the Parthenon under construction and democracy in full bloom, faced Sparta and Persia in the golden age of the Greek world.','Pericles','Athena','Parthenon','Philosopher','Athenian horseman','Hoplite'],
 persia:['Persia','Xerxes I, 480 BC','Xerxes’ Achaemenid Empire launched the largest army of its time against Greece: Immortals, Scythian cavalry and a fleet with Queen Artemisia commanding her ships.','Xerxes I','Artemisia of Caria','Persepolis','Zoroastrian magus','Persian horseman','Immortal'],
 proletariado:['Proletariat','Revolutionary Russia, 1917','Workers, soldiers and peasants who stormed the Winter Palace in 1917 under Lenin, with Nadezhda Krupskaya organising education and the party.','Vladimir Lenin','Nadezhda Krupskaya','Factory','Agitator with flag','Red cavalry','Worker'],
 burguesia:['Bourgeoisie','Liberal capitalism, 1871–1957','Entrepreneurs, bankers and free-market thinkers: from Carl Menger’s marginalist revolution in Vienna to Ayn Rand’s radical individualism in New York.','Carl Menger','Ayn Rand','Skyscraper','Banker','Tycoon on horseback','Merchant'],
 eeuu:['United States','Vietnam War, 1968','The US Army in Vietnam: infantry, air cavalry with Huey helicopters and correspondents who brought the war to the world’s screens.','General Westmoreland','Lady Liberty','Huey helicopter','Army chaplain','1st Cavalry rider','GI infantryman'],
 vietnam:['Vietnam','Ho Chi Minh, 1946–1975','The Vietnamese resistance under Ho Chi Minh, with Viet Cong guerrillas, cargo bicycles along the Ho Chi Minh Trail and anti-aircraft defences, facing the greatest military power.','Ho Chi Minh','Trưng Trắc','Anti-aircraft gun','Buddhist monk','Guerrilla on a bicycle','Guerrilla'],
 blancas:['White pieces','Classic chess','The classic game: Staunton-style chess pieces, carved in ivory.','King','Queen','Rook','Bishop','Knight','Pawn'],
 negras:['Black pieces','Classic chess','The classic game: Staunton-style chess pieces, carved in ebony.','King','Queen','Rook','Bishop','Knight','Pawn']
},
fr: {
 napoleon:['Grande Armée','France napoléonienne, vers 1805','La Grande Armée de Napoléon a dominé l’Europe d’Austerlitz à Wagram grâce à ses corps d’armée mobiles et à son artillerie massive.','Empereur Napoléon','Impératrice Joséphine','Canon de 12 livres','Porte-aigle de la Garde','Cuirassier','Fusilier de ligne'],
 mongol:['Empire mongol','Gengis Khan, vers 1220','Les tumens de Gengis Khan alliaient archers à cheval, discipline de fer et ingénieurs de siège capturés en Chine et en Perse.','Gengis Khan','Börte, grande khatoun','Trébuchet de siège','Chaman','Archer à cheval','Lancier'],
 soviet:['Armée rouge','Union soviétique, 1943','L’Armée rouge a tenu à Stalingrad et à Koursk, puis a avancé jusqu’à Berlin avec des vagues de T-34 et une artillerie concentrée.','Maréchal de l’Union soviétique','Mère-Patrie','Char T-34','Commissaire politique','Cavalier cosaque','Fusilier'],
 wehrmacht:['Wehrmacht','Allemagne, 1941','Les forces armées du Troisième Reich : blitzkrieg de blindés et d’aviation, freinée sur le front de l’Est et vaincue en 1945.','Maréchal','Germania','Char Panzer IV','Officier d’état-major','Cavalier','Fusilier'],
 azteca:['Empire aztèque','Tenochtitlan, vers 1519','Depuis Tenochtitlan, la Triple Alliance mexica dominait le centre du Mexique avec ses ordres de guerriers-aigles et de guerriers-jaguars, jusqu’à l’arrivée de Cortés en 1519.','Huey tlatoani Moctezuma','Reine Tecuichpo','Grand Temple','Grand prêtre','Guerrier aigle','Guerrier mexica'],
 britanicos:['Armée britannique','Royaume-Uni, 1815','Les tuniques rouges de Wellington, avec les Highlanders et les Scots Greys, ont tenu à Waterloo et mis fin à l’empire de Napoléon.','Duc de Wellington','Reine Charlotte','Vaisseau de ligne','Cornemuseur highlander','Dragon des Scots Greys','Tunique rouge'],
 conquistadores:['Conquistadors','Hernán Cortés, 1519','L’expédition de Hernán Cortés débarqua en 1519 et, avec des milliers d’alliés tlaxcaltèques et l’interprète Malinche, prit Tenochtitlan en 1521 après l’avoir assiégée avec des brigantins sur le lac.','Hernán Cortés','La Malinche','Brigantin','Frère Bartolomé de Olmedo','Cavalier à la lance','Arquebusier'],
 samurai:['Samouraïs','Japon, 1274–1281','Les samouraïs du shogunat de Kamakura repoussèrent les deux invasions mongoles de Kubilai Khan, aidés par les typhons que les Japonais appelèrent kamikaze, « vent divin ».','Régent Hōjō Tokimune','Tomoe Gozen','Pagode','Moine guerrier','Samouraï à cheval','Ashigaru'],
 atenas:['Athènes','Périclès, 431 av. J.-C.','L’Athènes de Périclès, avec sa flotte invaincue, le Parthénon en construction et une démocratie en plein essor, affronta Sparte et la Perse à l’âge d’or du monde grec.','Périclès','Athéna','Parthénon','Philosophe','Cavalier athénien','Hoplite'],
 persia:['Perse','Xerxès Ier, 480 av. J.-C.','L’Empire achéménide de Xerxès lança contre la Grèce la plus grande armée de son temps : Immortels, cavalerie scythe et une flotte où la reine Artémise commandait ses navires.','Xerxès Ier','Artémise de Carie','Persépolis','Mage zoroastrien','Cavalier perse','Immortel'],
 proletariado:['Prolétariat','Russie révolutionnaire, 1917','Ouvriers, soldats et paysans qui prirent le Palais d’Hiver en 1917 sous la direction de Lénine, avec Nadejda Kroupskaïa organisant l’éducation et le parti.','Vladimir Lénine','Nadejda Kroupskaïa','Usine','Agitateur au drapeau','Cavalerie rouge','Ouvrier'],
 burguesia:['Bourgeoisie','Capitalisme libéral, 1871–1957','Entrepreneurs, banquiers et penseurs du libre marché : de la révolution marginaliste de Carl Menger à Vienne à l’individualisme radical d’Ayn Rand à New York.','Carl Menger','Ayn Rand','Gratte-ciel','Banquier','Magnat à cheval','Marchand'],
 eeuu:['États-Unis','Guerre du Vietnam, 1968','L’armée américaine au Vietnam : fantassins, cavalerie aérienne avec ses hélicoptères Huey et correspondants qui ont montré la guerre aux écrans du monde.','Général Westmoreland','Dame Liberté','Hélicoptère Huey','Aumônier militaire','Cavalier de la 1re de cavalerie','Fantassin GI'],
 vietnam:['Vietnam','Hô Chi Minh, 1946–1975','La résistance vietnamienne sous Hô Chi Minh, avec ses guérilleros du Viet Cong, ses vélos de transport sur la piste Hô Chi Minh et sa défense antiaérienne, face à la plus grande puissance militaire.','Hô Chi Minh','Trưng Trắc','Canon antiaérien','Moine bouddhiste','Guérillero à vélo','Guérillero'],
 blancas:['Pièces blanches','Échecs classiques','Le jeu classique : pièces d’échecs de style Staunton, sculptées dans l’ivoire.','Roi','Dame','Tour','Fou','Cavalier','Pion'],
 negras:['Pièces noires','Échecs classiques','Le jeu classique : pièces d’échecs de style Staunton, sculptées dans l’ébène.','Roi','Dame','Tour','Fou','Cavalier','Pion']
},
pt: {
 napoleon:['Grande Armée','França napoleônica, c. 1805','A Grande Armée de Napoleão dominou a Europa de Austerlitz a Wagram graças aos seus corpos de exército móveis e à artilharia em massa.','Imperador Napoleão','Imperatriz Josefina','Canhão de 12 libras','Porta-estandarte da Guarda','Couraceiro','Fuzileiro de linha'],
 mongol:['Império Mongol','Gengis Khan, c. 1220','Os tumens de Gengis Khan combinavam arqueiros a cavalo, disciplina de ferro e engenheiros de cerco capturados na China e na Pérsia.','Gengis Khan','Börte, grande catum','Trabuco de cerco','Xamã','Arqueiro a cavalo','Lanceiro'],
 soviet:['Exército Vermelho','União Soviética, 1943','O Exército Vermelho resistiu em Stalingrado e Kursk e avançou até Berlim com ondas de T-34 e artilharia concentrada.','Marechal da União Soviética','Mãe-Pátria','Tanque T-34','Comissário político','Cavaleiro cossaco','Fuzileiro'],
 wehrmacht:['Wehrmacht','Alemanha, 1941','As forças armadas do Terceiro Reich: blitzkrieg de blindados e aviação, detida na frente oriental e derrotada em 1945.','Marechal de campo','Germânia','Tanque Panzer IV','Oficial de estado-maior','Cavaleiro de cavalaria','Fuzileiro'],
 azteca:['Império Asteca','Tenochtitlan, c. 1519','A partir de Tenochtitlan, a Tríplice Aliança mexica dominou o centro do México com suas ordens de guerreiros-águia e guerreiros-onça, até a chegada de Cortés em 1519.','Huey tlatoani Montezuma','Rainha Tecuichpo','Templo Maior','Sumo sacerdote','Guerreiro águia','Guerreiro mexica'],
 britanicos:['Exército Britânico','Reino Unido, 1815','Os casacas-vermelhas de Wellington, com os escoceses das Highlands e os Scots Greys, resistiram em Waterloo e puseram fim ao império de Napoleão.','Duque de Wellington','Rainha Carlota','Navio de linha','Gaiteiro highlander','Dragão dos Scots Greys','Casaca-vermelha'],
 conquistadores:['Conquistadores','Hernán Cortés, 1519','A expedição de Hernán Cortés desembarcou em 1519 e, com milhares de aliados tlaxcaltecas e a intérprete Malinche, tomou Tenochtitlan em 1521 após cercá-la com bergantins no lago.','Hernán Cortés','La Malinche','Bergantim','Frei Bartolomé de Olmedo','Cavaleiro com lança','Arcabuzeiro'],
 samurai:['Samurais','Japão, 1274–1281','Os samurais do xogunato de Kamakura repeliram as duas invasões mongóis de Kublai Khan, ajudados pelos tufões que os japoneses chamaram de kamikaze, “vento divino”.','Regente Hōjō Tokimune','Tomoe Gozen','Pagode','Monge guerreiro','Samurai a cavalo','Ashigaru'],
 atenas:['Atenas','Péricles, 431 a.C.','A Atenas de Péricles, com sua frota imbatível, o Partenon em construção e a democracia em plena maturidade, enfrentou Esparta e a Pérsia na era de ouro do mundo grego.','Péricles','Atena','Partenon','Filósofo','Cavaleiro ateniense','Hoplita'],
 persia:['Pérsia','Xerxes I, 480 a.C.','O Império Aquemênida de Xerxes lançou contra a Grécia o maior exército de seu tempo: Imortais, cavalaria cita e uma frota com a rainha Artemísia no comando de seus navios.','Xerxes I','Artemísia de Cária','Persépolis','Mago zoroastrista','Cavaleiro persa','Imortal'],
 proletariado:['Proletariado','Rússia revolucionária, 1917','Operários, soldados e camponeses que tomaram o Palácio de Inverno em 1917 sob a direção de Lênin, com Nadezhda Krupskaia organizando a educação e o partido.','Vladimir Lênin','Nadezhda Krupskaia','Fábrica','Agitador com bandeira','Cavalaria vermelha','Operário'],
 burguesia:['Burguesia','Capitalismo liberal, 1871–1957','Empresários, banqueiros e pensadores do livre mercado: da revolução marginalista de Carl Menger em Viena ao individualismo radical de Ayn Rand em Nova York.','Carl Menger','Ayn Rand','Arranha-céu','Banqueiro','Magnata a cavalo','Comerciante'],
 eeuu:['Estados Unidos','Guerra do Vietnã, 1968','O exército americano no Vietnã: infantaria, cavalaria aérea com helicópteros Huey e correspondentes que levaram a guerra às telas do mundo.','General Westmoreland','Dama Liberdade','Helicóptero Huey','Capelão militar','Cavaleiro da 1.ª de Cavalaria','Infante GI'],
 vietnam:['Vietnã','Ho Chi Minh, 1946–1975','A resistência vietnamita sob Ho Chi Minh, com guerrilheiros vietcongues, bicicletas de carga pela trilha Ho Chi Minh e defesas antiaéreas, diante da maior potência militar.','Ho Chi Minh','Trưng Trắc','Canhão antiaéreo','Monge budista','Guerrilheiro de bicicleta','Guerrilheiro'],
 blancas:['Peças brancas','Xadrez clássico','O jogo clássico: peças de xadrez estilo Staunton, esculpidas em marfim.','Rei','Rainha','Torre','Bispo','Cavalo','Peão'],
 negras:['Peças pretas','Xadrez clássico','O jogo clássico: peças de xadrez estilo Staunton, esculpidas em ébano.','Rei','Rainha','Torre','Bispo','Cavalo','Peão']
}
};
const _ft = k => (LANG!=='es' && FACTION_TXT[LANG]) ? FACTION_TXT[LANG][k] : null;
const fName  = k => { const x = _ft(k); return x ? x[0] : FACTIONS[k].name; };
const fEra   = k => { const x = _ft(k); return x ? x[1] : FACTIONS[k].era; };
const fBlurb = k => { const x = _ft(k); return x ? x[2] : FACTIONS[k].blurb; };
const fPiece = (k, type) => { const x = _ft(k); return x ? x[3 + 'KQRBNP'.indexOf(type)] : FACTIONS[k].names[type]; };

// ---------------- Traducción de la página estática ----------------
function translateDOM(root){
  const attrs = ['aria-label','title','placeholder'];
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let n;
  while ((n = w.nextNode())){
    if (n.nodeType===3){
      if (n.__es === undefined) n.__es = n.nodeValue;
      const core = n.__es.trim();
      if (core) n.nodeValue = n.__es.replace(core, () => t(core));
    } else if (n.nodeType===1 && !/^(SCRIPT|STYLE|SVG)$/i.test(n.tagName)){
      for (const a of attrs){
        if (!n.hasAttribute(a)) continue;
        if (n['__es_'+a] === undefined) n['__es_'+a] = n.getAttribute(a);
        n.setAttribute(a, t(n['__es_'+a]));
      }
    }
  }
  if (root===document.body || root===document){ document.documentElement.lang = LANG; document.title = LANG==='es' ? 'Ajedrez Histórico' : t('Ajedrez') + ' ' + t('Histórico'); }
}
