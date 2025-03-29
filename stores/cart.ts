import { defineStore } from 'pinia'
import type { SidebarCartFragment } from '~/gql/graphql'
import { GetCartDocument, SidebarCartFragmentDoc } from '~/gql/graphql'
import type { UnwrapRef } from 'vue'
import { useQuery } from '@urql/vue'
import { useFragment } from '~/gql'

export interface CartStoreData {
    cart: SidebarCartFragment | null
}

export const useCartStore = defineStore('cart', {
    state: (): CartStoreData => ({
        cart: null,
    }),
    actions: {
        setData(data: SidebarCartFragment) {
            this.cart = data
        },
    },
    hydrate(storeState: UnwrapRef<S>, initialState: UnwrapRef<S>) {
        useQuery({
            query: GetCartDocument,
            variables: {},
        }).then((data) => {
            storeState.cart = useFragment(
                SidebarCartFragmentDoc,
                data?.data.value?.getCart
            )
        })
    },
})
