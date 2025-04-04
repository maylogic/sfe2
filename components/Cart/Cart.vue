<template>
    <u-slideover v-model="cartStore.open">
        <div class="h-full grid slideover-content">
            <div
                class="justify-between flex w-full items-center text-xl font-bold p-5 bg-picton-blue-500 text-white"
            >
                <div class="flex items-center gap-2 font-fira-sans">
                    <u-icon name="i-lucide-shopping-cart"/>
                    Моя корзина
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
                    <div class="flex flex-col gap-2 p-5">
                        <span class="font-fira-sans">Загрузка...</span>
                        <u-progress/>
                    </div>
                </template>
            </Suspense>
        </div>
    </u-slideover>
</template>
<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore()
</script>
<style>
.slideover-content {
    grid-template-rows: min-content 1fr;
}
</style>