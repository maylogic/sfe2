<template>
    <div class="flex flex-col gap-2" :class="{
        'pt-6': cart.can_apply_coupon,
        'pb-3': !cart.can_apply_coupon
    }">
        <div v-if="!!cart.coupons?.length">
            <cart-coupon
                :data="coupon"
                v-for="coupon in cart.coupons"
                :key="coupon.id"
            />
        </div>
        <cart-coupon-input v-if="cart.can_apply_coupon"/>
    </div>
</template>
<script setup lang="ts">
import type { SidebarCartFragment } from "~/gql/graphql";

defineProps<{
    cart: SidebarCartFragment
}>()
</script>