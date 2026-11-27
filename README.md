# Ajedrez Histórico

Ajedrez 2D para Android con **ejércitos de la historia** en lugar de piezas clásicas: cada rey, dama, torre, alfil, caballo y peón es una figura ilustrada propia de su facción. Software libre (licencia MIT).

¿Quieres publicarlo en Google Play y cobrar? Mira [docs/MONETIZACION.md](docs/MONETIZACION.md).

## Ejércitos

Grande Armée (Napoleón) · Imperio Mongol (Gengis Kan) · Ejército Rojo · Wehrmacht · Imperio Azteca · Ejército Británico (1815) · Conquistadores (Hernán Cortés como rey y La Malinche como reina) · Samuráis (1274–1281) · **Atenas** (Pericles) · **Persia** (Jerjes I) · **Proletariado** (Lenin y Krúpskaya) · **Burguesía** (Carl Menger y Ayn Rand) · **Estados Unidos** (Vietnam, 1968) · **Vietnam** (Ho Chi Minh) · y un juego de **piezas clásicas blancas y negras** (estilo Staunton).
Puedes enfrentar a cualquier pareja de ejércitos; la pantalla de preparativos trae «Duelos históricos» para elegir parejas con un toque.

## Idiomas
Español, English, Français y Português. Se elige solo según el idioma del teléfono y se puede cambiar con el botón **🌐 ES/EN/FR/PT** de la portada o desde el menú de la partida. Los nombres de los ejércitos y de cada pieza también están traducidos; la notación de la tabla usa las letras de cada idioma, y el PGN exportado siempre usa la notación internacional.

## Ayudas para no confundirse con las piezas
- Cada ejército tiene su propia figura para cada pieza, y **todos los ejércitos tienen una reina propia** (Josefina, Börte, Madre Patria, Germania, Tecuichpo, la reina Carlota, Dama Libertad, La Malinche, Tomoe Gozen, Atenea, Artemisia, Krúpskaya, Ayn Rand, Trưng Trắc), pero igual, al tocar cualquier pieza —propia o rival— aparece una ficha con su nombre, su **papel en el ajedrez** (Rey, Reina, Torre, Alfil, Caballo, Peón) y cómo se mueve.
- Botón **Guía** con las 12 piezas de la partida y su movimiento.
- Opción **Formas de piezas clásicas** (Ajustes): usa las siluetas del ajedrez de siempre con los colores de cada ejército.
- Símbolo clásico en cada pieza (activado por defecto), última jugada y jaque resaltados.

## Tabla de jugadas exportable
En la partida, el botón de bitácora muestra una tabla con cada jugada en notación algebraica estándar (SAN), bando, pieza, origen y destino, capturas y jaques, más un resumen (jugadas, capturas por bando, resultado). Se exporta como **CSV** (separador `;`, abre directo en Excel en español), como **PGN** (compatible con Chess.com, Lichess y otros programas) o se copia al portapapeles. En Android se abre el menú «Compartir» (Drive, correo, WhatsApp…).

## Qué incluye

- **Contra la máquina**, 7 niveles: Very easy, Easy, Normal, Hard, Expert, Master y Grand Master. Los cuatro primeros limitan la profundidad de cálculo e introducen errores a propósito; los tres últimos piensan por tiempo (≈0,6 s, ≈1,8 s y ≈5,5 s).
- **Dos jugadores** en el mismo teléfono.
- **En línea con un amigo**: uno crea la partida y comparte un código de 5 caracteres; el otro lo escribe en «Unirse». Sin cuentas ni servidor propio.
- 4 diseños de tablero: madera, clásico (blanco y negro), azul oscuro/celeste y verde oscuro/verde pálido.
- Reglas completas: enroque, captura al paso, promoción, jaque mate, ahogado, tablas por repetición, por 50 jugadas y por material insuficiente.
- La partida local y la partida en línea se pueden retomar al reabrir la app.

## Instalar en Android

1. Entra a la pestaña **Releases** de este repositorio y descarga `ajedrez-historico.apk` de «Última versión (APK)». También está en **Actions → Compilar APK → Artifacts**.
2. Ábrelo en el teléfono y permite «instalar apps desconocidas» cuando Android lo pida (es un APK de depuración, firmado con la clave de depuración).

El APK se compila solo en GitHub cada vez que se actualiza la rama `main`.

## Compilar tú mismo

Requisitos: JDK 17, Android SDK (plataforma 34) y Gradle 8.7 o superior.

```bash
gradle :app:assembleDebug
# resultado: app/build/outputs/apk/debug/app-debug.apk
```

También puedes abrir la carpeta en Android Studio. El juego completo está en `web/`, que se empaqueta dentro de la app; para probarlo en un navegador basta servir esa carpeta:

```bash
cd web && python3 -m http.server 8000   # y abrir http://localhost:8000
```

## Estructura

| Ruta | Contenido |
|---|---|
| `web/index.html`, `web/css/` | Pantallas y estilos |
| `web/js/engine.js` | Motor de reglas y de la inteligencia artificial (búsqueda alfa-beta, tabla de transposición, niveles) |
| `web/js/pieces.js` | Facciones y dibujos SVG de las piezas |
| `web/js/net.js` | Juego en línea |
| `web/js/app.js` | Interfaz y control de la partida |
| `app/` | Contenedor Android (WebView) |
| `tests/` | Pruebas del motor (`node tests/engine.test.js`) y pruebas de interfaz con Playwright (`tests/e2e/`) |

Para agregar un ejército, añade una entrada a `FACTIONS` en `web/js/pieces.js` (colores, nombres de las seis piezas y dibujos).

## Cómo funciona el juego en línea

Las jugadas viajan como mensajes cortos por un canal público de [ntfy.sh](https://ntfy.sh) llamado `ajh-<código>`. Quien conoce el código puede jugar, así que trátalo como una invitación privada. Cada jugada se valida en ambos teléfonos (debe ser legal y llegar en orden), y al reconectar la partida se reconstruye leyendo los mensajes guardados por el servicio (unas horas). El tercero que entra con el mismo código queda como espectador.

Para usar un servidor ntfy propio, guarda su dirección en `localStorage` con la clave `ajh-server`.

## Pruebas

```bash
node tests/engine.test.js          # reglas (perft), mate/ahogado y niveles de la IA
```

Las pruebas de interfaz en `tests/e2e/` usan Playwright y un servidor ntfy simulado (`tests/e2e/ntfy_mock.js`, puerto 8767) con la carpeta `web/` servida en el puerto 8766.

## Licencia

MIT, ver [LICENSE](LICENSE).
