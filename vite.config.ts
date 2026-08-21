import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api/sanity": {
        target: "https://hb5scemv.api.sanity.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sanity/, ""),
      },
    },
  },
})