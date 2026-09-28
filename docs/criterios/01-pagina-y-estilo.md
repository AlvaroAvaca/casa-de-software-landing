# Funcionalidad 1: la página con el estilo elegido

- Issue: https://github.com/AlvaroAvaca/casa-de-software-landing/issues/3
- Prueba: pruebas/aceptacion/pagina.spec.mjs

## Criterios
1. Dado que abro la página de inicio, cuando carga, entonces el título de la pestaña es "Casa de software de Álvaro Avaca" y hay un único h1 con ese mismo texto.
2. Dado que abro la página, cuando la recorro, entonces existen, en este orden, las secciones "Qué es", "Cómo trabaja", "Estado real", "Cómo pedir un programa" y "Privacidad".
3. Dado que la abro en un celular de 360 píxeles de ancho, cuando cargo, entonces no aparece barra de desplazamiento horizontal en la página.
4. Dado que la abro con el sistema en modo oscuro, cuando cargo, entonces el fondo es oscuro y el texto claro; en modo claro, al revés.
5. Dado que la abro, cuando termina de cargar, entonces no hubo ninguna solicitud a otro dominio, ni errores de consola, ni solicitudes fallidas.
6. Dado que leo la sección "Privacidad", cuando la reviso, entonces dice que el sitio no usa cookies, formularios ni analítica, y enlaza al código fuente.
