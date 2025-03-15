import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import {
    ACCESS_TOKEN_COOKIE,
    CUSTOMER_LOCALSTORAGE_ITEM,
    REFRESH_TOKEN_COOKIE,
} from '~/constants/auth'
import {
    type CustomerDataFragment,
    CustomerDataFragmentDoc,
} from '~/gql/graphql'
import type { FragmentType } from '~/gql'
import { useFragment } from '~/gql'
import { useCookie } from '#app'
import { addHours } from '~/utils/date'

export type AuthStoreState = {
    accessToken: string | null
    refreshToken: string | null
    customer: CustomerDataFragment | null
}
export const useAuthStore = defineStore('auth', () => {
    const state = reactive<AuthStoreState>({
        accessToken: null,
        refreshToken: null,
        customer: null,
    })
    const isAuthenticated = computed(() => !!state.accessToken)
    const accessTokenCookie = useCookie(ACCESS_TOKEN_COOKIE, {
            expires: addHours(1),
        }),
        refreshTokenCookie = useCookie(REFRESH_TOKEN_COOKIE, {
            expires: addHours(24 * 7),
        })

    /**
     * Сохраняет токены и данные пользователя.
     */
    function setAuthData(
        accessToken: string,
        refreshToken: string,
        customer: FragmentType<typeof CustomerDataFragmentDoc>
    ) {
        state.accessToken = accessToken
        state.refreshToken = refreshToken
        state.customer = useFragment(CustomerDataFragmentDoc, customer)

        accessTokenCookie.value = accessToken
        refreshTokenCookie.value = refreshToken

        if (customer) {
            localStorage.setItem(
                CUSTOMER_LOCALSTORAGE_ITEM,
                JSON.stringify(customer)
            )
        }
    }

    /**
     * Очищает состояние аутентификации.
     */
    function clearAuthData() {
        state.accessToken = null
        state.refreshToken = null
        state.customer = null

        // Удаляем токены из cookies
        Cookies.remove(ACCESS_TOKEN_COOKIE)
        Cookies.remove(REFRESH_TOKEN_COOKIE)

        // Удаляем данные пользователя из localStorage
        localStorage.removeItem(CUSTOMER_LOCALSTORAGE_ITEM)
    }

    /**
     * Восстанавливает состояние аутентификации из cookies и localStorage.
     */
    function restoreAuthData(isServer = false) {
        if (accessTokenCookie.value) {
            state.accessToken = accessTokenCookie.value
        }

        if (refreshTokenCookie.value) {
            state.refreshToken = refreshTokenCookie.value
        }
        if (!isServer) {
            const customerData = localStorage.getItem(
                CUSTOMER_LOCALSTORAGE_ITEM
            )
            if (customerData) {
                state.customer = JSON.parse(customerData)
            }
        }
    }

    return {
        state,
        isAuthenticated,
        setAuthData,
        clearAuthData,
        restoreAuthData,
    }
})
