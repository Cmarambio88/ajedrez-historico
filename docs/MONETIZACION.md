# ¿Se puede monetizar Ajedrez Histórico en Google Play?

*Evaluación hecha el 27-nov-2026. No es asesoría legal ni tributaria: las cifras de Google cambian, así que verifica cada punto marcado con 🔎 en la fuente indicada antes de decidir.*

## Veredicto

**Sí es publicable y monetizable, pero será un ingreso modesto.** El producto es diferenciado (16 ejércitos ilustrados, tabla exportable, 4 idiomas, sin cuentas), pero compite con Chess.com y Lichess, que son gratis. La Play Store es abrumadoramente gratuita: cerca del 97 % de las apps son gratis y solo ~3 % de las de Android se cobran por adelantado (Adapty, 2025). Por eso **no recomiendo cobrar por descargar la app**.

**Recomendación:** modelo *freemium* con **una sola compra única dentro de la app** (sin anuncios, sin suscripción).

| Qué | Propuesta |
|---|---|
| Gratis | Todo el juego: máquina (7 niveles), dos jugadores, en línea, tabla/exportación, 4 idiomas, piezas clásicas blancas/negras **y 4 ejércitos** (p. ej. Napoleón, Mongol, Atenas, Persia) |
| De pago, **una vez** | «Pack Historia»: los otros 10 ejércitos (Proletariado, Burguesía, EE.UU., Vietnam, Azteca, Conquistadores, Samuráis, Británicos, Ejército Rojo, Wehrmacht) |
| Precio idóneo | **USD 2,99** (precio base en la consola; Play muestra el equivalente local en CLP, revísalo 🔎) |
| Opcional | «Apoya el proyecto» USD 0,99 / 1,99 (compra consumible sin contenido) |

### Por qué USD 2,99 y no otro valor
- **USD 0,99:** el ingreso por comprador queda en ~USD 0,84 tras la comisión; necesitarías ~3× más compradores para igualar. Además percibido como «app basura».
- **USD 1,99:** razonable, pero deja dinero sobre la mesa: el pack tiene 10 ejércitos con ilustraciones propias.
- **USD 2,99:** por debajo del umbral psicológico de USD 3, equivale a «un café»; es el punto de equilibrio entre conversión y margen para un juego de nicho.
- **USD 3,99 o más:** sube la fricción sin marca conocida ni reseñas; pruébalo solo cuando tengas >100 reseñas con 4,5★.
- **Suscripción:** no se justifica; no hay contenido que se agote ni servidor que pagar mes a mes.
- **Anuncios:** rinden poco en una app de partidas largas, ensucian el diseño y obligan a formularios de consentimiento y revisión de contenido; no los recomiendo.

### Números de referencia (supuestos, no promesas)
Con ~5 % de conversión (cifra típica de free-to-play, no medida en tu juego) y comisión de 15 %:

| Instalaciones | Compradores (3–5 %) | Ingreso neto aprox. con USD 2,99 |
|---|---|---|
| 1.000 | 30–50 | USD 75–125 |
| 10.000 | 300–500 | USD 760–1.270 |
| 100.000 | 3.000–5.000 | USD 7.600–12.700 |

Lo difícil no es cobrar, sino **conseguir instalaciones**. Sin marketing, lo realista son cientos, no miles.

## Requisitos para publicar (lo que cambia el calendario)

