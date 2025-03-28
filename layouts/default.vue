<template>
    <UContainer>
        <UHorizontalNavigation :links="links" />
        <UButton label="Корзина" @click="cartOpen = true" />

        <ClientOnly>
            <USlideover v-model="cartOpen">
                <div class="flex items-center">
                    <Suspense>
                        <CartSidebar />
                        <template #fallback>
                            <u-progress />
                        </template>
                    </Suspense>
                </div>
            </USlideover>
        </ClientOnly>
        <slot />
    </UContainer>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import CartSidebar from '~/components/CartSidebar.vue'
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
