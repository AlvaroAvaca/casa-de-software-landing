# Preset: sitio-estatico

Esta carpeta es la plantilla base para cualquier proyecto de sitio web estático de la Casa de software. Trae un servidor estático sin dependencias, una página de inicio mínima y accesible, y pruebas de aceptación con Playwright que verifican que esa página realmente funciona.

## Qué trae

- Una página de inicio en sitio/index.html, en español de Chile, responsiva y con modo claro/oscuro automático.
- Un servidor estático propio en herramientas/sirve.mjs, escrito en JavaScript puro (sin paquetes externos), que sirve la carpeta sitio/.
- Pruebas de aceptación en pruebas/aceptacion/inicio.spec.mjs, escritas con Playwright, con nombres en español en formato Dado/Cuando/Entonces para que cualquier persona de la Casa entienda qué se está verificando sin leer código.
- La única dependencia de todo el preset es @playwright/test.

## Cómo lo corre el juez (GitHub Actions)

El flujo de Actions del proyecto debe ejecutar, en este orden, dentro de esta carpeta:

npm ci

npx playwright install --with-deps chromium

npm test

Con eso alcanza: npm ci deja instalada exactamente la versión de @playwright/test fijada en package-lock.json, el segundo paso descarga el Chromium que esa versión necesita, y npm test corre las pruebas de aceptación en los dos proyectos configurados (escritorio y celular, ambos sobre el motor Chromium).

## Cómo correrlo localmente

Dentro de esta carpeta (plantilla/presets/sitio-estatico):

npm install

npm test

Si ya tienes un Chromium instalado por Playwright en tu máquina, npm test lo reutiliza sin descargar nada de nuevo. Si no tienes ninguno, corre antes npx playwright install chromium.

Para levantar el sitio a mano y mirarlo en el navegador, sin correr pruebas:

npm run servir

Eso deja el sitio disponible en http://127.0.0.1:4173.

Para revisar el último reporte HTML de una corrida de pruebas:

npm run test:informe

## La regla que no se negocia

Las pruebas de aceptación se escriben antes que el código que las hace pasar, y describen el comportamiento que Álvaro espera ver, no los detalles de implementación. Si una prueba falla, se arregla el código del sitio para que la prueba pase tal como está escrita. Nunca se debilita, se borra ni se comenta una prueba de aceptación solo para conseguir una corrida en verde: eso rompe la confianza que sostiene todo el proyecto, porque una demo aprobada por Álvaro deja de significar que el sitio realmente funciona.
