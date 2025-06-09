import { defineStore } from 'pinia'
import type { SidebarCartFragment } from '~/gql/graphql'
import {
    GetCartDocument,
    GetCartItemsCountDocument,
    PriceFragmentDoc,
    SidebarCartFragmentDoc,
    TotalsFragmentDoc
} from '~/gql/graphql'
import { useQuery } from '@urql/vue'
import {
    type FragmentType,
    useFragment
} from '~/gql'
import { getCartItemToTrack } from "~/utils/tracking";

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
        async setData(data: undefined | FragmentType<typeof SidebarCartFragmentDoc>) {
            return new Promise<void>((resolve, reject) => {
                this.error = false
                if (data) {
                    this.cart = useFragment(SidebarCartFragmentDoc, data)
                    this.count = this.cart.items?.length || 0
                    resolve()
                } else {
                    reject()
                }
            }).finally(() => {
                this.loading = false
            })
        },
        async hydrate() {
            this.error = false
            this.loading = true
            const {data, error} = await useQuery({
                query: GetCartDocument,
                variables: {},
                requestPolicy: "network-only"
            })

            const {$gtm} = useNuxtApp()
            this.setData(data.value?.getCart).then(() => {
                if ($gtm) {
                    const totals = useFragment(TotalsFragmentDoc, this.cart.totals),
                        grandTotal = useFragment(PriceFragmentDoc, totals.grand_total)
                    $gtm.sendEcommerceEvent('view_cart', {
                        ecommerce: {
                            currency: "RUB",
                            value: getPriceToTrack(grandTotal),
                            items: this.cart.items?.map(itemFrag => getCartItemToTrack(itemFrag)) || []
                        }
                    })
                    console.log('tracking view cart', {
                        ecommerce: {
                            currency: "RUB",
                            value: getPriceToTrack(grandTotal),
                            items: this.cart.items?.map(itemFrag => getCartItemToTrack(itemFrag)) || []
                        }
                    })
                }
            })

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
    }
})
