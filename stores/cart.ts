import { defineStore } from 'pinia'
import type { SidebarCartFragment } from '~/gql/graphql'
import {
    GetCartDocument,
    SidebarCartFragmentDoc
} from '~/gql/graphql'
import { useQuery } from '@urql/vue'
import { useFragment } from '~/gql'

export interface CartStoreData {
    cart: SidebarCartFragment
    open: boolean
}

export const useCartStore = defineStore('cart', {
    state: (): CartStoreData => ({
        cart: {
            id: '0',
            items: [],
            coupons: [],
            shipping_method: null,
            can_apply_balance: false,
            apply_balance: false,
            key: 'default',
            totals: {
                ' $fragmentRefs': undefined,
            },
        },
        open: false,
    }),
    actions: {
        setData(data: SidebarCartFragment) {
            this.cart = data
        },
        hydrate() {
            return useQuery({
                query: GetCartDocument,
                variables: {},
                requestPolicy: 'network-only',
            }).then((data) => {
                if (data?.data.value?.getCart) {
                    this.cart = useFragment(
                        SidebarCartFragmentDoc,
                        data?.data.value?.getCart
                    )
                }
            })
        },
    },
    getters: {
        isEmpty: (state) => !!state.cart.items?.length
    }
})
