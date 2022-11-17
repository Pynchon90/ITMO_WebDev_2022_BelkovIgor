// vite.config.js
export default {
  // config options
  server: {
    port: 8888,
  },
  build: {
    minify: true,
  },
  /* esbuild: {
    drop: ['debugger'],
    pure: ['console.log', 'console.error', 'console.warn', 'console.debug', 'console.trace'],
  },*/
};
