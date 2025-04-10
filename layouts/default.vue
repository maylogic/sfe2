<template>
    <UContainer>
        <div class="flex items-center py-5">
            <horizontal-nav v-if="!!menuItems.length" :items="menuItems"/>
            <u-button
                v-if="!!menuItems.length"
                class="sm:hidden"
                icon="i-lucide-menu"
                @click="menuOpen = !menuOpen"
            />
            <div class="ml-auto flex items-center gap-2">
                <ClientOnly>
                    <Suspense>
                        <user/>
                        <template #fallback>
                            <u-skeleton class="h-8 w-[60px]"/>
                        </template>
                    </Suspense>
                </ClientOnly>
                <div class="black-pseudo-button font-fira-sans max-h-[32px]"
                     @click="cartStore.open = true">
                    <u-icon class="text-[18px]" name="i-lucide-shopping-bag"/>
                    Корзина
                </div>
            </div>
        </div>
        <closable-slideover title="Меню" v-model="menuOpen">
            <u-vertical-navigation @click="menuOpen = false" :links="menuItems"/>
        </closable-slideover>
        <ClientOnly>
            <cart/>
        </ClientOnly>
        <main class="main-content">
            <slot/>
        </main>
        <footer>
            <span class="font-sans">&copy; 2025. Размещенная информация является публичной офертой.</span>
        </footer>
    </UContainer>
</template>
<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import ClosableSlideover from '~/components/ClosableSlideover.vue'
import HorizontalNav from "~/components/HorizontalNav.vue";

const menuOpen = ref(false)
const menuItems = [
    {
        label: 'Главная',
        to: '/',
    },
]
const cartStore = useCartStore()
</script>
<style lang="scss">
main.main-content {
    @apply min-h-screen;
}
footer {
    @apply text-sm py-2;
}
</style>
