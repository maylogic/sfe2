import { defineStore } from 'pinia'
import type { SidebarCartFragment } from '~/gql/graphql'
import { GetCartDocument, SidebarCartFragmentDoc } from '~/gql/graphql'
import { useQuery } from '@urql/vue'
import { useFragment } from '~/gql'

export interface CartStoreData {
    cart: SidebarCartFragment | null
    open: boolean
}

export const useCartStore = defineStore('cart', {
    state: (): CartStoreData => ({
        cart: null,
        open: false,
    }),
    actions: {
        setData(data: SidebarCartFragment) {
            this.cart = data
        },
    },
    hydrate(storeState) {
        useQuery({
            query: GetCartDocument,
            variables: {},
        }).then((data) => {
            if (data?.data.value?.getCart) {
                storeState.cart = useFragment(
                    SidebarCartFragmentDoc,
                    data?.data.value?.getCart
                )
            }
        })
    },
})
