#!/usr/bin/env node
/**
 * expo-sqlite's web backend needs SharedArrayBuffer, which browsers only
 * expose to a cross-origin-isolated document (Cross-Origin-Opener-Policy +
 * Cross-Origin-Embedder-Policy on the top-level HTML response).
 *
 * metro.config.js's server.enhanceMiddleware adds those headers, but in this
 * Expo CLI version it only reaches bundler/asset requests. The root path '/'
 * is served by a "manifest" middleware that Expo CLI deliberately prepends
 * ahead of everything else (see the "manifest handler ... served from '/'"
 * comment in @expo/cli's MetroBundlerDevServer.js), so it never reaches
 * enhanceMiddleware and never gets the headers.
 *
 * This proxy sits in front of the real dev server and adds the headers to
 * every response, regardless of which internal handler served it, while
 * transparently forwarding WebSocket upgrades (Metro's HMR) and streamed
 * bodies.
 */
const http = require('http');
const { spawn } = require('child_process');

const TARGET_PORT = 8090;
const PROXY_PORT = process.env.PORT ? Number(process.env.PORT) : 8081;
const ISOLATION_HEADERS = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

const expo = spawn('npx', ['expo', 'start', '--web', '--port', String(TARGET_PORT)], {
  stdio: 'inherit',
  shell: true,
});

function shutdown() {
  expo.kill();
  process.exit();
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
expo.on('exit', (code) => process.exit(code ?? 0));

const proxy = http.createServer((req, res) => {
  res.on('error', () => {});
  const upstream = http.request(
    { host: '127.0.0.1', port: TARGET_PORT, path: req.url, method: req.method, headers: req.headers },
    (upstreamRes) => {
      upstreamRes.on('error', () => {});
      if (res.writableEnded) return;
      res.writeHead(upstreamRes.statusCode, { ...upstreamRes.headers, ...ISOLATION_HEADERS });
      upstreamRes.pipe(res);
    }
  );
  req.on('error', () => upstream.destroy());
  req.pipe(upstream);
  upstream.on('error', (err) => {
    if (res.headersSent || res.writableEnded) return;
    res.writeHead(502);
    res.end('Proxy error: ' + err.message);
  });
});

proxy.on('upgrade', (req, socket, head) => {
  socket.on('error', () => {});
  const upstream = http.request({
    host: '127.0.0.1',
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers,
  });
  upstream.end();
  upstream.on('upgrade', (upstreamRes, upstreamSocket, upstreamHead) => {
    upstreamSocket.on('error', () => socket.destroy());
    const statusLine = `HTTP/1.1 101 Switching Protocols\r\n`;
    const headerLines = Object.entries(upstreamRes.headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\r\n');
    socket.write(statusLine + headerLines + '\r\n\r\n');
    upstreamSocket.write(upstreamHead);
    upstreamSocket.pipe(socket);
    socket.pipe(upstreamSocket);
  });
  upstream.on('error', () => socket.destroy());
});

proxy.on('clientError', (err, socket) => {
  if (socket.writable) socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

function waitForUpstream() {
  http
    .get({ host: '127.0.0.1', port: TARGET_PORT, path: '/status' }, () => {
      proxy.listen(PROXY_PORT, () => {
        console.log(`\nWeb dev server ready with cross-origin isolation headers: http://localhost:${PROXY_PORT}\n`);
      });
    })
    .on('error', () => setTimeout(waitForUpstream, 500));
}
waitForUpstream();
