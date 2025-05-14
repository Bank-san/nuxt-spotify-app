import { readFileSync } from 'node:fs'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/eslint'
  ],

  vite: {
    server: {
      https: {
        key: readFileSync('./localhost-key.pem'),
        cert: readFileSync('./localhost.pem')
      },
      allowedHosts: [
        'localhost',
        '7ec5-126-67-52-104.ngrok-free.app' // ← 必要に応じて毎回変える
      ]
    }
  }
})
