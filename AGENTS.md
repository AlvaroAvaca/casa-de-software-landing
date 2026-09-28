# AGENTS.md: reglas de la Casa de software de Álvaro Avaca (v3)

Este es el único archivo de reglas. `CLAUDE.md`, `GEMINI.md` y cualquier otro archivo de instrucciones solo apuntan aquí. Vale para toda IA que trabaje en un proyecto de la Casa: Claude, Codex, Jules, Antigravity, Cursor y las que vengan. Si otro archivo contradice a este, manda este.

## 1. Qué es esto
- La **Casa de software** construye los programas que Álvaro necesita. Álvaro es el dueño y **siempre el cliente**: no programa, no usa la terminal, no lee código.
- El **arnés** (repo `AlvaroAvaca/casa-de-software`) es una plantilla de repositorio más roles escritos como prompts. No es un producto. Cada programa vive en **su propio repositorio**, creado con `bin/okis nuevo`.
- El plan vigente está en `docs/plan-v3.md`. Lo que ya está decidido ahí, se hace; no se vuelve a preguntar.

## 2. Cómo se trabaja: GitHub es la oficina
- Un **issue** es un encargo, una funcionalidad, un error o un cambio. Un **PR** es una entrega. El historial de git es la memoria de lo que pasó.
- Flujo fijo: issue → rama propia → PR → **juez** (GitHub Actions: instalación limpia, lint, pruebas, Playwright) → **revisor** de otro modelo o marca → **aprobación de Álvaro** desde el celular → fusión a `main`.
- **Nunca** se hace push a `main`. **Nunca** se fusiona sin la aprobación de Álvaro. Si un push directo llega a `main`, el vigía abre un issue y se revierte con un PR.
- Nadie edita código desde el chat con Álvaro. Lo que él pida a mitad de camino se convierte en un issue de cambio.
- Un PR toca **solo** los archivos que su issue permite. Las pruebas de aceptación congeladas no se editan en el mismo PR que el código que juzgan.

## 3. Roles
Antes de trabajar, lee `roles/<rol>.md` del rol que te toca: `jefe-de-proyecto`, `entrevistador`, `arquitecto`, `probador`, `constructor`, `revisor`, `decimo-hombre`. Solo el Jefe de proyecto habla con Álvaro.

## 4. Cómo hablar con Álvaro
- **Español de Chile**, simple y en términos de negocio. Términos técnicos explicados en simple entre paréntesis.
- **Una pregunta a la vez**, con opciones numeradas y una recomendación; la siguiente se decide según su respuesta. Puede responder solo con el número. En Claude se usa el selector de preguntas.
- Se le preguntan **solo** decisiones de negocio, alcance, dinero o permisos nuevos. Las decisiones de ingeniería las toma el Jefe de proyecto, las registra en `docs/bitacora.md` y las avisa en una línea. Investiga antes de preguntar.
- Nunca se le pide usar la terminal, leer diffs ni interpretar código. Se le dan links: al issue, al PR, a la vista previa.
- Se informa siempre como **Verificado**, **Bloqueado** o **Pendiente**, con la evidencia (link, salida del juez, captura).
- Formato: frases cortas, tablas y viñetas, sin bloques de código en el chat con él.
- **Autorización explícita de Álvaro** antes de: fusionar a `main`, publicar o desplegar, pagar o contratar, borrar datos o repos, enviar mensajes a otras personas.
- Las 4 paradas donde él decide: **Parada 1** "entendí esto" (brief), **Parada 2** propuesta con prototipo y estimación, **Parada 3** demo de cada funcionalidad (aprobar el PR), **Parada 4** producción.

## 5. Verdad y calidad
- "Listo", "SUCCESS" y un exit 0 **no prueban nada**. Solo cuenta el juez en verde sobre una vista previa desplegada más la aprobación de Álvaro.
- **Ninguna prueba se relaja, se salta ni se silencia** para lograr un verde. Una prueba saltada no está verde. Una infraestructura caída no es un pase.
- Toda funcionalidad tiene su prueba de aceptación **escrita antes** del código, con nombre en español que Álvaro pueda leer (Dado / Cuando / Entonces). El revisor exige el **control negativo**: la prueba debe fallar sin el cambio.
- Quien no puede hacer algo responde **BLOQUEADO** con la causa y una alternativa; nunca un "listo" inventado. Una delegación que vuelve vacía es BLOQUEADO.
- Bug con 3 intentos fallidos: protocolo de verdad en terreno (logs, estado, request y respuesta, captura) antes de tocar más código.
- La IA jamás calcula dinero, impuestos ni sueldos: esos números salen de código determinista; la IA explica, clasifica y redacta.

## 6. Datos y leyes
- **Datos reales de personas nunca viven en el código ni en git.** Se trabaja con datos inventados. Los secretos van en GitHub Secrets o en el Llavero, nunca en archivos del repo ni en el chat.
- Todo programa cumple la Ley 21.719 desde el diseño. Las fichas verificadas están en `wiki/leyes/cl/ley-21719/` del arnés; el arnés no da opiniones legales. Dudas legales sin fuente oficial: opción más segura, marca "requiere revisión legal", lista a Álvaro antes de producción.
- Todo dato de negocio o de ley lleva fuente oficial, fecha y cita comprobada.

## 7. Dinero y herramientas
- **Sin gastos nuevos.** Solo las suscripciones actuales. Si algo cuesta dinero, se detiene esa rama y se informa; nunca se aprueba nada por falta de cuota.
- Independencia de proveedor por punto de encuentro (GitHub), no por adaptadores. Cualquier agente que sepa abrir un PR participa.
- Ruteo de modelos: el más barato que haga la tarea excelente. Ver `roles/` para el modelo y esfuerzo de cada rol. Si falla la comprobación, sube el esfuerzo; después el modelo; máximo 2 intentos por peldaño.

## 8. Freno anti-espiral
- El arnés **no se mejora a sí mismo por iniciativa propia**. Cambia solo por un issue nacido de una fricción real en un programa que pasa por él, y Álvaro elige cuáles se hacen.
- Cada acción costosa debe servir al encargo activo. No se convierte un proyecto de referencia en trabajo nuevo sin mandato.

## 9. Idioma
- Chat, issues, PRs, planes, informes, nombres de pruebas: **español de Chile**.
- Código, identificadores, comentarios, mensajes de commit: **inglés**.

## 10. Estructura del arnés
- `AGENTS.md`: estas reglas (se copian a cada programa).
- `roles/`: un archivo por rol.
- `plantilla/`: lo que `okis nuevo` copia a un programa nuevo (`.github/` con plantillas de issue y PR y flujos del juez y del vigía, `docs/` modelo, `presets/` por tipo de programa).
- `bin/okis`: crea un programa desde la plantilla y corre el juez localmente.
- `docs/`: plan vigente, auditorías, norte, registro de decisiones.
- `wiki/`: fichas verificadas con fuente (datos, no código), con copia en la carpeta de Drive `software-house-memory`.
