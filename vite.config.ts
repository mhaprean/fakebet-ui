import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  plugins: [
    react(),
    terser(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material'],
  },
});
