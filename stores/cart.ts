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
            console.log('setdata')
            return new Promise<void>((resolve, reject) => {
                this.error = false
                if (data) {
                    console.log(this.cart?.key)
                    const cartData = useFragment(SidebarCartFragmentDoc, data)
                    this.$patch({
                        cart: cartData,
                        count: cartData.items?.length || 0
                    })
                    console.log(this.cart?.key)
                    resolve()
                } else {
                    reject()
                }
            }).finally(() => {
                this.loading = false
            })
        },
        async hydrate() {
            console.log('hydrate')
            this.error = false
            this.loading = true
            const {data, error} = await useQuery({
                query: GetCartDocument,
                variables: {}
            })
            console.log(data)
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
                }
            })

            if (error.value) {
                this.error = true
            }
        },
        async getItemsCount() {
            console.log('get items count')
            this.error = false
            this.loading = true
            const {data} = await useQuery({
                query: GetCartItemsCountDocument,
                variables: {}
            })
            this.count = data.value?.getCartItemsCount || 0
        }
    }
})
