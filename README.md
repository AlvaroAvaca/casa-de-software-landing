# casa-de-software-landing

Landing de la Casa de software de Álvaro Avaca. Es el primer programa que pasa por el arnés casa-de-software, de punta a punta: brief, propuesta, funcionalidades por PR con prueba de aceptación, juez en máquina limpia, vista previa, aprobación del dueño desde el celular y publicación en GitHub Pages.

- Reglas: AGENTS.md. Roles: roles/. Brief y propuesta aprobados: docs/.
- Criterios de aceptación en español: docs/criterios/.
- "Estado real" se genera desde docs/estado-real.json con el comando npm run generar-estado. La página no puede decir más de lo que tiene evidencia.
- Juez local: npm test (pruebas unitarias más pruebas de navegador con Playwright).

Sin cookies, formularios, analítica ni datos de personas.
