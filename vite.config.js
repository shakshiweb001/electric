import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import site from './vite-plugin-site.js';

export default defineConfig({
  plugins: [react(), site()],
  build: {
    target: 'es2020',
  },
});
