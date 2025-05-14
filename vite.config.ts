// vite.config.ts
export default defineNuxtConfig({
    vite: {
      server: {
        hmr: {
          protocol: 'wss',
          host: 'localhost',
        },
        allowedHosts: [
          'localhost',
          '7ec5-126-67-52-104.ngrok-free.app' // ← ここにあなたの ngrok ドメイン
        ]
      }
    }
  })
  