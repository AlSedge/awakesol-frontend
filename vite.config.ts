import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The /api/sanity proxy has always existed for local development; it now also carries
// the draft token, so ?preview=1 can read unpublished documents without a token ever
// reaching the browser. The token lives in the gitignored .env.local as
// SANITY_PREVIEW_TOKEN. Nothing here exists in a production build.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const token = env.SANITY_PREVIEW_TOKEN

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/sanity': {
          target: 'https://hb5scemv.api.sanity.io',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/sanity/, ''),
          ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => console.log('[sanity] ->', req.method, req.url.slice(0, 110)))
            proxy.on('proxyRes', (proxyRes, req) => console.log('[sanity] <-', proxyRes.statusCode, req.url.slice(0, 70)))
          },
        },
      },
    },
  }
})
