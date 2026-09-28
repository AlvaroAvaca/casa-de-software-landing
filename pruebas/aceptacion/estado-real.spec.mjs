// Acceptance tests for feature 2: the "Estado real" table mirrors docs/estado-real.json exactly.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const filas = JSON.parse(fs.readFileSync(new URL('../../docs/estado-real.json', import.meta.url), 'utf8'));

test.describe('Estado real', () => {
  test('Dado el archivo de datos con N filas, cuando abro la página, entonces la tabla "Estado real" tiene exactamente N filas con el mismo contenido', async ({ page }) => {
    await page.goto('/');
    const tabla = page.locator('#estado-real table');
    await expect(tabla).toHaveCount(1);
    const cuerpo = tabla.locator('tbody tr');
    await expect(cuerpo).toHaveCount(filas.length);
    for (let i = 0; i < filas.length; i += 1) {
      const fila = cuerpo.nth(i);
      await expect(fila).toContainText(filas[i].que);
      if (filas[i].estado !== 'Cifra') await expect(fila).toContainText(filas[i].estado);
      if (filas[i].detalle) await expect(fila).toContainText(filas[i].detalle);
      if (filas[i].evidencia) {
        await expect(fila.getByRole('link', { name: filas[i].evidencia.texto })).toHaveAttribute('href', filas[i].evidencia.url);
      } else {
        await expect(fila.getByRole('link')).toHaveCount(0);
      }
    }
  });

  test('Dado que leo la tabla, cuando miro cada estado, entonces se lee la palabra del estado y no solo un color', async ({ page }) => {
    await page.goto('/');
    for (const f of filas) {
      if (f.estado === 'Cifra') continue;
      await expect(page.locator('#estado-real tbody', { hasText: f.estado })).toHaveCount(1);
    }
  });
});
