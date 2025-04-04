<template>
    <UContainer>
        <div class="flex items-center py-5">
            <UHorizontalNavigation class="sm:flex hidden" :links="menuItems" />
            <u-button
                class="sm:hidden"
                icon="i-lucide-menu"
                @click="menuOpen = !menuOpen"
            />
            <div class="ml-auto flex items-center gap-5">
                <ClientOnly>
                    <Suspense>
                        <user />
                        <template #fallback>
                            <u-skeleton class="h-8 w-[100px] sm:w-[250px]" />
                        </template>
                    </Suspense>
                </ClientOnly>
                <u-button
                    icon="i-lucide-shopping-bag"
                    label="Корзина"
                    @click="cartStore.open = true"
                />
            </div>
        </div>
        <closable-slideover title="Меню" v-model="menuOpen">
            <u-vertical-navigation :links="menuItems" />
        </closable-slideover>
        <ClientOnly>
            <cart />
        </ClientOnly>
        <slot />
    </UContainer>
</template>
<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import ClosableSlideover from '~/components/ClosableSlideover.vue'

const menuOpen = ref(false)
const menuItems = [
    {
        label: 'Главная',
        to: '/',
    },
]
const cartStore = useCartStore()
</script>
