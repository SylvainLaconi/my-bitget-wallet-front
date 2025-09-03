import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA(
    {
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Bitget Wallet',
        short_name: 'My Bitget Wallet',
        description: 'Follow your assets in one place',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [],
      }
    }
  )],
  server: {
    port: 5173,
    proxy: {
      "/auth": {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        // rewrite cookie domain si besoin
        cookieDomainRewrite: 'localhost',
      }
    }
  },
})
