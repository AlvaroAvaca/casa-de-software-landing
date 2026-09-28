// Unit tests for the "Estado real" generator (feature 2). Written red first.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { validar, renderizar, inyectar } from '../../herramientas/estado-real.mjs';

const fila = (extra) => ({ que: 'Arnés v3', estado: 'Verificado', detalle: 'el 28-09-2026', evidencia: { texto: 'Corrida', url: 'https://example.com/run' }, ...extra });

test('Dado una fila Verificado sin url de evidencia, cuando valido, entonces falla con un mensaje claro', () => {
  assert.throws(() => validar([fila({ evidencia: null })]), /Verificado.*evidencia/);
  assert.throws(() => validar([fila({ estado: 'Aprobado', evidencia: { texto: 'x', url: '' } })]), /Aprobado.*evidencia/);
});

test('Dado una fila Pendiente o Cifra sin evidencia, cuando valido, entonces pasa', () => {
  assert.doesNotThrow(() => validar([fila({ estado: 'Pendiente', detalle: '', evidencia: null }), fila({ estado: 'Cifra', detalle: '0 entregados', evidencia: null })]));
});

test('Dado un estado desconocido o campos vacíos, cuando valido, entonces falla', () => {
  assert.throws(() => validar([fila({ estado: 'Listo' })]), /estado/);
  assert.throws(() => validar([fila({ que: '' })]), /que/);
  assert.throws(() => validar('no es una lista'), /lista/);
});

test('Dado N filas válidas, cuando renderizo, entonces hay N filas de tabla con su texto, estado y link', () => {
  const filas = [fila(), fila({ que: 'Landing: brief', estado: 'Aprobado', detalle: 'por Álvaro el 28-09-2026', evidencia: { texto: 'Registro', url: 'https://example.com/pr' } }), fila({ que: 'Programas', estado: 'Cifra', detalle: '0 entregados', evidencia: null })];
  const html = renderizar(filas);
  assert.equal((html.match(/<tr>/g) || []).length, 3);
  assert.match(html, /Arnés v3/);
  assert.match(html, /Verificado/);
  assert.match(html, /href="https:\/\/example\.com\/run"/);
  assert.match(html, /0 entregados/);
  assert.doesNotMatch(html, /href=""/);
});

test('Dado texto con caracteres especiales, cuando renderizo, entonces quedan escapados', () => {
  const html = renderizar([fila({ que: 'a <b> & "c"', estado: 'Pendiente', detalle: '', evidencia: null })]);
  assert.match(html, /a &lt;b&gt; &amp; &quot;c&quot;/);
});

test('Dado un HTML con marcadores, cuando inyecto, entonces solo cambia lo que está entre ellos', () => {
  const antes = '<p>x</p>\n<!-- estado-real:inicio -->\nviejo\n<!-- estado-real:fin -->\n<p>y</p>';
  const despues = inyectar(antes, '<tr><td>nuevo</td></tr>');
  assert.match(despues, /<p>x<\/p>/);
  assert.match(despues, /<p>y<\/p>/);
  assert.match(despues, /nuevo/);
  assert.doesNotMatch(despues, /viejo/);
  assert.throws(() => inyectar('<p>sin marcadores</p>', 'x'), /marcador/);
});

test('Dado el script de línea de comandos con datos inválidos, cuando corre, entonces sale con 1 y no escribe', async () => {
  const { spawnSync } = await import('node:child_process');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'estado-real-'));
  try {
    const html = path.join(dir, 'index.html');
    fs.writeFileSync(html, '<!-- estado-real:inicio -->\nviejo\n<!-- estado-real:fin -->');
    const datos = path.join(dir, 'estado-real.json');
    fs.writeFileSync(datos, JSON.stringify([fila({ evidencia: null })]));
    const r = spawnSync(process.execPath, ['herramientas/generar-estado.mjs', datos, html], { encoding: 'utf8' });
    assert.equal(r.status, 1);
    assert.match(r.stderr, /BLOQUEADO/);
    assert.match(fs.readFileSync(html, 'utf8'), /viejo/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
