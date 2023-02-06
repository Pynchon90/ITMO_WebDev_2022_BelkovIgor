// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  telemetry: false,
  vite: {

  },
  modules: ['@anu-vue/nuxt', '@unocss/nuxt'],
  css: ['@anu-vue/preset-theme-default/dist/style.css'],
  runtimeConfig: {
    public: {
      DATA_API: 'https://jsonplaceholder.typicode.com'
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})