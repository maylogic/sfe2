<template>
    <div class="flex flex-col gap-2">
        <div v-if="!!cart.coupons?.length">
            <cart-coupon
                :data="coupon"
                v-for="coupon in cart.coupons"
                :key="coupon.id"
            />
        </div>
        <cart-coupon-input/>
    </div>
</template>
<script setup lang="ts">
import type { SidebarCartFragment } from "~/gql/graphql";

defineProps<{
    cart: SidebarCartFragment
}>()
</script>