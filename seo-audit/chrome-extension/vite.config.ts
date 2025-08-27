import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [preact()],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content.ts'),
        background: resolve(__dirname, 'src/background.ts'),
        overlay: resolve(__dirname, 'src/overlay/index.tsx'),
        sidebar: resolve(__dirname, 'src/overlay/sidebar/App.tsx'),
        popup: resolve(__dirname, 'src/popup.tsx'),
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
    emptyOutDir: true,
    sourcemap: true,
  },
});
