<template>
    <div class="checkout">
        <div class="blocks">

        </div>
        <div class="cart-items-container">
            <div class="title font-fira-sans">
                <u-icon class="text-[20px] mt-[-5px]" name="i-lucide-shopping-cart"/>
                {{
                    cart.items ? `${cart.items.length} ${num_word(cart.items.length, ['товар', 'товара', 'товаров'])}` : 'Пусто'
                }}
            </div>
            <div class="cart-items">
                <cart-sidebar-cart-item v-for="item in cart.items" :key="cart.key+item.id" :data="item"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { computed } from "vue";
import { num_word } from "~/utils/misc";

const cartStore = useCartStore()
await cartStore.hydrate()
const cart = computed(() => cartStore.cart)
</script>
<style lang="scss">
.checkout {
    @apply grid px-2 max-w-[960px] mx-auto gap-5 md:grid-cols-[1fr__min-content];
    max-height: 100vh;
    max-height: 100dvh;

    .blocks {
        @apply bg-white w-full;
    }

    .cart-items-container {
        @apply bg-white w-full md:w-[320px];
        .title {
            @apply py-2 px-2 bg-picton-blue-500 text-white;
            @apply flex items-center gap-2 mb-2;
        }
    }

    .cart-items {
        @apply px-2 pb-2;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}
</style>