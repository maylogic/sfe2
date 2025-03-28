import type { SSRExchange } from '@urql/vue'
import { cacheExchange } from '@urql/vue'
import { createClient, fetchExchange } from '@urql/core'

export const createGraphqlClient = (
    ssr?: undefined | SSRExchange,
    xdebug?: string | null | undefined
) => {
    const exchanges = []
    exchanges.push(cacheExchange)
    if (ssr) {
        exchanges.push(ssr)
    }
    exchanges.push(fetchExchange)

    const url = 'http://127.0.1.1/graphql'
    return createClient({
        url: xdebug ? url + '?XDEBUG_SESSION_START=' + xdebug : url,
        exchanges,
    })
}
