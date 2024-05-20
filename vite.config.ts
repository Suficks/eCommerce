import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'index.html'),
      },
    },
    target: 'es2022',
  },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: 'node-fetch', replacement: 'isomorphic-fetch' },
    ],
  },
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]--[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/app/styles/variables/global";@import "./src/app/styles/fonts/fonts";@import "./src/app/styles/mixins/mixins";@import "./src/app/styles";@import "reset-css";`,
      },
    },
  },
});
