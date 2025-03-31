<template>
    <div class="coupon">
        <span>
            {{ coupon.code }} ({{ coupon.discount_percentage }}% скидка)
        </span>
        <u-button @click="remove" color="red">Удалить</u-button>
    </div>
</template>
<script setup lang="ts">
import {
    CartCouponFragmentDoc,
    RemoveCouponDocument,
    SidebarCartFragmentDoc,
} from '~/gql/graphql'
import { type FragmentType, useFragment } from '~/gql'
import { useMutation } from '@urql/vue'
import { useCartStore } from '~/stores/cart'

const props = defineProps<{
    data: FragmentType<typeof CartCouponFragmentDoc>
}>()

const coupon = useFragment(CartCouponFragmentDoc, props.data)

const { executeMutation } = useMutation(RemoveCouponDocument)
const cartStore = useCartStore()

const remove = async () => {
    const { data } = await executeMutation({ code: coupon.code })
    if (data?.removeCoupon) {
        const cartData = useFragment(SidebarCartFragmentDoc, data?.removeCoupon)
        cartStore.setData(cartData)
    }
}
</script>
