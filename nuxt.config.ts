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
    icon: {
        serverBundle: 'local',

        clientBundle: {
            icons: [
                'lucide:square-user',
                'lucide:x',
                'lucide:credit-card',
                'lucide:truck',
                'lucide:user',
                'lucide:shopping-cart',
                'lucide:lock',
                'lucide:trash',
                'lucide:eye',
                'lucide:eye-off',
                'lucide:chevron-left',
                'lucide:chevron-right',
                'lucide:minus',
                'lucide:shopping-bag',
                'lucide:menu',
            ],
            scan: true,
            includeCustomCollections: true,
            sizeLimitKb: 256,
        },
    },
    runtimeConfig: {
        public: {
            graphqlUrl: 'http://localhost/graphql',
            storageUrl: 'http://localhost/storage',
            devTerminal: 'dev_terminal',
            devTerminalPass: 'dev_terminal_pass',
            prodTerminal: 'prod_terminal',
            prodTerminalPass: 'prod_terminal_pass'
        }
    },
    css: [
        '~/css/main.css'
    ],
})