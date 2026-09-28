// Acceptance tests for feature 1: the landing page with the chosen style.
// Titles are in Spanish (Dado / Cuando / Entonces) so Álvaro can read them.
// Written before the page exists (red first); they must pass unchanged.
import { test, expect } from '@playwright/test';

const TITULO = 'Casa de software de Álvaro Avaca';
const SECCIONES = [
  ['#que-es', 'Qué es'],
  ['#como-trabaja', 'Cómo trabaja'],
  ['#estado-real', 'Estado real'],
  ['#como-pedir', 'Cómo pedir un programa'],
  ['#privacidad', 'Privacidad'],
];

async function luminancia(page) {
  return page.evaluate(() => {
    const rgb = getComputedStyle(document.body).backgroundColor.match(/\d+/g).map(Number);
    const [r, g, b] = rgb.map((v) => v / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  });
}

test.describe('Página de inicio de la Casa', () => {
  test('Dado que abro la página, cuando carga, entonces el título es el de la Casa y hay un único h1 con ese texto', async ({ page }) => {
    const respuesta = await page.goto('/');
    expect(respuesta?.status()).toBe(200);
    await expect(page).toHaveTitle(TITULO);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(TITULO);
  });

  test('Dado que recorro la página, cuando la leo, entonces existen las cinco secciones en orden con sus títulos', async ({ page }) => {
    await page.goto('/');
    let posicionAnterior = -1;
    for (const [id, titulo] of SECCIONES) {
      const seccion = page.locator(id);
      await expect(seccion).toHaveCount(1);
      await expect(seccion).toBeVisible();
      await expect(seccion.getByRole('heading', { level: 2 })).toHaveText(titulo);
      const posicion = await seccion.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
      expect(posicion).toBeGreaterThan(posicionAnterior);
      posicionAnterior = posicion;
    }
  });

  test('Dado que termina de cargar, cuando reviso la red y la consola, entonces no hubo solicitudes a otros dominios, ni errores, ni solicitudes fallidas', async ({ page, baseURL }) => {
    const externas = [];
    const errores = [];
    const fallidas = [];
    page.on('request', (r) => { if (!r.url().startsWith(baseURL)) externas.push(r.url()); });
    page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
    page.on('requestfailed', (r) => fallidas.push(r.url()));
    await page.goto('/');
    await page.waitForLoadState('load');
    expect(externas).toEqual([]);
    expect(errores).toEqual([]);
    expect(fallidas).toEqual([]);
  });

  test('Dado que leo "Privacidad", cuando la reviso, entonces dice que no hay cookies, formularios ni analítica y enlaza al código fuente', async ({ page }) => {
    await page.goto('/');
    const privacidad = page.locator('#privacidad');
    await expect(privacidad).toContainText('no usa cookies, formularios ni analítica');
    await expect(privacidad.getByRole('link', { name: 'casa-de-software-landing' })).toHaveAttribute('href', 'https://github.com/AlvaroAvaca/casa-de-software-landing');
  });

  test('Dado que pido una ruta que no existe, cuando el servidor responde, entonces obtengo un 404', async ({ page }) => {
    const respuesta = await page.goto('/no-existe');
    expect(respuesta?.status()).toBe(404);
  });
});

test.describe('En un celular angosto', () => {
  test.use({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true });
  test('Dado un celular de 360 píxeles, cuando cargo la página, entonces no aparece scroll horizontal', async ({ page }) => {
    await page.goto('/');
    const desborda = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(desborda).toBe(false);
  });
});

test.describe('Modo oscuro', () => {
  test.use({ colorScheme: 'dark' });
  test('Dado el sistema en modo oscuro, cuando cargo, entonces el fondo es oscuro', async ({ page }) => {
    await page.goto('/');
    expect(await luminancia(page)).toBeLessThan(0.3);
  });
});

test.describe('Modo claro', () => {
  test.use({ colorScheme: 'light' });
  test('Dado el sistema en modo claro, cuando cargo, entonces el fondo es claro', async ({ page }) => {
    await page.goto('/');
    expect(await luminancia(page)).toBeGreaterThan(0.7);
  });
});
