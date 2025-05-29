import { defineStore } from 'pinia'
import type { CheckoutCartFragment } from '~/gql/graphql'
import {
    CheckoutCartFragmentDoc,
    GetCheckoutCartDocument
} from '~/gql/graphql'
import { useQuery } from '@urql/vue'
import {
    type FragmentType,
    useFragment
} from '~/gql'

export interface CheckoutStoreData {
    cart: CheckoutCartFragment
    open: boolean
    error: boolean
    loading: boolean
}

export const useCheckoutStore = defineStore('checkout', {
    state: (): CheckoutStoreData => ({
        cart: {
            id: '0',
            items: [],
            coupons: [],
            shipping_method: null,
            can_apply_balance: false,
            can_apply_coupon: false,
            can_place_order: false,
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
        setData(data: undefined | FragmentType<typeof CheckoutCartFragmentDoc>) {
            this.error = false
            if (data) {
                this.cart = useFragment(CheckoutCartFragmentDoc, data)
            }
            this.loading = false
        },
        async hydrate() {
            this.error = false
            this.loading = true
            const {data, error} = await useQuery({
                query: GetCheckoutCartDocument,
                variables: {}
            })

            this.setData(data.value?.getCart)

            if (error.value) {
                this.error = true
            }
        },
    }
})
