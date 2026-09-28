// Smoke test after publishing: the public URL must answer 200 and contain the h1 of the Casa. Retries while Pages propagates.
const url = process.argv[2];
const esperado = 'Casa de software de Álvaro Avaca';
if (!url) { console.error('BLOQUEADO: falta la URL'); process.exit(1); }
const inicio = Date.now();
while (Date.now() - inicio < 4 * 60 * 1000) {
  try {
    const r = await fetch(url, { headers: { 'cache-control': 'no-cache' } });
    const cuerpo = await r.text();
    if (r.status === 200 && cuerpo.includes(`<h1>${esperado}</h1>`)) {
      console.log(`Verificado: ${url} responde 200 y contiene el h1 esperado.`);
      process.exit(0);
    }
    console.log(`Esperando: estado ${r.status}, h1 ${cuerpo.includes(esperado) ? 'presente' : 'ausente'}...`);
  } catch (e) {
    console.log(`Esperando: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 15000));
}
console.error(`BLOQUEADO: ${url} no respondió 200 con el h1 esperado en 4 minutos.`);
process.exit(1);
