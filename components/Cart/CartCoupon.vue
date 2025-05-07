<template>
    <div class="flex items-center gap-2">
        <span class="font-fira-sans tracking-wider text-sm font-bold">
            {{ coupon.code }} ({{ coupon.discount_percentage }}% скидка)
        </span>
        <u-button
            icon="i-lucide-x"
            @click="remove"
            color="red"
            size="xs"
            class="px-1.5"
        />
    </div>
</template>
<script setup lang="ts">
import {
    CartCouponFragmentDoc,
    RemoveCouponDocument,
} from '~/gql/graphql'
import {
    type FragmentType,
    useFragment
} from '~/gql'
import { useMutation } from '@urql/vue'
import { useCartStore } from '~/stores/cart'

const props = defineProps<{
    data: FragmentType<typeof CartCouponFragmentDoc>
}>()

const coupon = useFragment(CartCouponFragmentDoc, props.data)

const {executeMutation} = useMutation(RemoveCouponDocument)
const cartStore = useCartStore()

const remove = async () => {
    cartStore.loading = true
    const {data} = await executeMutation({code: coupon.code})
    cartStore.setData(data?.removeCoupon)
}
</script>
