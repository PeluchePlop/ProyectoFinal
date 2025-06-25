import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-frase': {
        target: 'https://zenquotes.io',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-frase/, '/api')
      }
    }
  }
})
