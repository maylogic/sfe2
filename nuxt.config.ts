// https://nuxt.com/docs/api/configuration/nuxt-config
import { readFileSync } from 'node:fs'
import { join } from 'pathe'

const productSlugs = JSON.parse(
    readFileSync(join(process.cwd(), 'data/product-slugs.json'), 'utf-8')
)

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/ui', '@pinia/nuxt'],
    compatibilityDate: '2025-03-13',
    nitro: {
        prerender: {
            routes: productSlugs.map((slug: string) => `/product/${slug}`),
        },
    },
    css: [
        '~/css/main.css'
    ],
})
