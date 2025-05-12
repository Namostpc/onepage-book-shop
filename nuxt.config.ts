// https://nuxt.com/docs/api/configuration/nuxt-config
import type { CreateAxiosDefaults } from "axios"
import { defineNuxtConfig } from '@nuxt/bridge'
import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    define: {
      'process.env.DEBUG': false
    },
    plugins: [
      tailwindcss()
    ]
  },
  css: ["./global.css"],
  runtimeConfig: {
    public: {
      axios: <CreateAxiosDefaults>{
        baseURL: 'https://jsonplaceholder.typicode.com/',
      },
    },
  },
  modules: [
    '@nuxt/image',
    '@pinia/nuxt'
  ]
})
