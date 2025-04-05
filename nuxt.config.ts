// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt'],
    compatibilityDate: '2025-03-13',
    nitro: {
        prerender: {
            ignore: ['/login', '/register', '/profile']
        }
    },
    css: [
        '~/css/main.css'
    ],
})