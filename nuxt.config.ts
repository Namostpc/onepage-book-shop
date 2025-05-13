// https://nuxt.com/docs/api/configuration/nuxt-config
import type { CreateAxiosDefaults } from "axios"
import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  css: ["~/assets/css/app.css"],
  runtimeConfig: {
    public: {
      axios: <CreateAxiosDefaults>{
        baseURL: 'https://jsonplaceholder.typicode.com/',
      },
    },
  },
  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    'nuxt-icon'
  ]
})
