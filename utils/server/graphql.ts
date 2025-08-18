import type { H3Event } from "h3";
import { createGraphqlClient } from "~/system/createGraphqlClient";

export const getClient = (event: H3Event) => {
    const cookies = parseCookies(event),
        xdebug = cookies.XDEBUG_SESSION,
        laravelSession = cookies.laravel_session
    return createGraphqlClient(undefined, xdebug, laravelSession)
}