import {Client, createClient, fetchExchange, type SSRData, ssrExchange} from '@urql/core';
import {defineNuxtPlugin} from '#app'
import {ref} from "vue";
import {cacheExchange} from "@urql/vue";
import Cookies from "js-cookie";

const ssrKey = '__GRAPHQL_DATA__'

export default defineNuxtPlugin(nuxt => {
    const {vueApp} = nuxt

    const ssr = ssrExchange({
        isClient: import.meta.client
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

    const token = useCookie('token')
    const client = createClient({
        url: 'http://127.0.1.1/graphql',
        exchanges: [
            cacheExchange,
            ssr, // Add `ssr` in front of the `fetchExchange`
            fetchExchange,
        ],
        fetchOptions: () => {
            console.log(token.value)
            return {
                headers: {
                    Authorization: token.value ? `Bearer ${token.value}` : '', // Добавляем токен в заголовки
                },
            }
        }
    })

    nuxt.provide('urql', client)
    vueApp.provide('$urql', ref(client))

})

declare module '#app' {
    interface NuxtApp {
        $urql: Client
    }
}