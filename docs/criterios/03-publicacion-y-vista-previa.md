# Funcionalidad 3: publicación en GitHub Pages y vista previa por PR

- Issue: (se crea al existir el repo)
- Prueba: pruebas/aceptacion/publicacion.spec.mjs (humo contra la URL pública) y el flujo de Actions

## Criterios
1. Dado un PR abierto, cuando el juez termina en verde, entonces el PR recibe un comentario con un link de vista previa que muestra la página de esa rama.
2. Dado que Álvaro aprueba y fusiona a main, cuando termina el flujo de publicación, entonces la URL pública responde 200 y contiene el h1 "Casa de software de Álvaro Avaca".
3. Dado un push a main que no vino de un PR fusionado por el dueño, cuando corre el vigía, entonces se abre un issue "PUSH NO AUTORIZADO" y el flujo falla visiblemente.
4. Dado cualquier flujo de publicación, cuando corre, entonces no usa ningún secreto ni servicio pagado: solo el token del propio repositorio y GitHub Pages.
