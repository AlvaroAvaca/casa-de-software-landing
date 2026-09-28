// Acceptance tests for the home page. Test titles are written in Spanish
// using the Dado / Cuando / Entonces (Given / When / Then) form so that
// Álvaro, who does not code, can read what is being verified just from the
// test names.
import { test, expect } from '@playwright/test';

const TITULO_ESPERADO = 'Sitio nuevo de la Casa de software';

test.describe('Página de inicio', () => {
  test('Dado que abro la página de inicio, cuando carga, entonces veo el título de la casa', async ({ page }) => {
    const respuesta = await page.goto('/');

    expect(respuesta?.status()).toBe(200);
    await expect(page).toHaveTitle(TITULO_ESPERADO);
  });

  test('Dado que abro la página de inicio, cuando la reviso, entonces hay un único h1 visible con el título de la casa', async ({ page }) => {
    await page.goto('/');

    const encabezados = page.locator('h1');
    await expect(encabezados).toHaveCount(1);
    await expect(encabezados.first()).toBeVisible();
    await expect(encabezados.first()).toHaveText(TITULO_ESPERADO);
  });

  test('Dado que abro la página de inicio, cuando busco el estado real, entonces la sección es visible y dice "Estado real"', async ({ page }) => {
    await page.goto('/');

    const seccion = page.locator('#estado-real');
    await expect(seccion).toBeVisible();
    await expect(seccion.locator('#estado-real-titulo')).toHaveText('Estado real');
  });

  test('Dado que abro la página de inicio, cuando termina de cargar, entonces no hay errores de consola ni solicitudes fallidas', async ({ page }) => {
    const erroresDeConsola = [];
    const solicitudesFallidas = [];

    page.on('console', (mensaje) => {
      if (mensaje.type() === 'error') {
        erroresDeConsola.push(mensaje.text());
      }
    });

    page.on('requestfailed', (solicitud) => {
      solicitudesFallidas.push(solicitud.url());
    });

    await page.goto('/');
    await page.waitForLoadState('load');

    expect(erroresDeConsola).toEqual([]);
    expect(solicitudesFallidas).toEqual([]);
  });

  test('Dado que pido una ruta que no existe, cuando el servidor responde, entonces obtengo un 404', async ({ page }) => {
    const respuesta = await page.goto('/no-existe');

    expect(respuesta?.status()).toBe(404);
  });
});