1. **Cuenta de desarrollador:** pago único de USD 25. 
2. **Cuenta personal nueva = 12 testers durante 14 días seguidos** en prueba cerrada antes de pedir producción (aplica a cuentas personales creadas después del 13-nov-2023; las cuentas de organización están exentas pero exigen número D-U-N-S, que puede tardar hasta ~30 días). Planifica ~3 semanas para el primer lanzamiento. Fuente: [Play Console Help – app testing requirements](https://support.google.com/googleplay/android-developer/answer/14151465).
3. **Nivel de API:** desde el 31-ago-2026 toda app nueva o actualización debe apuntar a **Android 16 (API 36)**. **Esta versión 1.2.0 ya compila con `targetSdk 36`** (se agregó manejo de bordes del sistema y se desactivó el gesto «atrás» predictivo para conservar el botón atrás del juego). Fuente: [Play target API requirement](https://support.google.com/googleplay/android-developer/answer/11926878).
4. **Formato:** Play pide **AAB firmado**, no APK. El CI ya genera `app-release.aab` sin firmar; falta firmarlo con tu *upload key* (Play App Signing la custodia). Guarda la clave y su contraseña fuera del repositorio.
5. **Fichas obligatorias:** política de privacidad (URL pública), formulario *Data safety*, cuestionario de clasificación de contenido, capturas, icono 512 px, descripción en los 4 idiomas.
6. **Facturación:** para vender el pack hay que integrar **Google Play Billing** (no está implementado: hoy todo es gratis) y configurar un perfil de pagos.

## Comisiones e impuestos 🔎
- Google cobra una comisión de servicio; históricamente **15 % sobre los primeros USD 1 M anuales** por desarrollador, y anunció una estructura nueva con despliegue por regiones desde junio de 2026. Confirma el porcentaje vigente para Chile en [Play service fees](https://support.google.com/googleplay/android-developer/answer/112622).
- En Chile, Google cobra y remite el IVA de los servicios digitales al SII (el precio que ve el comprador ya lo incluye). **Tú** debes ver con un contador cómo declarar los ingresos que Google te paga (inicio de actividades, boleta de honorarios o empresa). Referencia: [SII – IVA digital](https://www.sii.cl/vat/).

## Riesgos específicos de este juego

| Riesgo | Nivel | Comentario |
|---|---|---|
| **Wehrmacht / Tercer Reich** | Medio | Google rechazó juegos históricos por contenido nazi en algunos países (caso *Attentat 1942*). Nuestras piezas **no usan esvásticas ni símbolos del régimen**, lo que ayuda, pero la descripción dice «Tercer Reich». Mitigación: llamarlo «Ejército alemán, 1941», sin descripción ideológica, y si la revisión lo objeta, excluirlo de la versión de Play (sigue en GitHub). Política: [Restricted content](https://support.google.com/googleplay/android-developer/answer/9878810). |
| **Figuras políticas reales** (Lenin, Ho Chi Minh, Ayn Rand, Menger, Westmoreland) | Bajo | Son personajes históricos fallecidos, tratados sin ofensa ni burla. Evita lemas o símbolos de grupos de odio y mantén el tono educativo (EDSA). |
| **Licencia MIT del repositorio** | Alto para el negocio | El código y el APK gratuito de GitHub seguirán libres: cualquiera podría publicar una copia. Para proteger el pack de pago, **mueve las ilustraciones premium a un repositorio privado o publícalas con licencia no comercial** de ahora en adelante (lo ya publicado bajo MIT no se puede retirar). |
| **Juego en línea por ntfy.sh** | Medio | Es un relé público gratuito, sin garantía de servicio y sin cifrado; los mensajes de una partida son legibles para quien conozca el código. Sirve para una app gratuita; para una app de pago convendría un servidor propio (Firebase o similar, con costo mensual). **No pongas el modo en línea como función premium** hasta tenerlo. Hay que declararlo en *Data safety*. |
| **Nombre** | Bajo | Busca «Ajedrez Histórico» en Play antes de reservarlo. |

## Hoja de ruta sugerida
1. Crear la cuenta de desarrollador (USD 25) y **reclutar 12 testers ya** (familia, amigos, colegas): el reloj de 14 días es el cuello de botella.
2. Subir el AAB 1.2.0 a prueba cerrada; recoger errores reales en teléfonos distintos (la app aún no se ha probado en dispositivos físicos).
3. Redactar política de privacidad y textos de la ficha en es/en/fr/pt.
4. Lanzar **gratis** con los 4 ejércitos base y medir uso 4–6 semanas.
5. Integrar Play Billing y activar el «Pack Historia» a USD 2,99; ajustar con datos reales.
6. Considerar servidor propio para el modo en línea.

## Fuentes
- Comisiones de servicio de Google Play: https://support.google.com/googleplay/android-developer/answer/112622
- Requisito de pruebas para cuentas personales nuevas: https://support.google.com/googleplay/android-developer/answer/14151465
- Requisito de nivel de API objetivo: https://support.google.com/googleplay/android-developer/answer/11926878
- Política de contenido restringido: https://support.google.com/googleplay/android-developer/answer/9878810
- Caso *Attentat 1942* en Play: https://www.pocketgamer.biz/news/73952/google-play-bans-attentat-1942/
- Proporción de apps gratuitas/pagas (Adapty): https://adapty.io/blog/freemium-app-monetization-strategies/
- Conversión típica free-to-play (~5 %): https://dev.to/paywallpro/hybrid-monetization-patterns-in-mobile-games-subscriptions-vs-iap-and-the-paywall-question-eeb
- IVA digital en Chile (SII): https://www.sii.cl/vat/
