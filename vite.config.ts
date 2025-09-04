import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'My Bitget Spot',
        short_name: 'My Bitget Spot',
        description: 'Prenez le contrôle de vos performances Spot sur Bitget',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'my-bitget-wallet-logo-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'my-bitget-wallet-logo-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'my-bitget-wallet-logo-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: process.env.NODE_ENV === 'production',
        // rewrite cookie domain si besoin
        cookieDomainRewrite: 'localhost',
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
