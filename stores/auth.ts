import { defineStore } from 'pinia'
import {
    CurrentUserDocument,
    type CustomerDataFragment,
    CustomerDataFragmentDoc,
} from '~/gql/graphql'
import {
    type FragmentType,
    useFragment
} from '~/gql'
import { useQuery } from '@urql/vue'

export type AuthStoreState = {
    user: CustomerDataFragment | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthStoreState => ({
        user: null,
    }),
    actions: {
        setAuthData(user: FragmentType<typeof CustomerDataFragmentDoc>) {
            this.user = useFragment(
                CustomerDataFragmentDoc,
                user
            )
            if (import.meta.client) {
                localStorage.setItem('user', JSON.stringify(this.user))
            }
        },
        clearAuthData() {
            this.user = null
            if (import.meta.client) {
                localStorage.removeItem('user')
            }
        },
        hydrateFromLocalStorage() {
            const userData = localStorage.getItem('user')
            if (userData) {
                this.user = JSON.parse(userData)
            }
        },
        setData(user?: FragmentType<typeof CustomerDataFragmentDoc> | null) {
            if (user) {
                this.setAuthData(user)
            } else {
                this.clearAuthData()
            }
        },
        async hydrate() {
            const {data, error} = await useQuery({
                query: CurrentUserDocument,
                variables: {},
                requestPolicy: "network-only"
            })
            console.log(data.value)
            this.setData(data.value?.currentUser)
        },
    },
    getters: {
        isAuthenticated: (state) => state.user !== null,
    },
})
