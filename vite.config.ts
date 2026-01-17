import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  // Use /mcp-frontend-perf/ for GitHub Pages, / for local dev
  base: mode === 'production' ? '/mcp-frontend-perf/' : '/',
}))
