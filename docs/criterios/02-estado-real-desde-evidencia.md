# Funcionalidad 2: "Estado real" generado desde la evidencia

La sección "Estado real" no se escribe a mano: se genera desde el archivo docs/estado-real.json, donde cada fila tiene qué, estado, fecha y link de evidencia. Así la página no puede decir más que lo que tiene evidencia.

- Issue: https://github.com/AlvaroAvaca/casa-de-software-landing/issues/3
- Prueba: pruebas/aceptacion/estado-real.spec.mjs y pruebas/unitarias/estado-real.test.mjs

## Criterios
1. Dado el archivo docs/estado-real.json con N filas, cuando se genera la página, entonces la tabla "Estado real" tiene exactamente N filas con el mismo texto, estado y link.
2. Dado una fila con estado "Verificado" o "Aprobado" sin link de evidencia, cuando se intenta generar la página, entonces la generación falla con un mensaje claro y no se publica nada.
3. Dado una fila con estado "Pendiente", cuando se genera, entonces aparece con la palabra "Pendiente" y sin link.
4. Dado que abro la página publicada, cuando leo la tabla, entonces cada estado se ve con su palabra (nunca solo un color).

## Formato de datos (docs/estado-real.json)
Lista de filas. Cada fila: que (texto), estado (uno de: Verificado, Aprobado, Pendiente, Cifra), detalle (texto corto, por ejemplo "el 28-09-2026" o "0 entregados"), evidencia (objeto con texto y url, o null). Regla: Verificado y Aprobado exigen evidencia con url; Pendiente y Cifra no la llevan.

## Generación
El script herramientas/generar-estado.mjs lee el JSON, valida, y reemplaza el contenido entre los marcadores "estado-real:inicio" y "estado-real:fin" dentro de sitio/index.html. Si falla la validación, termina con código 1 y no escribe nada.
