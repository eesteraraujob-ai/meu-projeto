const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// expo-sqlite's web backend loads a WebAssembly worker; Metro needs to know
// how to bundle .wasm as an asset, and the dev server must send cross-origin
// isolation headers for the worker's SharedArrayBuffer to be available.
config.resolver.assetExts.push('wasm');

config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader('X-Debug-Metro-Config', 'yes');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    return middleware(req, res, next);
  };
};

module.exports = config;
