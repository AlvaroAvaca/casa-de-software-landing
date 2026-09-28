// Playwright configuration for the static-site preset.
// Zero extra dependencies: only @playwright/test is used, and only the
// Chromium engine is exercised (desktop + mobile emulation), never
// Firefox or WebKit.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './pruebas',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: {
    command: 'node herramientas/sirve.mjs',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'escritorio',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'celular',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
