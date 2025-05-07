import { defineStore } from 'pinia'
import type { SidebarCartFragment } from '~/gql/graphql'
import {
    GetCartDocument,
    SidebarCartFragmentDoc
} from '~/gql/graphql'
import { useQuery } from '@urql/vue'
import {
    type FragmentType,
    useFragment
} from '~/gql'

export interface CartStoreData {
    cart: SidebarCartFragment
    open: boolean
    error: boolean
    loading: boolean
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
        loading: false,
        open: false,
        error: false
    }),
    actions: {
        setData(data: undefined | FragmentType<typeof SidebarCartFragmentDoc>) {
            this.error = false
            if (data) {
                this.cart = useFragment(SidebarCartFragmentDoc, data)
            }
            this.loading = false
        },
        async hydrate() {
            this.error = false
            this.loading = true
            const {data, error} = await useQuery({
                query: GetCartDocument,
                variables: {},
                requestPolicy: 'network-only',
            })

            this.setData(data.value?.getCart)

            if (error.value) {
                this.error = true
            }
        },
    },
    getters: {
        isEmpty: (state) => !!state.cart.items?.length
    }
})
