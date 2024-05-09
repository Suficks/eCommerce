import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/app/styles/variables/global";@import "./src/app/styles/fonts/fonts";@import "./src/app/styles/mixins/mixins";@import "./src/app/styles";@import "reset-css";`,
      },
    },
  },
});
