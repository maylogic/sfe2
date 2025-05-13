<template>
    <div class="flex flex-col gap-2" :class="{
        'pt-0': cart.can_apply_coupon,
        'py-3': !cart.can_apply_coupon
    }">
        <h3 class="font-iskra">Промокод или подарочный ваучер</h3>
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