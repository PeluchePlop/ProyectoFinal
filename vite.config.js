import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src' // Añade este alias
    }
  },
  server: {
    proxy: {
      '/api-frase': {
        target: 'https://zenquotes.io',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-frase/, '/api')
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'] // Añade esto para evitar problemas con React
  }
});