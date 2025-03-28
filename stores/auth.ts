import { defineStore } from 'pinia'
import { CUSTOMER_LOCALSTORAGE_ITEM } from '~/constants/auth'
import {
    type CustomerDataFragment,
    CustomerDataFragmentDoc,
} from '~/gql/graphql'
import type { FragmentType } from '~/gql'
import { useFragment } from '~/gql'

export type AuthStoreState = {
    user: CustomerDataFragment | null
}
export const useAuthStore = defineStore('auth', () => {
    const state = reactive<AuthStoreState>({
        user: null,
    })
    const isAuthenticated = computed(() => !!state.user)

    /**
     * Сохраняет токены и данные пользователя.
     */
    function setAuthData(user: FragmentType<typeof CustomerDataFragmentDoc>) {
        state.user = useFragment(CustomerDataFragmentDoc, user)

        if (user) {
            localStorage.setItem(
                CUSTOMER_LOCALSTORAGE_ITEM,
                JSON.stringify(user)
            )
        }
    }

    /**
     * Очищает состояние аутентификации.
     */
    function clearAuthData() {
        state.user = null
        localStorage.removeItem(CUSTOMER_LOCALSTORAGE_ITEM)
    }

    /**
     * Восстанавливает состояние аутентификации из cookies и localStorage.
     */
    function restoreAuthData() {
        const customerData = localStorage.getItem(CUSTOMER_LOCALSTORAGE_ITEM)
        if (customerData) {
            state.user = JSON.parse(customerData)
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
