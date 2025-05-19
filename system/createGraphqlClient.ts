import type { SSRExchange } from '@urql/vue'
import { cacheExchange } from '@urql/vue'
import {
    createClient,
    fetchExchange
} from '@urql/core'
import { getEnvOrPubVal } from "~/utils/env";

export const createGraphqlClient = (
    ssr?: undefined | SSRExchange,
    xdebug?: string | null | undefined,
    laravelSession?: string | null | undefined
) => {
    const exchanges = []
    exchanges.push(cacheExchange)
    // exchanges.push(debugExchange)
    if (ssr) {
        exchanges.push(ssr)
    }
    exchanges.push(fetchExchange)

    const url = getEnvOrPubVal('GRAPHQL_URL')
    console.log('laravel session', laravelSession)
    return createClient({
        url: xdebug ? url + '?XDEBUG_SESSION_START=' + xdebug : url,
        fetchOptions: () => ({
            credentials: 'include',
            headers: {
                // Если есть laravelSession — передаем её в заголовке Cookie
                ...(laravelSession ? {Cookie: `laravel_session=${laravelSession}`} : {}),
            },
        }),
        exchanges,
    })
}
