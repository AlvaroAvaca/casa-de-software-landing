#!/usr/bin/env node
// CLI: node herramientas/generar-estado.mjs docs/estado-real.json sitio/index.html
// Reads the data, validates it, and rewrites only the block between the markers. Exit 1 and no write on any error.
import fs from 'node:fs';
import { renderizar, inyectar } from './estado-real.mjs';

const [datosRuta, htmlRuta] = process.argv.slice(2);
try {
  if (!datosRuta || !htmlRuta) throw new Error('BLOQUEADO: uso: generar-estado.mjs <datos.json> <pagina.html>');
  const filas = JSON.parse(fs.readFileSync(datosRuta, 'utf8'));
  const html = fs.readFileSync(htmlRuta, 'utf8');
  const nuevo = inyectar(html, renderizar(filas));
  if (nuevo !== html) fs.writeFileSync(htmlRuta, nuevo);
  console.log(`Verificado: ${filas.length} filas de estado real escritas en ${htmlRuta}`);
} catch (e) {
  console.error(e.message.startsWith('BLOQUEADO') ? e.message : `BLOQUEADO: ${e.message}`);
  process.exit(1);
}
