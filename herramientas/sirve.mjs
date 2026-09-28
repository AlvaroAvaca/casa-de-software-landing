// Zero-dependency static file server for the "sitio/" folder.
// Node 22 ESM. Used both for local development (npm run servir) and as the
// webServer command Playwright starts before running the acceptance tests.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = '127.0.0.1';
const PORT = Number(process.env.PORT) || 4173;

// Directory that contains this file (herramientas/), and the site root
// (sitio/) next to it.
const HERE = fileURLToPath(new URL('.', import.meta.url));
const SITE_ROOT = resolve(HERE, '..', 'sitio');

// Map of file extensions to content types served for that file.
const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

function notFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 - No encontrado');
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${HOST}:${PORT}`);
    let pathname = decodeURIComponent(url.pathname);

    // Serve the home page for the root path.
    if (pathname === '/') {
      pathname = '/index.html';
    }

    // Resolve the requested path against the site root and refuse to serve
    // anything that escapes it (path traversal protection).
    const requestedPath = resolve(join(SITE_ROOT, pathname));
    const rootWithSep = SITE_ROOT.endsWith(sep) ? SITE_ROOT : SITE_ROOT + sep;
    if (requestedPath !== SITE_ROOT && !requestedPath.startsWith(rootWithSep)) {
      notFound(res);
      return;
    }

    const contentType = CONTENT_TYPES[extname(requestedPath).toLowerCase()];
    if (!contentType) {
      notFound(res);
      return;
    }

    const data = await readFile(requestedPath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      notFound(res);
      return;
    }
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 - Error interno');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Sirviendo sitio/ en http://${HOST}:${PORT}`);
});
