import { defineStore } from 'pinia'
import type { SidebarCartFragment } from '~/gql/graphql'
import {
    GetCartDocument,
    GetCartItemsCountDocument,
    SidebarCartFragmentDoc
} from '~/gql/graphql'
import { useQuery } from '@urql/vue'
import {
    type FragmentType,
    useFragment
} from '~/gql'

export interface CartStoreData {
    cart: SidebarCartFragment
    count: number
    open: boolean
    error: boolean
    loading: boolean
}

export const useCartStore = defineStore('cart', {
    state: (): CartStoreData => ({
        count: 0,
        cart: {
            id: '0',
            items: [],
            coupons: [],
            shipping_method: null,
            can_apply_balance: false,
            can_apply_coupon: false,
            can_place_order: false,
            apply_balance: false,
            shipping_address: null,
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
                this.count = this.cart.items?.length || 0
            }
            this.loading = false
        },
        async hydrate() {
            this.error = false
            this.loading = true
            const {data, error} = await useQuery({
                query: GetCartDocument,
                variables: {},
                requestPolicy: "network-only"
            })

            this.setData(data.value?.getCart)

            if (error.value) {
                this.error = true
            }
        },
        async getItemsCount() {
            this.error = false
            this.loading = true
            const {data} = await useQuery({
                query: GetCartItemsCountDocument,
                variables: {},
                requestPolicy: "network-only"
            })
            this.count = data.value?.getCartItemsCount || 0
        }
    },
    getters: {
        isEmpty: (state) => !!state.cart.items?.length
    }
})
