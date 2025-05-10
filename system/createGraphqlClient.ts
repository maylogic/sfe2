import type { SSRExchange } from '@urql/vue'
import { cacheExchange } from '@urql/vue'
import { createClient, fetchExchange } from '@urql/core'

export const createGraphqlClient = (
    ssr?: undefined | SSRExchange,
    xdebug?: string | null | undefined
) => {
    const exchanges = []
    exchanges.push(cacheExchange)
    // exchanges.push(debugExchange)
    if (ssr) {
        exchanges.push(ssr)
    }
    exchanges.push(fetchExchange)

    const url = process.env.GRAPHQL_URL ?? 'http://localhost/graphql'
    return createClient({
        url: xdebug ? url + '?XDEBUG_SESSION_START=' + xdebug : url,
        fetchOptions: () => ({
            credentials: 'include',
        }),
        exchanges,
    })
}
