<template>
    <UContainer>
        <UHorizontalNavigation :links="links" />
        <UButton label="Корзина" @click="cartStore.open = true" />

        <cart />
        <slot />
    </UContainer>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import Cart from '~/components/Cart.vue'

const auth = useAuthStore(),
    cartStore = useCartStore()
const links = computed(() => {
    const links = [
        {
            label: 'Главная',
            to: '/',
        },
    ]
    if (!auth.isAuthenticated) {
        links.push(
            ...[
                {
                    label: 'Войти',
                    to: '/login',
                },
                {
                    label: 'Регистрация',
                    to: '/register',
                },
            ]
        )
    }
    return links
})
</script>
