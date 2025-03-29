<template>
    <UContainer>
        <UHorizontalNavigation :links="links" />
        <UButton label="Корзина" @click="cartOpen = true" />

        <USlideover v-model="cartOpen">
            <sidebar-cart />
        </USlideover>
        <slot />
    </UContainer>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { computed } from 'vue'

const auth = useAuthStore()
const cartOpen = ref(false)
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
