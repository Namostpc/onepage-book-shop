// https://nuxt.com/docs/api/configuration/nuxt-config
import type { CreateAxiosDefaults } from "axios"
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  runtimeConfig: {
    public: {
      axios: <CreateAxiosDefaults>{
        baseURL: 'https://jsonplaceholder.typicode.com/',
      },
    },
  },
})
