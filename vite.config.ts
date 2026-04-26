import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: process.env.DISABLE_HMR !== 'true',
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        trabalhista: resolve(__dirname, 'trabalhista.html'),
        previdenciario: resolve(__dirname, 'previdenciario.html'),
        civil: resolve(__dirname, 'civil.html'),
        familia: resolve(__dirname, 'familia.html'),
      },
    },
  },
});
