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
        },
        hydrate() {
            return useQuery({
                query: CurrentUserDocument,
                variables: {},
            }).then((data) => {
                if (data?.data.value?.currentUser) {
                    this.user = useFragment(
                        CustomerDataFragmentDoc,
                        data?.data.value?.currentUser
                    )
                }
            })
        },
    },
    getters: {
        isAuthenticated: (state) => state.user !== null,
    },
})
