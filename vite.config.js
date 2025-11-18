import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['@apollo/client', '@apollo/client/react'],
    esbuildOptions: {
      target: "es2020"
    }
  },
  resolve: {
    dedupe: ['@apollo/client', 'react', 'react-dom']
  }
})
