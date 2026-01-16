// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxt/content'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  nitro: {
    preset: 'cloudflare-pages',
  },
  mcp: {
    enabled: false,
  },
})