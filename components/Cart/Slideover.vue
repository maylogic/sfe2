<template>
    <u-slideover v-model="cartStore.open">
        <div class="h-full grid slideover-content">
            <div
                class="justify-between flex w-full items-center text-xl font-bold p-5 py-2 bg-picton-blue-500 text-white"
            >
                <div class="font-fira-sans">
                    Моя корзина
                    <span v-if="!!cart.items?.length">&nbsp;({{ cart.items.length }})</span>
                </div>
                <u-icon
                    class="cursor-pointer"
                    name="i-lucide-x"
                    @click="cartStore.open = false"
                />
            </div>
            <Suspense>
                <template #default>
                    <cart-sidebar-cart/>
                </template>
                <template #fallback>
                    <div class="relative h-full">
                        <loading-page/>
                    </div>
                </template>
            </Suspense>
        </div>
    </u-slideover>
</template>
<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore()
const {cart} = storeToRefs(cartStore)
</script>
<style>
.slideover-content {
    @apply max-h-dvh;
    grid-template-rows: min-content 1fr;
}
</style>