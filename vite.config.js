import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build can be hosted from any sub-path (GitHub Pages).
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
  },
})
