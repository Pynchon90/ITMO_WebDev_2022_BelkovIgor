// vite.config.js
import path from 'path';
import { defineConfig } from 'vite';
import config from 'tailwindcss/defaultConfig.js';

export default defineConfig({
  // config options
  plugins: [],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    port: 8888,
  },
});
