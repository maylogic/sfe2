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
                'lucide:chevron-down',
                'lucide:minus',
                'lucide:shopping-bag',
                'lucide:menu',
                'lucide:list-collapse',
                'lucide:pencil',
                'heroicons:envelope',
                'heroicons:lock-closed-24-solid',
                'heroicons:plus',
                'heroicons:minus',
                'heroicons:x-mark-20-solid',
                'bxs:lock',
            ],
            scan: true,
            includeCustomCollections: true,
            sizeLimitKb: 256,
        },
    },
    runtimeConfig: {
        public: {
            graphqlUrl: 'http://localhost/apila/graphql',
            storageUrl: 'http://localhost/storage',
            devTerminal: 'dev_terminal',
            devTerminalPass: 'dev_terminal_pass',
            prodTerminal: 'prod_terminal',
            prodTerminalPass: 'prod_terminal_pass',
            siteName: 'Safepets - адресники, ошейники, аммуниция для собак и кошек',
            siteDomain: 'safepets.ru'
        }
    },
    css: [
        '~/css/main.css'
    ],
})