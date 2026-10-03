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
    // three.js is ~550 kB but ships only in the lazily loaded hero scene
    // chunk (src/lib/heroScene.js), never in the main bundle.
    chunkSizeWarningLimit: 600,
  },
})
