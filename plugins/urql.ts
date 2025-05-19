import {
    Client,
    type SSRData,
    ssrExchange
} from '@urql/core'
import { defineNuxtPlugin } from '#app'
import { ref } from 'vue'
import { createGraphqlClient } from '~/system/createGraphqlClient'

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

    const xdebug = useCookie('XDEBUG_SESSION'),
        laravelSession = useCookie('laravel_session')
    const client = createGraphqlClient(ssr, xdebug.value, laravelSession.value)

    nuxt.provide('urql', client)
    vueApp.provide('$urql', ref(client))
})

declare module '#app' {
    interface NuxtApp {
        $urql: Client
    }
}
