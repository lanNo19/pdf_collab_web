import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          return id.indexOf('pdfjs-dist') !== -1 ? 'pdfjs-dist' : undefined;
        }
        ,
      },
    },
  },
});
