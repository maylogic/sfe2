<template>
    <UContainer>
        <div class="flex items-center py-5">
            <horizontal-nav v-if="!!menuItems.length" :items="menuItems"/>
            <u-button
                color="black"
                v-if="!!menuItems.length"
                class="sm:hidden"
                icon="i-lucide-menu"
                @click="menuOpen = !menuOpen"
            />
            <div class="ml-auto flex items-center gap-2">
                <Suspense>
                    <user/>
                    <template #fallback>
                        <u-skeleton class="h-8 w-[60px]"/>
                    </template>
                </Suspense>
                <div class="black-pseudo-button font-fira-sans max-h-[32px]"
                     @click="cartStore.open = true">
                    <u-icon class="text-[18px]" name="i-lucide-shopping-bag"/>
                    <span>
                        Корзина
                        <span v-if="count>0">&nbsp;({{ count }})</span>
                    </span>
                </div>
            </div>
        </div>
        <closable-slideover title="Меню" v-model="menuOpen">
            <u-vertical-navigation @click="menuOpen = false" :links="menuItems"/>
        </closable-slideover>
        <cart-slideover/>
        <main class="main-content">
            <slot/>
        </main>
        <footer>
            <footer-content/>
        </footer>
    </UContainer>
</template>
<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const menuOpen = ref(false)
const menuItems = [
    {
        label: 'Главная',
        to: '/',
    },
]
const cartStore = useCartStore()
await cartStore.getItemsCount()
const {count} = storeToRefs(cartStore)
</script>
<style lang="scss">
main.main-content {
    @apply min-h-screen mt-2;
}

footer {
    @apply text-sm py-2;
}
</style>
