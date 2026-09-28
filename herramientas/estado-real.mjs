// "Estado real" generator: the table is rendered from docs/estado-real.json, never written by hand.
// A row that claims Verificado or Aprobado must carry evidence with a URL; otherwise generation fails.
const ESTADOS = new Set(['Verificado', 'Aprobado', 'Pendiente', 'Cifra']);
const CLASE = { Verificado: 'badge badge-green', Aprobado: 'badge badge-accent', Pendiente: 'badge badge-gray' };
const INICIO = '<!-- estado-real:inicio -->';
const FIN = '<!-- estado-real:fin -->';

export function escapar(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function validar(filas) {
  if (!Array.isArray(filas)) throw new Error('BLOQUEADO: los datos deben ser una lista de filas');
  filas.forEach((f, i) => {
    const n = i + 1;
    if (!f || typeof f !== 'object') throw new Error(`BLOQUEADO: la fila ${n} no es un objeto`);
    if (!f.que || typeof f.que !== 'string') throw new Error(`BLOQUEADO: la fila ${n} no tiene "que"`);
    if (!ESTADOS.has(f.estado)) throw new Error(`BLOQUEADO: la fila ${n} tiene un estado desconocido: ${f.estado}`);
    if (typeof f.detalle !== 'string') throw new Error(`BLOQUEADO: la fila ${n} necesita "detalle" (puede ser vacío)`);
    const url = f.evidencia && typeof f.evidencia.url === 'string' ? f.evidencia.url.trim() : '';
    const texto = f.evidencia && typeof f.evidencia.texto === 'string' ? f.evidencia.texto.trim() : '';
    if ((f.estado === 'Verificado' || f.estado === 'Aprobado') && !(url.startsWith('https://') && texto)) {
      throw new Error(`BLOQUEADO: la fila ${n} dice ${f.estado} pero no trae evidencia con texto y url https`);
    }
    if (f.evidencia && !(url && texto)) throw new Error(`BLOQUEADO: la fila ${n} tiene una evidencia incompleta`);
    if (f.estado === 'Cifra' && !f.detalle) throw new Error(`BLOQUEADO: la fila ${n} es una Cifra sin detalle`);
  });
  return filas;
}

export function renderizar(filas) {
  validar(filas);
  return filas.map((f) => {
    const estado = f.estado === 'Cifra'
      ? escapar(f.detalle)
      : `<span class="${CLASE[f.estado]}">${escapar(f.estado)}</span>${f.detalle ? ' ' + escapar(f.detalle) : ''}`;
    const evidencia = f.evidencia
      ? `<a href="${escapar(f.evidencia.url)}">${escapar(f.evidencia.texto)}</a>`
      : '—';
    return [
      '<tr>',
      `  <td data-label="Qué">${escapar(f.que)}</td>`,
      `  <td data-label="Estado">${estado}</td>`,
      `  <td data-label="Evidencia">${evidencia}</td>`,
      '</tr>',
    ].join('\n');
  }).join('\n');
}

export function inyectar(html, cuerpo) {
  const a = html.indexOf(INICIO);
  const b = html.indexOf(FIN);
  if (a === -1 || b === -1 || b < a) throw new Error('BLOQUEADO: faltan los marcadores estado-real:inicio / estado-real:fin en el HTML');
  return html.slice(0, a + INICIO.length) + '\n' + cuerpo + '\n' + html.slice(b);
}
