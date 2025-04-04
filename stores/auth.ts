import { defineStore } from 'pinia'
import {
    CurrentUserDocument,
    type CustomerDataFragment,
    CustomerDataFragmentDoc,
} from '~/gql/graphql'
import { useFragment } from '~/gql'
import { useQuery } from '@urql/vue'

export type AuthStoreState = {
    user: CustomerDataFragment | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthStoreState => ({
        user: null,
    }),
    actions: {
        setAuthData(user: CustomerDataFragment) {
            this.user = user
        },
        clearAuthData() {
            this.user = null
            localStorage.removeItem('user')
        },
        hydrateFromLocalStorage() {
            const userData = localStorage.getItem('user')
            if (userData) {
                this.user = JSON.parse(userData)
            }
        },
        async hydrate() {
            const {data, error} = await useQuery({
                query: CurrentUserDocument,
                variables: {},
            })
            if (data.value?.currentUser) {
                this.user = useFragment(
                    CustomerDataFragmentDoc,
                    data.value?.currentUser
                )
                localStorage.setItem('user', JSON.stringify(this.user))
            } else {
                this.clearAuthData()
            }
        },
    },
    getters: {
        isAuthenticated: (state) => state.user !== null,
    },
})
