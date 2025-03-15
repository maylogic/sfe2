<template>
    <UContainer>
        <UHorizontalNavigation :links="links" />
        <slot />
    </UContainer>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
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
