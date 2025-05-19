import {
    Client,
    type SSRData,
    ssrExchange
} from '@urql/core'
import { defineNuxtPlugin } from '#app'
import { ref } from 'vue'
import { createGraphqlClient } from '~/system/createGraphqlClient'
import { parseCookies } from '~/utils/cookies'

const ssrKey = '__GRAPHQL_DATA__'

export default defineNuxtPlugin((nuxt) => {
    const {vueApp} = nuxt

    const ssr = ssrExchange({
        isClient: import.meta.client,
    })

    // when app is created in browser, restore SSR state from nuxt payload
    if (import.meta.client) {
        nuxt.hook('app:created', () => {
            ssr.restoreData(nuxt.payload[ssrKey] as SSRData)
        })
    }

    // when app has rendered in server, send SSR state to client
    if (!import.meta.client) {
        nuxt.hook('app:rendered', () => {
            nuxt.payload[ssrKey] = ssr.extractData()
        })
    }

    const xdebug = useCookie('XDEBUG_SESSION')

    let laravelSession: string | null | undefined = undefined

    if (import.meta.client) {
        // Клиент: просто получаем через useCookie
        laravelSession = useCookie('laravel_session').value
    } else {
        // Сервер: получаем куку из заголовков
        const cookieHeader = import.meta.server ? nuxt.ssrContext?.event?.node?.req?.headers.cookie : ''
        const cookies = parseCookies(cookieHeader)
        laravelSession = cookies.laravel_session || null
        console.error(laravelSession)
    }

    const client = createGraphqlClient(ssr, xdebug.value, laravelSession)

    nuxt.provide('urql', client)
    vueApp.provide('$urql', ref(client))
})

declare module '#app' {
    interface NuxtApp {
        $urql: Client
    }
}
