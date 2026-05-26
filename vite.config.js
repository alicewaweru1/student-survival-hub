import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import reacticons from 'vite-plugin-react-icons'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    reacticons.default({
      autoInstall: true,
    }),
  ],
})
