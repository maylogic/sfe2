<template>
    <div class="checkout">
        <div class="blocks">
            <checkout-block label="1. E-Mail" :valid="null">
                <checkout-block-email/>
            </checkout-block>
            <checkout-block :bordered="false" :valid="null">
                <checkout-block-coupon :cart="cart"/>
                <div v-if="!cart.can_apply_balance" class="mb-2">
                    <cart-apply-balance :data="cart?.apply_balance"/>
                </div>
            </checkout-block>
        </div>
        <div class="cart-items-container">
            <div class="bg-white">
                <div class="title font-fira-sans">
                    <u-icon class="text-[20px] mt-[-5px]" name="i-lucide-shopping-cart"/>
                    {{
                        cart.items && cart.items.length > 0
                            ? `${cart.items.length} ${num_word(cart.items.length, ['товар', 'товара', 'товаров'])}`
                            : 'Нет товаров'
                    }}
                </div>
                <div class="px-2">
                    <div class="cart-items">
                        <cart-sidebar-cart-item v-for="item in cart.items" :key="cart.key+item.id" :data="item"/>
                    </div>
                    <cart-totals :key="cart.key" :data="cart.totals"/>
                </div>
            </div>
        </div>
        <loading-overlay v-if="loading">
            <loading-page/>
        </loading-overlay>
        <loading-overlay v-if="!cart.items?.length">
            <loading-page label="Нет товаров, возвращаем на главную страницу..."/>
        </loading-overlay>
    </div>
</template>
<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { num_word } from "~/utils/misc";

const cartStore = useCartStore()
await cartStore.hydrate()
const {cart, loading} = storeToRefs(cartStore)
watch(cart, async (value) => {
    if (value.items && value.items.length === 0) {
        await navigateTo('/')
    }
})
</script>
<style lang="scss">
.checkout {
    @apply grid px-2 max-w-[960px] mx-auto gap-5 md:grid-cols-[1fr__min-content];
    @apply relative;
    max-height: 100vh;
    max-height: 100dvh;

    .cart-items-container {
        @apply w-full md:w-[320px];
        .title {
            @apply py-2 px-2 bg-picton-blue-500 text-white;
            @apply flex items-center gap-2 mb-2;
        }
    }

    .blocks {
        @apply flex flex-col gap-3;
    }

    .cart-items {
        @apply pb-2 flex flex-col gap-4;
    }
}
</style>