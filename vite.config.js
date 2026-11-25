import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Adresse locale : http://vespre-bar.localhost:5191 (les sous-domaines .localhost pointent vers cet ordinateur).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5191, strictPort: true },
})
