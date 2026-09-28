# Bitácora del proyecto

Memoria acumulativa: nunca se borra historia. La entrada nueva va arriba. La escribe el Jefe de proyecto al cerrar cada hito o al tomar una decisión de ingeniería.

## 28-09-2026, 18:20 CLT · Ramas reordenadas, etiqueta creada y datos de "Estado real" corregidos
- Qué se hizo: las ramas pruebas-congeladas, pagina y publicacion nacían de un commit anterior al final de vista-previa; se reordenaron sobre 488c159 para que cada PR muestre solo lo suyo. Se creó la etiqueta "pruebas congeladas" en el repo (vía API; no existía). Se corrigió docs/estado-real.json: la Parada 2 figuraba "Pendiente" estando aprobada, y la evidencia apuntaba al repo anterior; ahora apunta al arnés vigente (casa-de-software-v3). Los criterios citan los archivos de prueba reales.
- Decisiones (de ingeniería, Jefe de proyecto en la nube): abrir cada PR contra main solo después de fusionar el anterior, rebasando sobre el main real, para que el método de fusión que elija Álvaro no importe. El mando de la Casa volvió a la sesión en la nube (decisión V9 de Álvaro).
- Estado: Pendiente. El PR 1 (#2) espera la fusión de Álvaro; los PR 2, 3 y 4 se abren en orden.
- Qué sigue: fusión del PR 1; abrir el PR 2 con la etiqueta; el juez debe decir "Rojo esperado confirmado".
- Acciones técnicas pedidas a Álvaro hasta hoy (meta H0b: 0 desde ahora): crear el repo en github.com/new; activar GitHub Pages (Settings → Pages). Decisión de negocio que roza lo técnico: repo público con GitHub Pages (V5).

## 28-09-2026, 15:38 CLT · Vista previa sin job de despliegue
- Qué se hizo: el primer intento de activar GitHub Pages desde el flujo falló ("Resource not accessible by integration": el token del repo no puede activar Pages). Se quitó el job de despliegue; Pages se sirve desde la rama gh-pages y se activa una vez a mano.
- Decisiones (de ingeniería, Jefe de proyecto): Pages desde rama gh-pages, carpeta pr-preview/pr-N por PR; sin secretos ni servicios pagados.
- Estado: Verificado. Corrida fallida https://github.com/AlvaroAvaca/casa-de-software-landing/actions/runs/36466623240; corrida en verde https://github.com/AlvaroAvaca/casa-de-software-landing/actions/runs/36466772394; vista previa https://alvaroavaca.github.io/casa-de-software-landing/pr-preview/pr-2/ responde 200.
- Qué sigue: publicar la raíz en la Parada 4.

## 28-09-2026, 15:36 CLT · Regla del juez para pruebas congeladas ampliada
- Qué se hizo: la regla del juez solo permitía tocar pruebas/ en un PR de pruebas congeladas, pero las pruebas necesitan su configuración (package.json, package-lock.json, playwright.config.mjs) y sus datos y criterios (docs/). Se amplió aquí y en la plantilla del arnés.
- Decisiones (de ingeniería, Jefe de proyecto): primera mejora del arnés nacida de un programa real; registrada en el arnés (commit 048db9f de casa-de-software-v3).
- Estado: Verificado en el PR 1 (juez en verde 3 de 3 corridas).
- Qué sigue: nada.

## 28-09-2026, 15:35 CLT · Carga inicial directo a main y primer aviso del vigía
- Qué se hizo: el repo nuevo recibió su carga inicial con un push directo a main (no existía main). El vigía la detectó y abrió el issue #1 "PUSH NO AUTORIZADO a main: b66a3ac".
- Decisiones (de ingeniería, Jefe de proyecto): el issue se cerró como carga autorizada; desde ahí todo cambio entra por PR.
- Estado: Verificado. https://github.com/AlvaroAvaca/casa-de-software-landing/issues/1
- Qué sigue: nada.

## 28-09-2026, 14:40 CLT · Parada 2 aprobada: propuesta con estilo A "Taller"
- Qué se hizo: tres prototipos verificados con navegador real; Álvaro eligió el estilo A.
- Decisiones (de Álvaro): estilo A; sin gastos; 3 funcionalidades; no repetir preguntas fuera de las paradas (V6).
- Estado: Aprobado. Registro de decisiones del arnés, fila V6.
- Qué sigue: pruebas congeladas y construcción por PR.

## 28-09-2026, 14:20 CLT · Parada 1 aprobada: brief
- Qué se hizo: entrevista y brief de una página (docs/brief.md).
- Decisiones (de Álvaro): la landing es para él y para mostrar el arnés funcionando; hosting GitHub Pages en repo público; sin formularios, analítica, imágenes de IA ni datos de personas (V5).
- Estado: Aprobado. Registro de decisiones del arnés, fila V5.
- Qué sigue: propuesta con prototipos (Parada 2).
